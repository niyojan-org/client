import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProfileLayout({ children }) {
    return (
        <div className="px-2 sm:px-10 md:overflow-hidden w-full">
            {children}
        </div>
    );
}