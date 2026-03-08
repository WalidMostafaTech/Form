import PageBanner from "@/components/commonSections/PageBanner";
import ContactForm from "./sections/ContactForm";
import ContactInfo from "./sections/ContactInfo";
import ContactMap from "./sections/ContactMap";
import { getContactInformation } from "@/api/mainServices";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const ContactUS = () => {
  const { t } = useTranslation();

  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ["contactInformation"],
    queryFn: getContactInformation,
  });

  return (
    <main>
      <PageBanner
        image={contactInfo?.contact_us_image}
        title={t("ContactUS.pageTitle")}
        description={contactInfo?.contact_us_description}
        html={true}
        loading={isLoading}
      />

      <section className="container lg:max-w-5xl pagePadding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ContactForm />
          <ContactInfo contactDetails={contactInfo} />
        </div>

        <ContactMap map={contactInfo?.map_embed_code} />
      </section>
    </main>
  );
};

export default ContactUS;
