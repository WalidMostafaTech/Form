const ContactMap = () => {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden">
      <iframe
        title="Contact Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.1234567890123!2d31.2357123456789!3d30.0444123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847123456789%3A0xabcdef1234567890!2sTechno%20Masr%20Company!5e0!3m2!1sen!2seg!4v1690000000000"
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
