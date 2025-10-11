import { useGetAllBlogsQuery } from "../../../features/blogsApi";
import SingleFeedCard from "./SingleFeedCard";

const Feeds = () => {
  const { data: blogs = [], isLoading, isError } = useGetAllBlogsQuery({ limit: 3 });

  return (
    <div className="pt-10 pb-16">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">blog post</h1>
        <h1 className="heading">latest newsfeeds</h1>
      </div>
      
      {isLoading ? (
        <div className="flex flex-wrap gap-4 mt-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex-1 basis-[18rem] shadow-light dark:border-card-dark border rounded-lg overflow-hidden animate-pulse"
            >
              <div className="w-full h-[200px] bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-3 space-y-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8 mt-8">
          <p className="text-red-500">Failed to load blogs. Please try again later.</p>
        </div>
      ) : !blogs.length ? (
        <div className="text-center py-8 mt-8">
          <p className="text-gray-500 dark:text-gray-400">No blogs available at the moment.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 mt-8">
          {blogs.slice(0, 3).map((feed) => (
            <SingleFeedCard key={feed.id} {...feed} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feeds;
