import React from "react";
import { BiCalendar } from "react-icons/bi";
import EventCard from "./EventCard";

const EventsList = ({ events, isLoading, error, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-gray-500 mt-4">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 font-medium">Error loading events</p>
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <BiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-2">No events found</p>
        <p className="text-gray-400 text-sm">Create your first event to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EventsList;
