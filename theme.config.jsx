const theme = {
  footer: <p></p>,
  head: ({ title, meta }) => {
    return (
      <>
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        {meta.tag && <meta name="keywords" content={meta.tag} />}
        {meta.author && <meta name="author" content={meta.author} />}
      </>
    );
  },
  darkMode: false,
  navs: [],
  navigation: {
    prev: true,
    next: true,
  },
};

export default theme;
