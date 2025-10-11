import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function ContactLayout({ children }) {
    return (
        <div className="h-dvh overflow-hidden pt-10 sm:pt-10 w-full">
            <ScrollArea className="h-full px-4 md:px-20 overflow-hidden">
                <div className="flex items-center justify-center min-h-dvh py-5 overflow-hidden">
                    {children}
                </div>
            </ScrollArea>
        </div>
    );
}
