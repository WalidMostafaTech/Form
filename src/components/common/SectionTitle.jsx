const SectionTitle = ({ title, description, center = true }) => {
  return (
    <hgroup className={`${center ? "text-center" : ""} mb-4 lg:mb-8`}>
      {title && <h2 className="text-3xl font-bold">{title}</h2>}
      {description && <p>{description}</p>}
    </hgroup>
  );
};

export default SectionTitle;
