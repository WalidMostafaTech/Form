import PageBanner from "@/components/commonSections/PageBanner";
import ContactForm from "./sections/ContactForm";
import ContactInfo from "./sections/ContactInfo";
import ContactMap from "./sections/ContactMap";
import { getContactInformation } from "@/api/mainServices";
import { useQuery } from "@tanstack/react-query";

const ContactUS = () => {
  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ["contactInformation"],
    queryFn: getContactInformation,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <PageBanner
        image={contactInfo?.contact_us_image}
        title={"contact us"}
        description={contactInfo?.contact_us_description}
      />

      <section className="container pagePadding">
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
