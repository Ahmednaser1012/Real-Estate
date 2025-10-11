import { useGetAllBlogsQuery } from "../../../features/blogsApi";
import SingleFeedCard from "./SingleFeedCard";

const BlogPostsList = () => {
  const { data: blogs = [], isLoading, isError } = useGetAllBlogsQuery({ limit: 6 });

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(6)].map((_, index) => (
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
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load blogs. Please try again later.</p>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No blogs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {blogs.slice(0, 6).map((feed) => (
        <SingleFeedCard key={feed.id} {...feed} />
      ))}
    </div>
  );
};

export default BlogPostsList;
