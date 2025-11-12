// stores/eventStore.js
import { create } from "zustand";
import api from "@/lib/api";

const useEventStore = create((set, get) => ({
  // ---------------------------
  // State
  // ---------------------------
  featuredEvents: [],
  allEvents: [],
  eventCategories: [],
  availableModes: [],
  error: null,
  singleEvent: null,
  loadingSingleEvent: false,
  registrationForm: null,
  loadingRegistrationForm: false,
  loading: false,
  organization: null,

  filters: {
    categories: [],
    modes: [],
    type: "",
  },

  //  Coupon-relateds state
  couponCode: null,
  couponData: null,
  couponDiscount: 0,
  couponFinalPrice: null,
  verifyingCoupon: false,

  // Filters
  setFilters: (newPartialFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newPartialFilters,
      },
    })),

  // Fetch Events
  fetchAllEvents: async ({ params } = {}) => {
    try {
      set({ loading: true });
      const res = await api.get("/event", { params });
      const events = Array.isArray(res.data.data.events)
        ? res.data.data.events
        : [];
      set({ allEvents: events });
    } catch (err) {
      console.error(err);
      set({
        error: err.message || "Failed to fetch all events",
        allEvents: [],
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchFeaturedEvents: async () => {
    try {
      const res = await api.get("/event/featured");
      const events = Array.isArray(res.data.data.events)
        ? res.data.data.events
        : [];
      set({ featuredEvents: events });
    } catch (err) {
      console.error(err);
      set({
        error: err.message || "Failed to fetch featured events",
        featuredEvents: [],
      });
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
      const regRes = await api.get(`/event/${slug}/registration`);

      const regData = regRes.data.data;

      set({
        registrationForm: {
          ...regData
        },
      });
    } catch (err) {
      set({
        error: err.response?.data
      });
    } finally {
      set({ loadingRegistrationForm: false });
    }
  },

  //  Locally calculate discount (mirrors backend exact data)
  calculateDiscountedPrice: (originalPrice, coupon) => {
    if (!coupon || typeof originalPrice !== "number" || originalPrice <= 0) {
      return { finalPrice: originalPrice, discount: 0 };
    }
    const finalPrice = Math.max(0, originalPrice - coupon.discountValue);
    const discount = Math.min(originalPrice, coupon.discountValue);
    return { finalPrice, discount };

    // Minimum order value
    if (coupon.minOrderValue && originalPrice < coupon.minOrderValue) {
      return {
        finalPrice: originalPrice,
        discount: 0,
        reason: `Minimum order value ₹${coupon.minOrderValue} not met`,
      };
    }

    // let discount = 0;

    // if (coupon.discountType === "flat") {
    //   discount = coupon.discountValue;
    // } else if (coupon.discountType === "percent") {
    //   discount = Math.round((originalPrice * coupon.discountValue) / 100);
    // }

    // // Apply maxDiscount if present
    // if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    //   discount = coupon.maxDiscount;
    // }

    // // Never exceed the price
    // discount = Math.min(discount, originalPrice);
    // // const finalPrice = Math.max(0, originalPrice - discount);

    // return { finalPrice, discount };
  },

  //   Verify coupon from backend + compute frontend discount preview
  verifyCouponCode: async (eventSlug, code, ticketPrice = null) => {
    set({
      verifyingCoupon: true,
      error: null,
      couponData: null,
      couponCode: null,
      couponDiscount: 0,
      couponFinalPrice: null,
    });

    try {
      if (!code || !code.trim()) {
        throw new Error("Please enter a valid coupon code");
      }

      const res = await api.get(`/event/coupon/${eventSlug}/${code.trim()}`);
      const coupon = res.data?.data;

      if (!coupon) {
        throw new Error("Invalid coupon response from server");
      }

      // Compute preview
      let discountAmount = 0;
      let finalPrice = ticketPrice;
      if (typeof ticketPrice === "number") {
        const { discount, finalPrice: fPrice } = get().calculateDiscountedPrice(
          ticketPrice,
          coupon
        );
        discountAmount = discount;
        finalPrice = fPrice;
      }

      set({
        couponCode: coupon.code,
        couponData: coupon,
        couponDiscount: discountAmount,
        couponFinalPrice: finalPrice,
        verifyingCoupon: false,
        error: null,
      });

      return { coupon, discountAmount, finalPrice };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Coupon verification failed";

      set({
        error: message,
        couponData: null,
        couponCode: null,
        couponDiscount: 0,
        couponFinalPrice: null,
        verifyingCoupon: false,
      });

      throw err;
    }
  },

  //  * Clear coupon
  clearCoupon: () =>
    set({
      couponCode: null,
      couponData: null,
      couponDiscount: 0,
      couponFinalPrice: null,
      error: null,
    }),

  //fetch organization by sluggg
  fetchOrganizationBySlug: async (slug) => {
    set({ loading: true, error: null, organization: null });
    try {
      const res = await api.get(`/org/public/${slug}`);
      set({ organization: res.data.organization, loading: false });
    } catch (err) {
      console.log(err);
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch organization",
        loading: false,
      });
    }
  },

  // Cleanup helpers
  clearSingleEvent: () => set({ singleEvent: null, error: null }),
  clearRegistrationForm: () => set({ registrationForm: null, error: null }),
  clearOrganization: () =>
    set({ organization: null, loading: false, error: null }),
}));

export default useEventStore;
