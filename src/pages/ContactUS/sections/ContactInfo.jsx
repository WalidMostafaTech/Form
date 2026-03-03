const ContactInfo = ({ contactDetails }) => {
  const contactDetailsList = [
    {
      id: 1,
      label: "location",
      value: contactDetails?.address || "-",
    },
    {
      id: 2,
      label: "phone",
      value: contactDetails?.phone || "-",
    },
    {
      id: 3,
      label: "email",
      value: contactDetails?.email || "-",
    },
    {
      id: 4,
      label: "office hours",
      value: contactDetails?.working_hours || "-",
    },
  ];

  return (
    <div>
      <h3 className="text-xl uppercase tracking-widest mb-4">
        form information
      </h3>

      <ul className="space-y-4">
        {contactDetailsList.map((detail) => (
          <li key={detail.id} className="space-y-1">
            <p className="font-semibold uppercase">{detail.label}</p>
            <span className="text-muted-foreground text-sm">
              {detail.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactInfo;
