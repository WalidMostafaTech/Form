import PageBannerSkeleton from "../Loading/SkeletonLoading/PageBannerSkeleton";

const PageBanner = ({ image, title, description, html, loading }) => {
  if (loading) return <PageBannerSkeleton />;

  return (
    <article
      className="w-full min-h-72 bg-cover bg-center bg-primary relative content-end"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-primary/50" />

      <div className="relative z-10 container h-full pt-20 pb-10 flex flex-col items-start justify-end gap-2">
        {title && (
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white capitalize">
            {title}
          </h1>
        )}

        {description &&
          (html ? (
            <div
              className="text-sm md:text-base text-white/80 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-sm md:text-base text-white/80 max-w-2xl">
              {description}
            </p>
          ))}
      </div>
    </article>
  );
};

export default PageBanner;
