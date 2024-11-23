---
title: "Type Safety in Python"
author: Matt Kaye
preview: Making the most of Python's "gradual" typing
date: "2024-09-24"
categories: ["engineering", "python"]
slug: type-safe-python
---

I've been writing a lot of Python recently, and it's caused me many headaches. To some degree, Python is famous for its simplicity: It's easy to learn, easy to read and understand, and its expansive ecosystem makes it easy to do virtually anything you could imagine using the language, from building machine learning models to processing billions of email events like we do at [Klaviyo](https://www.klaviyo.com/). In my view, this simplicity is a double-edged sword.

The nature of a language like Python - that is, a high-level, dynamically typed, interpreted language that's intended to be "beginner friendly" - ends up being a bit of a double-edged sword. It's easy to build bad habits that end up causing problems down the road, and I've run into a lot of maintainability issues with some of the code I've written, both for [ZenSearch](https://zensearch.jobs) and for work recently.

Recently, in no particular order:

- I've seen an incident caused by a misspelled parameter name, like having a function defined as `foo(bar: str) -> str` and calling it like `foo(ba="baz")` (note the missing "R" in `bar`). This shipped to production, uncaught by tests or static analysis tools, and broke.
- I've seen an incident caused by a database column's type being mapped to the incorrect Python type (think mapping a nullable `VARCHAR` field in a database to a `str` value, as opposed to a `str | None`).
- I've seen an incident caused by using [Pydantic's handy `model_validate`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_validate) on an object that was missing a required field.

And the list goes on.

These incidents were all preventable. Namely, typed, compiled languages would prevent these types of issues for free - if you made any of these mistakes, at least in most cases, your code would fail to compile and would never make it to production. For example, in TypeScript, the first example above would throw an error like `Argument of type '{ ba: string; }' is not assignable to parameter of type '{ bar: string; }'` at compile time. In the second case, an ORM or a tool like [sqlc](https://sqlc.dev/) would ensure type parity between the database and the code. And finally, `model_validate` [can be called on an object of any type](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_rebuild), meaning that you could pass a string into that function and your code (before runtime) would expect it to be parseable to whatever your model is defined as, and would throw a validation error if that's not possible.

On a lot of Python (and likely JS, Ruby, etc.) teams, these types of errors are just the price you pay for being able to move quickly, and the other benefits and flexibility that you get from a dynamically typed, interpreted language like Python. At Klaviyo and ZenSearch, we make heavy use of [MyPy](https://mypy.readthedocs.io/en/stable/index.html), which is a static type checker for Python, to help us solve some of these problems.

### MyPy

If you've added type hints to functions you've defined and you're using external libraries that support typing, then MyPy will perform a lot of the same responsibilities as a compiler or static type checker in a typed language. It'll check the validity of your types, check function arguments, etc. On its own, this would solve the first problem in my list above - running MyPy over a function call with a typo in a keyword argument would fail. But the caveat here is that MyPy will only work as well as you are diligent about making sure the objects defined in your code are typed. If you use the `Any` type from `typing`, or don't add type hints at all, there's little MyPy can do to help.

But MyPy alone won't solve the second or third problems, which are more "advanced topics", in a sense. For the first, you'd need a tool that ensures that a nullable field in a database is mapped to a nullable type in application code, which, at least in Python with SQLAlchemy, is non-trivial. Here's an example:

Let's imagine we start with this model:

```
class Foo(Base):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(128), nullable=False)
```

And we create a migration to create this model in our database. The migration will look something like this:

```
CREATE TABLE foo (
    id INTEGER,
    name VARCHAR(128) NOT NULL,
    PRIMARY KEY(id)
)
```

Then, you realize that `name` needs to be nullable for some reason, so you adapt the migration slightly:

```
CREATE TABLE foo (
    id INTEGER,
 -  name VARCHAR(128) NOT NULL,
 +  name VARCHAR(128),
    PRIMARY KEY(id)
)
```

But maybe once you've done this, you forget to make the corresponding update in your model to set `nullable=True` for the `name` column. What now?

One common pattern, heavily encouraged by the FastAPI docs, among others, would be to create a `Foo` Pydantic model that represents the data in the database, so you can select the values from the table, and parse them into a Pydantic object and do data validation that way. That might look like this:

```
class FooSchema(BaseModel):
  id: int
  name: str
```

Importantly, note that `name` is a `str` here (as opposed to `str | None`), because it matches the type of the `name` column we defined with the ORM.

Now, what happens? Let's imagine there are some records in this table, some of which have a `name`, and others for which the `name` is `null`. If we query the table and select any records where `name` is `null`, we get the following error from Pydantic:

```
pydantic_core._pydantic_core.ValidationError: 1 validation error for Foo
name
  Input should be a valid string [type=string_type, input_value=None, input_type=NoneType]
    For further information visit https://errors.pydantic.dev/2.6/v/string_type
```

And our code crashes.

What went wrong here? A few things:

First, we made a mistake and changed the type of a column from nullable to non-null, but forgot to change the corresponding migration (or add a new one). One way this could be caught would be a check that runs in a CI process to ensure that the state of the database after running all of the migrations is in sync with the state of the models as defined in the code, and fails if not.

Second, SQLAlchemy is blind to the state of the database, so it has no problems with calling a column that our database knows to be nullable as being non-null. Without checking the constraints in the database, SQLAlchemy has no way of knowing that there's an issue here.

Third, once the column is mapped to a Python type, it must be mapped to a `str`, since the type as defined by SQLAlchemy is `String` and is importantly _not_ nullable. Since SQLAlchemy thinks that the column is non-null, then it must map to a non-null Python type (`str`), otherwise MyPy would fail.

Speaking of MyPy, the next issue is that once the ORM maps the type in the database (`nullable varchar`) to the type in Python `str`, MyPy thinks all is well, and that the type of that column must be `str` everywhere, which then propagates downstream to the Pydantic models. Ultimately, this means that MyPy has no issues with asserting that the type in the database will be correctly parsed by Pydantic, since it's sure that the `str` from the ORM will always map the `str` in the Pydantic model for the corresponding field.

At runtime, it turns out that the column in the database contains nulls, which eventually make their way to Pydantic, which throws a validation error.
