import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProfileLayout({ children }) {
    return (
        <div className="h-[100dvh] md:overflow-hidden ">
            <ScrollArea className="h-full ">
                <div className="h-full min-w-full sm:px-8 lg:px-16 pt-16">{children}</div>
            </ScrollArea>
        </div>
    );
}