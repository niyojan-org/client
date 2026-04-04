"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "../authStore";
import MfaShell from "./components/MfaShell";
import MfaMethodSelector from "./components/MfaMethodSelector";
import PasskeyMfaCard from "./components/PasskeyMfaCard";
import { useUserStore } from "@/store/userStore";

const MFA_METHODS = [
  {
    id: "passkey",
    label: "Passkey",
    helperText: "Face ID, fingerprint, or security key",
  },
];

function Page() {
  const router = useRouter();
  const { email, emailDraft } = authStore();
  const { fetchUser } = useUserStore();

  const initialEmail = useMemo(
    () => (email || emailDraft || "").trim(),
    [email, emailDraft],
  );

  const [activeMethod, setActiveMethod] = useState("passkey");

  useEffect(() => {
    if (!initialEmail) {
      router.replace("/login");
    }
  }, [initialEmail, router]);

  if (!initialEmail) {
    return null;
  }
  const onSuccess = () => {
    const externalAuth = localStorage.getItem("redirect");
    if (externalAuth) {
      localStorage.removeItem("redirect");
      fetchUser();
      router.replace(externalAuth);
    } else {
      fetchUser();
      router.replace("/events");
    }
  };

  return (
    <MfaShell>
      {/* <MfaMethodSelector
        methods={MFA_METHODS}
        activeMethod={activeMethod}
        onMethodChange={setActiveMethod}
      /> */}
      {activeMethod === "passkey" && (
        <PasskeyMfaCard email={initialEmail} onSuccess={onSuccess} />
      )}
    </MfaShell>
  );
}

export default Page;
