import { Suspense } from "react";
import PaymentReturnPage from "./PaymentReturnPage";

export const dynamic = "force-dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <PaymentReturnPage />
    </Suspense> 
  )
}