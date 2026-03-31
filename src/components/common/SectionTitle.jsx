import { Link } from "react-router";

const SectionTitle = ({ title, spanTitle, link, linkText, margin=true }) => {
  return (
    <hgroup
      className={`flex flex-wrap items-center justify-between gap-4  ${margin ? "mb-6 lg:mb-8" : ""}`}
    >
      {title && (
        <h2 className="text-3xl lg:text-4xl capitalize font-medium">
          {title}{" "}
          {spanTitle && <span className="text-primary">{spanTitle}</span>}
        </h2>
      )}

      {link && (
        <Link
          to={link}
          className="text-secondary border-b-2 border-secondary uppercase"
        >
          {linkText}
        </Link>
      )}
    </hgroup>
  );
};

export default SectionTitle;
