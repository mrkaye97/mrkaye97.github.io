function TextLink({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      className="text-light-seafoam hover:text-dark-seafoam transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}

export { TextLink };
