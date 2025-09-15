import { create } from "zustand";

export type User = { id: string; name: string; email?: string; phone?: string } | null;
export type WishlistKind = "attraction" | "hotel" | "restaurant" | "guide" | "cab";

export type WishlistItem = {
  id: string;
  kind: WishlistKind;
  title: string;
  image?: string;
  meta?: Record<string, unknown>;
};

export type Booking = {
  id: string;
  type: "hotel" | "restaurant" | "guide" | "cab";
  itemId: string;
  title: string;
  dateTimeISO: string;
  location?: { lat: number; lng: number };
  amount: number;
  status: "pending" | "confirmed" | "cancelled" | "rejected" | "completed";
};

export type Transaction = {
  id: string;
  amount: number;
  type: "deposit" | "payment";
  to?: string;
  from?: string;
  createdAtISO: string;
  note?: string;
};

export type Complaint = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAtISO: string;
  destination?: string;
  provider?: string;
};

type AppState = {
  user: User;
  role: "user" | "provider" | "admin" | "admin_state" | "admin_district" | "admin_zonal" | null;
  login: (name: string) => void;
  logout: () => void;
  setRole: (role: "user" | "provider" | "admin" | "admin_state" | "admin_district" | "admin_zonal" | null) => void;
  setUser: (partial: Partial<NonNullable<User>>) => void;

  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;

  walletConnected: boolean;
  walletAddress?: string;
  balance: number;
  connectWallet: () => void;
  mockDeposit: (amount: number) => void;
  pay: (amount: number, to: string, note?: string) => boolean;

  bookings: Booking[];
  createBooking: (booking: Omit<Booking, "id" | "status">) => Booking;
  cancelBooking: (id: string) => void;
  rejectBooking: (id: string) => void;
  completeBooking: (id: string) => void;
  deleteBooking: (id: string) => void;

  transactions: Transaction[];

  // likes
  liked: WishlistItem[];
  toggleLike: (item: WishlistItem) => void;

  // complaints
  complaints: Complaint[];
  addComplaint: (c: Omit<Complaint, "id" | "status" | "createdAtISO">) => Complaint;
  updateComplaintStatus: (id: string, status: Complaint["status"]) => void;

  // visited
  visited: WishlistItem[];
  addVisited: (item: WishlistItem) => void;
  removeVisited: (id: string) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  role: null,
  login: (name) => set({ user: { id: crypto.randomUUID(), name }, role: "user" }),
  logout: () => set({ user: null, role: null }),
  setRole: (role) => set({ role }),
  setUser: (partial) =>
    set((state) => ({ user: state.user ? { ...state.user, ...partial } : { id: crypto.randomUUID(), name: partial.name || "User", email: partial.email, phone: partial.phone } })),

  wishlist: [],
  toggleWishlist: (item) =>
    set((state) => {
      const exists = state.wishlist.some((w) => w.id === item.id);
      return {
        wishlist: exists
          ? state.wishlist.filter((w) => w.id !== item.id)
          : [...state.wishlist, item],
      };
    }),
  removeFromWishlist: (id) =>
    set((state) => ({ wishlist: state.wishlist.filter((w) => w.id !== id) })),

  walletConnected: false,
  walletAddress: undefined,
  balance: 0,
  connectWallet: () =>
    set({ walletConnected: true, walletAddress: `0x${Math.random().toString(16).slice(2, 10)}` }),
  mockDeposit: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
      transactions: [
        ...state.transactions,
        {
          id: crypto.randomUUID(),
          amount,
          type: "deposit",
          from: state.walletAddress,
          createdAtISO: new Date().toISOString(),
          note: "Mock deposit",
        },
      ],
    })),
  pay: (amount, to, note) => {
    const { balance } = get();
    if (amount <= 0 || amount > balance) return false;
    set((state) => ({
      balance: state.balance - amount,
      transactions: [
        ...state.transactions,
        {
          id: crypto.randomUUID(),
          amount,
          type: "payment",
          to,
          createdAtISO: new Date().toISOString(),
          note,
        },
      ],
    }));
    return true;
  },

  bookings: [],
  createBooking: (booking) => {
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      status: "pending",
      ...booking,
    };
    set((state) => ({ bookings: [newBooking, ...state.bookings] }));
    return newBooking;
  },
  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
    })),
  rejectBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: "rejected" } : b)),
    })),
  completeBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: "completed" } : b)),
    })),
  deleteBooking: (id) => set((state) => ({ bookings: state.bookings.filter((b) => b.id !== id) })),

  transactions: [],

  // likes
  liked: [],
  toggleLike: (item) =>
    set((state) => {
      const exists = state.liked.some((w) => w.id === item.id);
      return {
        liked: exists
          ? state.liked.filter((w) => w.id !== item.id)
          : [...state.liked, item],
      };
    }),

  // complaints
  complaints: [],
  addComplaint: (c) => {
    const newComplaint: Complaint = {
      id: crypto.randomUUID(),
      status: "pending",
      createdAtISO: new Date().toISOString(),
      ...c,
    };
    set((state) => ({ complaints: [newComplaint, ...state.complaints] }));
    return newComplaint;
  },
  updateComplaintStatus: (id, status) =>
    set((state) => ({
      complaints: state.complaints.map((comp) => (comp.id === id ? { ...comp, status } : comp)),
    })),

  // visited
  visited: [],
  addVisited: (item) =>
    set((state) => ({
      visited: state.visited.some((v) => v.id === item.id) ? state.visited : [item, ...state.visited],
    })),
  removeVisited: (id) => set((state) => ({ visited: state.visited.filter((v) => v.id !== id) })),
}));


