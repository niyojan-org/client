'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconBuildingStore,
  IconPhoneCall,
  IconLogout,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function EventsSidebar({ onLogout }) {
  const [active, setActive] = useState('browse');
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <IconLayoutDashboard size={20} /> },
    { id: 'browse', label: 'Browse Events', icon: <IconCalendarEvent size={20} /> },
    { id: 'organizations', label: 'Organizations', icon: <IconBuildingStore size={20} /> },
    { id: 'contact', label: 'Contact', icon: <IconPhoneCall size={20} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden sm:flex flex-col bg-[#f7fafc] border-r border-gray-200 shadow-sm p-4
          transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Collapse/Expand Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 self-start p-1 rounded hover:bg-gray-200 transition-colors"
          aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
          type="button"
        >
          {collapsed ? <IconMenu2 size={24} /> : <IconX size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center mb-10 select-none cursor-default">
          <div className="relative w-10 h-10">
            <Image src="/icon1.png" sizes='26' alt="orgatick Logo" fill style={{ objectFit: 'contain' }} />
          </div>
          {!collapsed && (
            <span className="ml-3 text-2xl font-bold text-slate-700">orgatick</span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map(({ id, label, icon }) => (
            <TooltipProvider key={id}>
              <Tooltip>
                <TooltipTrigger >
                  <button
                    onClick={() => setActive(id)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md text-left
                      font-medium text-slate-700 hover:bg-blue-100 hover:text-blue-700
                      transition-colors duration-200
                      ${active === id ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    aria-current={active === id ? 'page' : undefined}
                    type="button"
                  >
                    <span className="text-blue-600">{icon}</span>
                    {!collapsed && label}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        {/* Divider */}
        {!collapsed && <div className="border-t border-gray-300 my-6" />}

        {/* Logout Button with Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger >
              <Button
                variant="outline"
                className={`flex items-center justify-center gap-2 mt-auto ${collapsed ? 'justify-center' : ''}`}
                onClick={onLogout}
              >
                <IconLogout size={18} />
                {!collapsed && 'Logout'}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md flex justify-around items-center py-2">
        {navItems.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex flex-col items-center text-xs transition-colors duration-150 ${active === id ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}
          >
            <div>{icon}</div>
            <span className="text-[11px] mt-1">{label}</span>
          </button>
        ))}
        <button
          onClick={onLogout}
          className="flex flex-col items-center text-xs text-gray-500 hover:text-red-600 transition-colors"
        >
          <IconLogout size={20} />
          <span className="text-[11px] mt-1">Logout</span>
        </button>
      </nav>
    </>
  );
}
