import { create } from "zustand";
import api from "@/lib/api";
// import useLoader from "@/components/LoaderContext";
import { useLoaderStore } from "./loaderStore";

const useEventStore = create((set) => ({
  featuredEvents: [],
  allEvents: [],
  eventCategories: [],
  availableModes: [],
  error: null,
  singleEvent: null,
  loadingSingleEvent: false,
  registrationForm: null,
  loadingRegistrationForm: false,
  filters: {
    categories: [],
    modes: [],
    type: "",
  },
  loading: false,

  setFilters: (newPartialFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newPartialFilters,
      },
    })),

  fetchFeaturedEvents: async () => {
    try {
      const res = await api.get("/event/featured");
      set({ featuredEvents: res.data.data.events });
    } catch (err) {
      set({ error: err.message || "Failed to fetch featured events" });
    }
  },

  fetchAllEvents: async ({ params } = {}) => {
    // const { showLoader, hideLoader } = useLoaderStore.getState();
    console.log(params);
    try {
      set({ loading: true });
      const res = await api.get("/event", {
        params,
      });
      const events = res.data.data.events;
      console.log(events);
      // const modes = Array.from(
      //   new Set(events.map((e) => e.mode).filter(Boolean))
      // );
      set({ allEvents: events });
    } catch (err) {
      set({ error: err.message || "Failed to fetch all events" });
    } finally {
      set({ loading: false });
    }
  },

  fetchEventCategories: async () => {
    try {
      const res = await api.get("/event/categories");
      set({ eventCategories: res.data.data.categories });
    } catch (err) {
      set({ error: err.message || "Failed to fetch event categories" });
    }
  },

  fetchEventBySlug: async (slug) => {
    set({ loadingSingleEvent: true, error: null });
    try {
      const res = await api.get(`/event/${slug}`);
      // console.log(res.data.event)
      set({ singleEvent: res.data.event });
    } catch (err) {
      set({ error: err.message || "Failed to fetch event by slug" });
    } finally {
      set({ loadingSingleEvent: false });
    }
  },

  fetchRegistrationForm: async (slug) => {
    set({ loadingRegistrationForm: true, error: null, registrationForm: null });
    try {
      const [eventRes, regRes] = await Promise.all([
        api.get(`/event/${slug}`),
        api.get(`/event/${slug}/registration`),
      ]);

      const eventData = eventRes.data.event;
      const regData = regRes.data.data;

      set({
        registrationForm: {
          ...regData,
          eventDetails: eventData,
          allowCoupons: eventData?.allowCoupons ?? false,
        },
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch registration form",
      });
    } finally {
      set({ loadingRegistrationForm: false });
    }
  },

  clearSingleEvent: () => set({ singleEvent: null, error: null }),
  clearRegistrationForm: () => set({ registrationForm: null, error: null }),
}));

export default useEventStore;
