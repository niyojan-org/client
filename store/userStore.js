import api from "@/lib/api";
import { toast } from "sonner";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: null,
  organization: null,
  token: null,
  loading: false,
  error: null,
  message: null,
  isAuthenticated: null,

  // --- LOGIN ---
  login: async (credentials) => {
    const { email, password } = credentials;
    if (!email || !password) {
      toast.error("Email and password are required");
      set({ error: "Email and password are required" });
      return false;
    }

    try {
      set({ loading: true, error: null, message: null });
      const response = await api.post("/api/auth/login", credentials);
      const { userId, name, email: userEmail, avatar, token, organizationId } = response.data.data;

      // Save token in state & localStorage
      set({ token });
      localStorage.setItem("token", token);

      set({
        user: { userId, name, email: userEmail, avatar, organizationId },
        isAuthenticated: true,
        message: response.data.message,
      });

      toast.success(response.data.message || "Login successful!");
      return true; // indicate success
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      set({ error: msg, isAuthenticated: false });
      toast.error(msg, { description: error?.response?.data?.error?.details });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // --- REGISTER ---
  register: async (userData) => {
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      toast.error("All fields are required");
      set({ error: "All fields are required" });
      return false;
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/;
    if (!strongPassword.test(password)) {
      toast.error(
        "Weak password: must include 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 chars"
      );
      set({ error: "Weak password" });
      return false;
    }

    try {
      set({ loading: true, error: null, message: null });
      const response = await api.post("/api/auth/register", userData);
      set({ message: response.data.message });
      toast.success(response.data.message || "Registration successful!");
      return true;
    } catch (error) {
      const msg = error?.response?.data?.message || "Registration failed";
      set({ error: msg });
      toast.error(msg);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // --- LOGOUT ---
  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      organization: null,
      token: null,
      isAuthenticated: false,
      error: null,
      message: null,
    });
    toast.success("Logout successful!");
    return true;
  },

  // --- FETCH USER ---
  fetchUser: async () => {
    try {
      set({ loading: true, error: null });
      console.log("API CALL");

      const token = localStorage.getItem("token");
      if (!token) {
        set({ user: null, isAuthenticated: false });
        return false;
      }

      const response = await api.get("/user/me");

      const { user, organization } = response.data.data;
      set({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isVerified: user.isVerified,
          phone: user.phone_number,
          gender: user.gender,
          address: user.address,
        },
        organization,
        isAuthenticated: true,
        token,
      });
      return true;
    } catch (error) {
      console.error("Fetch user failed:", error);
      localStorage.removeItem("token");
      set({ user: null, organization: null, token: null, isAuthenticated: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // --- UPDATE USER ---
  updateUser: async (updatedData) => {
    try {
      set({ loading: true, error: null, message: null });

      const token = get().token;
      if (!token) throw new Error("Unauthorized: No token found");

      const response = await api.patch("/user/me", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = response.data.data;
      set((state) => ({
        user: { ...state.user, ...updatedUser },
        message: "Profile updated successfully",
      }));
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to update profile";
      set({ error: msg });
      toast.error(msg);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
      }
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // --- RESEND VERIFICATION EMAIL ---
  resendVerificationEmail: async (email) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/api/auth/resend-verification", { email });
      toast.success(response.data.message || "Verification email sent!");
      set({ message: response.data.message });
      return true;
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to resend verification email.";
      set({ error: msg });
      toast.error(msg);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
