import React, { useState, useMemo } from "react";
import { BiBuildings } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import AdminCard from "../../ui/AdminCard";
import AdminButton from "../../ui/AdminButton";
import {
  ProjectFilter,
  ProjectGrid,
  ProjectDetailsModal,
  ProjectFormModal,
  DeleteConfirmModal,
} from "./components";
import {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../../../features/projectsApi";

const ProjectsTab = () => {
  // API hooks
  const { data: projects = [], isLoading, error } = useGetAllProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  // State
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) => project.type === activeFilter);
  }, [projects, activeFilter]);

  // Handle view project details
  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  // Handle add new project
  const handleAddProject = () => {
    setProjectToEdit(null);
    setIsFormModalOpen(true);
  };

  // Handle edit project
  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setIsFormModalOpen(true);
  };

  // Handle delete project
  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  // Handle save project (add or edit)
  const handleSaveProject = async (projectData) => {
    try {
      if (projectToEdit) {
        // Update existing project
        console.log("Updating project with ID:", projectToEdit.id);
        console.log("Project to edit:", projectToEdit);
        await updateProject({ id: projectToEdit.id, formData: projectData }).unwrap();
      } else {
        // Create new project
        await createProject(projectData).unwrap();
      }
      setIsFormModalOpen(false);
      setProjectToEdit(null);
    } catch (error) {
      console.error("Failed to save project:", error);
      
      // Show more detailed error message
      if (error.status === 'PARSING_ERROR') {
        alert('Backend error: The API endpoint is not responding correctly. Please check if the backend server is running and the route exists.');
      } else if (error.status === 401) {
        alert('Authentication error: Please login again.');
      } else if (error.status === 404) {
        alert('API endpoint not found. Please check the backend routes.');
      } else {
        alert(`Error: ${error.message || 'Failed to save project'}`);
      }
      
      throw error;
    }
  };

  // Confirm delete project
  const confirmDeleteProject = async () => {
    try {
      await deleteProject(projectToDelete.id).unwrap();
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <>
      <AdminCard
        title="Projects Management"
        subtitle={`Total Projects: ${projects.length}`}
        icon={BiBuildings}
        headerActions={
          <AdminButton
            variant="primary"
            size="sm"
            icon={FaPlus}
            onClick={handleAddProject}
          >
            Add New Project
          </AdminButton>
        }
      >
        {/* Filter Buttons */}
        <ProjectFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Error loading projects: {error.message}
          </div>
        ) : (
          <ProjectGrid
            projects={filteredProjects}
            onView={handleViewProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        )}
      </AdminCard>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />

      {/* Project Form Modal (Add/Edit) */}
      <ProjectFormModal
        project={projectToEdit}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setProjectToEdit(null);
        }}
        onSave={handleSaveProject}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDeleteProject}
        projectTitle={projectToDelete?.title}
      />
    </>
  );
};

export default ProjectsTab;
