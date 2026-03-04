/**
 * Push Notification Subscription Module
 * 
 * Common Issues:
 * 1. AbortError - Browser's push service is unavailable. Can be caused by:
 *    - Ad blockers or browser extensions blocking push services
 *    - VPNs or network restrictions
 *    - Browser's FCM/push service being down
 *    - Private/Incognito mode in some browsers
 * 
 * 2. NotAllowedError - User denied permission or browser blocked it
 * 
 * 3. NotSupportedError - Browser doesn't support push notifications
 * 
 * Debugging:
 * - Check browser console for detailed error messages
 * - Verify VAPID key is correctly set in .env.local
 * - Ensure service worker is properly registered
 * - Test in a regular browser window (not private/incognito)
 * - Temporarily disable ad blockers and VPNs
 */

import { toast } from "sonner";
import api from "./api";

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

/**
 * Subscribe user to push notifications
 * @returns {Promise<boolean>} Success status
 */
export async function subscribeUser() {
    try {
        const result = await doSubscribeUser();
        toast.success("Push notifications enabled!");
        return result;
    } catch (error) {
        console.error("Push subscription error:", error);

        // Show error message with helpful context
        const errorMsg = error.message || "Failed to enable push notifications";
        toast.error(errorMsg, {
            description: "You can still receive in-app notifications",
            duration: 7000,
        });
        return false;
    }
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

    // Check current permission
    let permission = Notification.permission;

    // Request permission if not already granted or denied
    if (permission === "default") {
        permission = await Notification.requestPermission();
    }

    if (permission === "denied") {
        throw new Error("Notification permission denied. Please enable it in browser settings.");
    }

    if (permission !== "granted") {
        throw new Error("Notification permission not granted.");
    }

    // Wait for service worker to be ready with timeout
    let reg;
    try {
        reg = await Promise.race([
            navigator.serviceWorker.ready,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Service worker timeout')), 10000)
            )
        ]);
    } catch (error) {
        throw new Error("Service worker is not ready. Please refresh the page and try again.");
    }

    // Check for existing subscription
    let subscription = await reg.pushManager.getSubscription();

    if (!subscription) {
        // Create new subscription
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
        if (!vapidKey) {
            throw new Error("VAPID key not configured");
        }

        try {
            subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidKey)
            });
            console.log("Push subscription successful");
        } catch (error) {
            console.error("Push subscription error:", error);
            console.error("Error name:", error.name);
            console.error("Error message:", error.message);

            // Handle specific error types
            if (error.name === 'AbortError') {
                throw new Error("Push service is currently unavailable. This may happen if: (1) You're using a VPN or ad blocker that blocks push services, (2) The browser's push service is down, or (3) There are network issues. Try disabling ad blockers, VPNs, or try again later.");
            } else if (error.name === 'NotAllowedError') {
                throw new Error("Push notifications are blocked. Please enable them in your browser settings.");
            } else if (error.name === 'NotSupportedError') {
                throw new Error("Push notifications are not supported in this browser.");
            } else if (error.message?.includes('Registration failed')) {
                throw new Error("Unable to register for push notifications. This may be due to browser restrictions or network issues. Try refreshing the page or disabling ad blockers/VPNs.");
            }

            throw new Error(`Failed to subscribe: ${error.message || 'Unknown error'}`);
        }
    }


    await api.post("/notifications/push-tokens", {
        token: JSON.stringify(subscription),
        device_type: "web",
        subscription: JSON.stringify(subscription),
        device_id: subscription.endpoint, // Using endpoint as device ID for simplicity
        deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
        }
    }).catch(error => {
        console.error("API error saving push token:", error);
        throw new Error("Failed to save push subscription on server.");
    });

    return true;
}

/**
 * Unsubscribe user from push notifications
 * @returns {Promise<boolean>} Success status
 */
export async function unsubscribeUser() {
    try {
        if (!("serviceWorker" in navigator)) {
            return false;
        }

        const reg = await navigator.serviceWorker.ready;
        const subscription = await reg.pushManager.getSubscription();

        if (subscription) {
            await subscription.unsubscribe();
            toast.success("Push notifications disabled");
        }

        return true;
    } catch (error) {
        console.error("Push unsubscribe error:", error);
        toast.error("Failed to disable push notifications");
        return false;
    }
}

/**
 * Check if push notifications are supported
 * @returns {boolean}
 */
export function isPushSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * Get current notification permission status
 * @returns {NotificationPermission}
 */
export function getNotificationPermission() {
    if (typeof Notification === "undefined") {
        return "default";
    }
    return Notification.permission;
}

/**
 * Check if user is subscribed to push notifications
 * @returns {Promise<boolean>}
 */
export async function isSubscribed() {
    try {
        if (!("serviceWorker" in navigator)) {
            return false;
        }

        const reg = await navigator.serviceWorker.ready;
        const subscription = await reg.pushManager.getSubscription();

        return subscription !== null;
    } catch (error) {
        console.error("Error checking subscription:", error);
        return false;
    }
}

