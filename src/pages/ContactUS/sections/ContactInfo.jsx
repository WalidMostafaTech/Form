const ContactInfo = () => {
  const contactDetails = [
    {
      id: 1,
      label: "location",
      value:
        "Zayed Bin Sultan St., 452 Central District, Second Floor, Office 202Abu Dhabi Emirate, Al Ain UAE",
    },
    {
      id: 2,
      label: "phone",
      value: "+971 50 124 5557",
    },
    {
      id: 3,
      label: "email",
      value: "info@info.com",
    },
    {
      id: 4,
      label: "office hours",
      value:
        "Sunday – Friday: 8:00AM to 1:00PM, 5:00PM to 9:00PM Saturday: Closed",
    },
  ];

  return (
    <div>
      <h3 className="text-xl uppercase tracking-widest mb-4">
        form information
      </h3>

      <ul className="space-y-4">
        {contactDetails.map((detail) => (
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
