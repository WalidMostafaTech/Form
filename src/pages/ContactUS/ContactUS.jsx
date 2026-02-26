import PageBanner from "@/components/commonSections/PageBanner";
import image from "@/assets/images/bg-img.jpg";
import ContactForm from "./sections/ContactForm";
import ContactInfo from "./sections/ContactInfo";
import ContactMap from "./sections/ContactMap";

const ContactUS = () => {
  return (
    <main>
      <PageBanner
        image={image}
        title={"contact us"}
        description={
          "We are here to help and answer any question you might have. We look forward to hearing from you."
        }
      />

      <section className="container pagePadding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ContactForm />
          <ContactInfo />
        </div>

        <ContactMap />
      </section>
    </main>
  );
};

export default ContactUS;
