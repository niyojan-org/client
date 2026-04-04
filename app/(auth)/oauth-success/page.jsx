"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IconLoader2, IconCheck, IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { use } from "react";
import Header from "../components/Header";
import { useUserStore } from "@/store/userStore";

function Page({ searchParams }) {
  const params = use(searchParams);
  const status = params.status || "success";
  const router = useRouter();

  const [phase, setPhase] = useState("processing");

  const { fetchUser } = useUserStore();

  const message =
    params.message ||
    (status === "success"
      ? "Authentication successful. Preparing your session..."
      : "Authentication failed. You can close this window.");

  useEffect(() => {
    const isSuccess = status === "success";

    if (!isSuccess) {
      setPhase("error");
      return;
    }

    const redirectUrl = localStorage.getItem("redirect") || "/events";
    if (localStorage.getItem("redirect")) {
      localStorage.removeItem("redirect");
    }

    const finalize = async () => {
      try {
        await fetchUser();
        setPhase("redirecting");
        router.replace(redirectUrl);
      } catch (error) {
        console.error("Error occurred while finalizing authentication:", error);
        setPhase("error");
      }
    };

    finalize();
  }, [router, status]);

  const isWorking =
    phase === "processing" || phase === "redirecting" || phase === "closing";

  return (
    <div className="h-full flex flex-col items-center justify-between px-4 py-8 bg-transparent">
      <Header />
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          {status === "success" ? (
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              {isWorking ? (
                <IconLoader2 className="animate-spin" size={20} />
              ) : (
                <IconCheck size={20} />
              )}
            </div>
          ) : (
            <div className="rounded-full bg-destructive/10 p-2 text-destructive">
              <IconX size={20} />
            </div>
          )}

          <div>
            <h1 className="text-lg font-semibold">
              {status === "success"
                ? "Authentication Complete"
                : "Authentication Failed"}
            </h1>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 w-full">
          <Button
            type="button"
            className="w-full text-xl h-14 rounded-full"
            onClick={() => router.replace(redirectTo)}
          >
            Continue
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full text-xl h-14 rounded-full"
            onClick={() => window.close()}
          >
            Close Window
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
