import PageBannerSkeleton from "../Loading/SkeletonLoading/PageBannerSkeleton";

const PageBanner = ({ image, title, description, html, loading }) => {
  if (loading) return <PageBannerSkeleton />;

  return (
    <article
      className="w-full min-h-72 lg:min-h-80 bg-cover bg-center bg-primary relative content-end"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-primary/50" />

      <div className="relative z-10 container h-full pt-20 pb-4 lg:pb-10 flex flex-col items-start justify-end gap-2 lg:gap-4">
        {title && (
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white capitalize">
            {title}
          </h1>
        )}

        {description &&
          (html ? (
            <div
              className="text-sm lg:text-base text-white max-w-2xl rich_content"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-sm lg:text-base text-white max-w-2xl">
              {description}
            </p>
          ))}
      </div>
    </article>
  );
};

export default PageBanner;
