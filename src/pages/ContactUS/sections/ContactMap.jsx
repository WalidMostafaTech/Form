const ContactMap = ({ map }) => {
  if (!map) return null;

  return (
    <div
      className="rounded-xl shadow-lg overflow-hidden [&>iframe]:w-full [&>iframe]:h-100 rich_content"
      dangerouslySetInnerHTML={{ __html: map }}
    />
  );
};
export default ContactMap;
