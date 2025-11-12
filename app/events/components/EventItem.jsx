'use client';
import Link from 'next/link';
import { format } from 'date-fns';

export default function EventItem({ event }) {
  const session = event.sessions?.[0];
  const startTime = session?.startTime;

  return (
    <Link href={`/events/${event.slug}`} className="block rounded-xl border hover:shadow-lg transition">
      <img
        src={event.bannerImage || '/fallback.jpg'}
        alt={event.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        {startTime ? (
          <p className="text-sm text-gray-600">{format(new Date(startTime), 'MMM d, yyyy h:mm a')}</p>
        ) : (
          <p className="text-sm text-gray-600">Date TBD</p>
        )}
        <p className="text-sm text-gray-500">{event.organization?.name}</p>
      </div>
    </Link>
  );
}
