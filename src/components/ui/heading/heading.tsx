interface HeadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  children: React.ReactNode;
  level?: number;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  ...props
}) => {
  const HeadingTag = `h${level}`; // h1, h2, h3, etc.
  return <HeadingTag {...props}>{children}</HeadingTag>;
};
