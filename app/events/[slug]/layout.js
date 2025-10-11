import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="h-[100dvh]">   
      {/* <ScrollArea className="h-full">  */}
        <div className="h-full">{children}</div>
      {/* </ScrollArea> */}
    </div>
  );
}
