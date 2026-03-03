const ContactMap = ({ map }) => {
  if (!map) return null;

  return (
    <div className="rounded-xl shadow-lg overflow-hidden">
      <iframe
        title="Contact Map"
        src={map}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default ContactMap;
