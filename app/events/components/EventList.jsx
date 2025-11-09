'use client';
import EventItem from './EventCard';

export default function EventsList({ events }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventItem key={event._id} event={event} />
      ))}
    </div>
  );
}
