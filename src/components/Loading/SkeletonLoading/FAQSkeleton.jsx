const FAQSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-card rounded-xl p-4">
          <div className="h-6 w-3/4 bg-muted rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-full bg-muted rounded mb-1 animate-pulse"></div>
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default FAQSkeleton;
