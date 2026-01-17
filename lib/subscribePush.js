import { toast } from "sonner";
import baseApi from "./base.api";

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

export async function subscribeUser() {
    toast.promise(doSubscribeUser(), {
        loading: "Enabling notifications...",
        success: "Notifications enabled!",
        error: (err) => err.message || "Failed to enable notifications"
    });
}

async function doSubscribeUser() {
    if (!("serviceWorker" in navigator)) {
        throw new Error("Service workers are not supported in this browser.");
    }

    if (!("PushManager" in window)) {
        throw new Error("Push messaging is not supported in this browser.");
    }

    // iOS PWA check
    if (
        /iPhone|iPad|iPod/.test(navigator.userAgent) &&
        !window.matchMedia("(display-mode: standalone)").matches
    ) {
        throw new Error("Install the app to enable notifications on iOS.");
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        throw new Error("Notification permission denied.");
    }

    const reg = await navigator.serviceWorker.ready;

    // Prevent duplicate subscriptions
    let sub = await reg.pushManager.getSubscription();

    if (!sub) {
        sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_KEY
            )
        });
    }

    await baseApi.post("/subscribe", sub);
}
