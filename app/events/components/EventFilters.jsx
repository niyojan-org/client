'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconCategory,
  IconCurrencyDollar,
  IconDeviceLaptop,
  IconSortAscending,
  IconSortDescending,
  IconRefresh,
  IconWifi,
  IconCoffee,
  IconCurrency,
  IconConfetti,
  IconCurrencyRupee
} from '@tabler/icons-react';
import { icons } from 'lucide-react';

export default function EventFilters({
  filters,
  setFilters,
  eventCategories = [],
  modes = [],
}) {
  const toggleItem = (type, value) => {
    setFilters((prev) => {
      const list = Array.isArray(prev[type]) ? [...prev[type]] : [];
      const updated = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [type]: updated };
    });
  };

  const updateSingleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const clearAll = () => {
    const clearedFilters = { categories: [], modes: [], type: '', sortBy: '', sortOrder: 'desc' };
    setFilters(clearedFilters);
  };

  const getActiveCount = () => {
    return filters.categories.length + filters.modes.length +
      (filters.type ? 1 : 0) + (filters.sortBy ? 1 : 0);
  };

  const sortOptions = [
    { label: 'Date Created', value: 'createdAt' },
    { label: 'Event Date', value: 'eventDate' },
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Popularity', value: 'popularity' },
  ];

  const filterSections = [
    {
      title: 'Categories',
      icon: <IconCategory size={18} />,
      items: eventCategories.map(({ name }) => name),
      type: 'categories',
      multiSelect: true,
    },
  ];

  const eventModes = [
    { value: 'online', label: 'Online', icon: <IconWifi size={16} /> },
    { value: 'offline', label: 'Offline', icon: <IconCoffee size={16} /> },
    { value: 'hybrid', label: 'Hybrid', icon: <IconDeviceLaptop size={16} /> }
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">Filters</CardTitle>
          {getActiveCount() > 0 && (
            <Badge variant="secondary" className="text-xs">
              {getActiveCount()} active
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className=""
        >
          <IconRefresh size={16} className="mr-1" />
          Clear
        </Button>
      </div>

      <div className='mt-4 space-y-6 '>
        {/* Categories */}
        {filterSections.map(({ title, icon, items, type }) => (
          <div key={title} className="space-y-1">
            <div className="flex items-center gap-2">
              {icon}
              <Label className="text-sm font-medium">{title}</Label>
              {filters[type]?.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {filters[type].length}
                </Badge>
              )}
            </div>

            <div className="space-y-2 grid grid-cols-2">
              {items.map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${type}-${value}`}
                    checked={filters[type]?.includes(value)}
                    onCheckedChange={() => toggleItem(type, value)}
                  />
                  <Label
                    htmlFor={`${type}-${value}`}
                    className="text-sm font-normal capitalize cursor-pointer"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Event Modes */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <IconDeviceLaptop size={18} />
            <Label className="text-sm font-medium">Event Mode</Label>
            {filters.modes?.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {filters.modes.length}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 space-y-2">
            {eventModes.map(({ value, label, icon }) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`mode-${value}`}
                  checked={filters.modes?.includes(value)}
                  onCheckedChange={() => toggleItem('modes', value)}
                />
                <Label
                  htmlFor={`mode-${value}`}
                  className="text-sm font-normal cursor-pointer flex items-center gap-2"
                >
                  {icon}
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Event Type */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <IconCurrency size={18} />
            <Label className="text-sm font-medium">Event Type</Label>
            {filters.type && (
              <Badge variant="outline" className="text-xs">
                {filters.type}
              </Badge>
            )}
          </div>

          <RadioGroup
            value={filters.type ?? ''}
            onValueChange={(val) => updateSingleFilter('type', val)}
            className="grid grid-cols-2 gap-2"
          >
            {[
              { value: 'free', label: 'Free Events', icon: <IconConfetti size={16} /> },
              { value: 'paid', label: 'Paid Events', icon: <IconCurrencyRupee size={16} /> }
            ].map(({ value, label, icon }) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`type-${value}`} />
                <Label
                  htmlFor={`type-${value}`}
                  className="text-sm font-normal cursor-pointer flex items-center gap-2"
                >
                  <span>{icon}</span>
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Sorting */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <IconSortAscending size={18} />
            <Label className="text-sm font-medium">Sort By</Label>
          </div>

          <div className="space-y-3">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateSingleFilter('sortBy', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sort option" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {filters.sortBy && (
              <div className="flex gap-2">
                <Button
                  variant={filters.sortOrder === 'asc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSingleFilter('sortOrder', 'asc')}
                  className="flex-1"
                >
                  <IconSortAscending size={16} className="mr-1" />
                  Ascending
                </Button>
                <Button
                  variant={filters.sortOrder === 'desc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSingleFilter('sortOrder', 'desc')}
                  className="flex-1"
                >
                  <IconSortDescending size={16} className="mr-1" />
                  Descending
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
