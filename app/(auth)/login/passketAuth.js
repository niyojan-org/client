import baseApi from "@/lib/base.api";
import { authStore } from "../authStore";
import { toast } from "sonner";

const base64urlToBuffer = (base64url) => {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const padLength = (4 - (base64.length % 4)) % 4;
    const padded = base64 + "=".repeat(padLength);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
};

const bufferToBase64url = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

const buildCredentialRequestOptions = (passkeyOptions) => {
    const source = passkeyOptions?.publicKey || passkeyOptions;

    if (!source?.challenge || !source?.rpId) {
        throw new Error("Invalid passkey options received from server");
    }

    const publicKey = {
        challenge: base64urlToBuffer(source.challenge),
        rpId: source.rpId,
        timeout: source.timeout || 60000,
        userVerification: source.userVerification || "preferred",
    };

    if (Array.isArray(source.allowCredentials) && source.allowCredentials.length > 0) {
        publicKey.allowCredentials = source.allowCredentials
            .filter((credential) => credential?.id)
            .map((credential) => ({
                type: credential.type || "public-key",
                id: base64urlToBuffer(credential.id),
                transports: credential.transports,
            }));
    }

    return { publicKey };
};

const passkeyAuth = async (passkeyOptions, email, useConditionalMediation = false) => {
    const { setIsPasskeyAvailable } = authStore.getState();
    try {
        if (!window?.PublicKeyCredential || !window?.isSecureContext) {
            throw new Error("Passkeys require a secure context (HTTPS) and browser support");
        }

        const requestOptions = buildCredentialRequestOptions(passkeyOptions);

        if (useConditionalMediation) {
            requestOptions.mediation = "conditional";
        }

        const credential = await navigator.credentials.get(requestOptions);

        if (!credential) {
            setIsPasskeyAvailable(false);
            return;
        }
        console.log("All good till here");
        const credentialJSON = {
            id: credential.id,
            rawId: bufferToBase64url(credential.rawId),
            type: credential.type,
            response: {
                authenticatorData: bufferToBase64url(credential.response.authenticatorData),
                clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
                signature: bufferToBase64url(credential.response.signature),
                userHandle: credential.response.userHandle
                    ? bufferToBase64url(credential.response.userHandle)
                    : null,
            },
        };
        console.log(credentialJSON);
        const verifyResponse = await baseApi.post('/auth/passkeys/authenticate/verify', { email, assertion: credentialJSON });

        if (!verifyResponse.data.success) {
            const message = verifyResponse.data.message || 'Login verification failed';
            toast.error(message);
            throw new Error(message);
        }

        setIsPasskeyAvailable(true);
        return true;
    } catch (error) {
        console.log(error);
        setIsPasskeyAvailable(false);
        throw error;
    }
}

export default passkeyAuth;