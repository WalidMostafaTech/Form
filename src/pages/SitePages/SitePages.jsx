import SectionTitle from "@/components/common/SectionTitle";
import TextSkeleton from "@/components/Loading/SkeletonLoading/TextSkeleton";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const SitePages = () => {
  const { slug } = useParams();

  const { settings, loading } = useSelector((state) => state.settings);

  const { t } = useTranslation();

  const title = slug === "terms" ? t("termsAndConditions") : t("privacyPolicy");
  const content =
    slug === "terms" ? settings?.terms_conditions : settings?.privacy_policy;

  return (
    <main className="container sectionPadding pt-24 md:pt-28">
      <SectionTitle title={title} />

      {loading ? (
        <TextSkeleton />
      ) : (
        <div
          className="rich_content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </main>
  );
};

export default SitePages;
