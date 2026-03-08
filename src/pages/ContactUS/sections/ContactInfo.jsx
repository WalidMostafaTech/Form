import { useTranslation } from "react-i18next";

const ContactInfo = ({ contactDetails }) => {
  const { t } = useTranslation();

  const contactDetailsList = [
    {
      id: 1,
      label: t("ContactInfo.location"),
      value: contactDetails?.address || "-",
    },
    {
      id: 2,
      label: t("ContactInfo.phone"),
      value: contactDetails?.phone || "-",
    },
    {
      id: 3,
      label: t("ContactInfo.email"),
      value: contactDetails?.email || "-",
    },
    {
      id: 4,
      label: t("ContactInfo.officeHours"),
      value: contactDetails?.working_hours || "-",
    },
  ];

  return (
    <div>
      <h3 className="text-xl uppercase tracking-widest mb-4">
        {t("ContactInfo.heading")}
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
