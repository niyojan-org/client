'use client';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import EventFilters from './EventFilters';

export default function MobileNavbar({
  filters,
  setFilters,
  eventCategories,
  modes,
  onApply,
  onClear,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-30 md:hidden">
      <h1 className="text-xl font-bold tracking-tight">Events</h1>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconMenu2 size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[85%] max-w-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <SheetTitle className="text-lg">Filters</SheetTitle>
            <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
              <IconX size={20} />
            </Button>
          </div>

          <EventFilters
            filters={filters}
            setFilters={setFilters}
            eventCategories={eventCategories}
            modes={modes}
            onApply={() => {
              onApply?.();
              setOpen(false);
            }}
          />

          <Button
            variant="ghost"
            className="mt-4 text-red-500 w-full"
            onClick={() => {
              onClear?.();
              setOpen(false);
            }}
          >
            Clear Filters
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
