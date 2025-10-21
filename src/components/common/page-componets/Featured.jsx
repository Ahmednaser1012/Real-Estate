import { useGetAllProjectsQuery } from "../../../features/projectsApi";
import SingleProductCard from "./SingleProductCard";

const Featured = () => {
  const { data: projectsResponse = {}, isLoading, error } = useGetAllProjectsQuery();

  // Extract projects array from response (handle both array and object responses)
  const projects = Array.isArray(projectsResponse) 
    ? projectsResponse 
    : (projectsResponse?.data || []);

  // Get first 3 projects for featured section
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="pt-10 pb-16">
      <div className="text-center">
        <h1 className="mx-auto sub-heading">Projects</h1>
        <h1 className="heading">explore our latest projects</h1>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-500">Error loading projects. Please try again later.</p>
        </div>
      )}

      {!isLoading && !error && featuredProjects.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-8">
          {featuredProjects.map((project) => (
            <SingleProductCard key={project.id} {...project} />
          ))}
        </div>
      )}

      {!isLoading && !error && featuredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No featured projects available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Featured;
