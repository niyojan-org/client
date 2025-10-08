import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProfileLayout({ children }) {
    return (
        <div className="h-dvh md:overflow-hidden w-full">
            <ScrollArea className="h-full w-full">
                <div className="h-full min-w-full px-2 sm:px-8 lg:px-16 w-full">{children}</div>
            </ScrollArea>
        </div>
    );
}