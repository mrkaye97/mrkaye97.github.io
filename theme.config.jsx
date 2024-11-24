const theme = {
  footer: <p></p>,
  head: ({ title, meta }) => {
    return (
      <>
        {meta.preview && <meta name="description" content={meta.preview} />}
        {meta.categories && (
          <meta name="keywords" content={meta.categories.join(", ")} />
        )}
        {meta.author && <meta name="author" content={meta.author} />}
      </>
    );
  },
  darkMode: false,
  components: {
    pre: ({ children }) => (
      <pre className="bg-blue-700 rounded-xl px-0 py-4">{children}</pre>
    ),
  },
};

export default theme;
