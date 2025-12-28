// stores/eventStore.js
import { create } from "zustand";
import api from "@/lib/api";
import { sortTickets } from "./utils/ticket";
import { GetSuccessData, prepareGroupRegistrationPayload, prepareRegistrationPayload, validateFormData } from "./utils/participant";
import { toast } from "sonner";

const useEventRegistrationStore = create((set, get) => ({
    registrationForm: null,
    regFormLoading: false,
    error: null,
    ticket: null,
    isSubmitting: false,
    fieldErrors: {},
    eventSlug: null,
    isPaymentRequired: false,
    resData: null,
    successData: null,
    couponCode: null,

    clearFieldError: (fieldName) => {
        set((state) => {
            const newErrors = { ...state.fieldErrors };
            delete newErrors[fieldName];
            return { fieldErrors: newErrors };
        });
    },

    fetchRegistrationForm: async (slug) => {
        try {
            set({ regFormLoading: true, error: null });
            const res = await api.get(`/event/${slug}/registration`);
            const sortedTickets = sortTickets(res.data.data.tickets || []);
            set({ registrationForm: { ...res.data.data, tickets: sortedTickets } });
            set({ eventSlug: slug });
            get().selectTicket();
        } catch (error) {
            set({ error: error.response?.data || "Failed to fetch registration form" });
        } finally {
            set({ regFormLoading: false });
        }
    },
    selectTicket: (id) => {
        if (!get().registrationForm) return;
        let ticket = null;
        if (id) {
            const idLower = id.toLowerCase();
            ticket = get().registrationForm?.tickets.find(t =>
                t._id?.toLowerCase() === idLower || t.type?.toLowerCase() === idLower
            ) || null;
        }
        set({ ticket });
    },
    register: async (formData) => {
        const ticketId = get().ticket?._id;
        if (!ticketId) {
            toast.error("No ticket selected");
            return { success: false, error: "No ticket selected" };
        }
        const { isValid, errors, firstErrorField } = validateFormData(
            formData,
            get().registrationForm
        );
        set({ fieldErrors: errors });
        if (!isValid) {
            return { success: false, errors, firstErrorField };
        }
        try {
            set({ isSubmitting: true, fieldErrors: {} });
            const payload = prepareRegistrationPayload(formData, ticketId, get().registrationForm, get().couponCode);

            const response = await api.post(`/event/${get().eventSlug}/register/v1`, payload);
            set({ resData: response.data.data });
            if (response.data.code === "PAYMENT_REQUIRED") {
                set({ isPaymentRequired: true });
                return { success: true, code: response.data.code };
            }
            set({ successData: GetSuccessData(response.data) });
            return { success: response.data.code };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                error: error.response?.data?.message || " Registration failed",
            };
        } finally {
            set({ isSubmitting: false });
        }
    },
    registerGroup: async (groupData) => {
        try {
            set({ isSubmitting: true });
            if (!get().ticket?._id) {
                toast.error("No ticket selected for group registration");
                return { success: false, error: "No ticket selected" };
            }
            if (!get().ticket?.isGroupTicket) {
                toast.error("Selected ticket does not support group registration");
                return { success: false, error: "Ticket does not support group registration" };
            }
            const payload = prepareGroupRegistrationPayload(groupData, get().ticket._id, get().registrationForm, get().couponCode);
            // console.log(payload);
            const response = await api.post(`/event/${get().eventSlug}/register/v1`, payload);
            // console.log(response.data);
            set({ resData: response.data.data });
            if (response.data.code === "PAYMENT_REQUIRED") {
                set({ isPaymentRequired: true });
                return { success: true, code: response.data.code };
            }
            // If no payment required, set success data

            set({ successData: GetSuccessData(response.data) });
            return { success: true, code: response.data.code };
        } catch (error) {
            toast.error(error.response?.data?.message || "Group registration failed", {
                description: error.response?.data?.error?.details || "",
            });
            return { success: false, error: error.response?.data?.message || "Group registration failed" };
        } finally {
            set({ isSubmitting: false });
        }
    },
    setCouponCode: (code) => {
        if (!code || code.length < 3) {
            return;
        }
        set({ couponCode: code });
    },
    clearCoupon: () => {
        set({ couponCode: null });
    },
    setSuccessData: (data) => {
        const dataObj = GetSuccessData(data);
        set({ successData: dataObj, isPaymentRequired: false, resData: null });
    }
}));

export default useEventRegistrationStore;