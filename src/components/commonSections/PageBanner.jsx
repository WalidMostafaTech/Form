import PageBannerSkeleton from "../Loading/SkeletonLoading/PageBannerSkeleton";

const PageBanner = ({ image, title, description, html, loading }) => {
  if (loading) return <PageBannerSkeleton />;

  return (
    <article
      className="w-full min-h-72 lg:min-h-80 bg-cover bg-center bg-primary relative content-end"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-primary/50" />

      <div className="relative z-10 container h-full pt-20 pb-10 flex flex-col items-start justify-end gap-4">
        {title && (
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-white capitalize">
            {title}
          </h1>
        )}

        {description &&
          (html ? (
            <div
              className="md:text-base text-white max-w-2xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="md:text-base text-white max-w-2xl">
              {description}
            </p>
          ))}
      </div>
    </article>
  );
};

export default PageBanner;
