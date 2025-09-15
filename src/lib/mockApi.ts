// Simple mock API layer simulating network latency

export type Provider = {
  id: string;
  type: "hotel" | "restaurant" | "guide" | "cab";
  title: string;
  rating: number;
  pricePerUnit: number;
  lat?: number;
  lng?: number;
  district?: string;
  zone?: string;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchTrendingAttractions() {
  await delay(400);
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `trend-${i}`,
    title: `Trending Place ${i + 1}`,
    likes: Math.floor(Math.random() * 900) + 100,
    image: "/attractions/image" + (((i % 7) + 1)) + ".jpeg",
  }));
}

export async function fetchProvidersNearby(
  type: Provider["type"],
  lat: number,
  lng: number
): Promise<Provider[]> {
  await delay(350);
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `${type}-${i}`,
    type,
    title: `${type.toUpperCase()} ${i + 1}`,
    rating: 3.8 + Math.random() * 1.2,
    pricePerUnit: 200 + Math.floor(Math.random() * 800),
    lat: lat + (Math.random() - 0.5) * 0.08,
    lng: lng + (Math.random() - 0.5) * 0.08,
  }));
}

export async function mockConnectWallet() {
  await delay(300);
  return { address: `0x${Math.random().toString(16).slice(2, 10)}` };
}

export async function mockDeposit(amount: number) {
  await delay(500);
  return { success: true, amount } as const;
}

export async function mockPay(amount: number, to: string) {
  await delay(500);
  console.log(amount);
  console.log(to);
  return { success: true, txId: `tx_${Math.random().toString(36).slice(2, 9)}` } as const;
}

// ===== Admin/Providers/Users - LocalStorage backed mocks =====

type AdminRole = 'admin_state' | 'admin_district' | 'admin_zonal';

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  region?: string;
  district?: string;
  zone?: string;
  isActive: boolean;
  createdAtISO: string;
};

export type Complaint = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAtISO: string;
  raisedByEmail: string;
  district?: string;
  zone?: string;
};

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Registered users for the login portal
type RegisteredUser = { email: string; password: string; name: string; phone?: string; role: string };

function upsertRegisteredUser(u: RegisteredUser) {
  const users = readLS<RegisteredUser[]>('registeredUsers', []);
  const idx = users.findIndex((x) => x.email === u.email && x.role === u.role);
  if (idx >= 0) users[idx] = u; else users.push(u);
  writeLS('registeredUsers', users);
}

// Admins CRUD
export async function admins_list(): Promise<AdminAccount[]> {
  await delay(200);
  return readLS<AdminAccount[]>('admins', []);
}

export async function admins_create(input: Omit<AdminAccount, 'id' | 'createdAtISO' | 'isActive'> & { password: string }): Promise<AdminAccount> {
  await delay(300);
  const admins = readLS<AdminAccount[]>('admins', []);
  const admin: AdminAccount = { id: crypto.randomUUID(), isActive: true, createdAtISO: new Date().toISOString(), ...input };
  admins.push(admin);
  writeLS('admins', admins);
  // create login credential
  upsertRegisteredUser({ email: admin.email, password: input.password, name: admin.name, role: admin.role });
  return admin;
}

export async function admins_update(id: string, patch: Partial<Omit<AdminAccount, 'id' | 'createdAtISO'>>): Promise<AdminAccount | null> {
  await delay(250);
  const admins = readLS<AdminAccount[]>('admins', []);
  const idx = admins.findIndex((a) => a.id === id);
  if (idx < 0) return null;
  admins[idx] = { ...admins[idx], ...patch };
  writeLS('admins', admins);
  return admins[idx];
}

export async function admins_delete(id: string): Promise<boolean> {
  await delay(200);
  const admins = readLS<AdminAccount[]>('admins', []);
  const admin = admins.find((a) => a.id === id);
  const next = admins.filter((a) => a.id !== id);
  writeLS('admins', next);
  if (admin) {
    // remove from registered users as well
    const users = readLS<RegisteredUser[]>('registeredUsers', []);
    writeLS('registeredUsers', users.filter((u) => !(u.email === admin.email && u.role === admin.role)));
  }
  return true;
}

// Providers CRUD
export async function providers_list(scope?: { district?: string; zone?: string }): Promise<Provider[]> {
  await delay(200);
  let items = readLS<Provider[]>('providers', []);
  if (scope?.district) items = items.filter((p) => p.district === scope.district);
  if (scope?.zone) items = items.filter((p) => p.zone === scope.zone);
  return items;
}

export async function providers_create(input: Omit<Provider, 'id' | 'rating'> & { password?: string; contactName?: string }): Promise<Provider> {
  await delay(300);
  const items = readLS<Provider[]>('providers', []);
  const provider: Provider = { id: crypto.randomUUID(), rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10, ...input };
  items.push(provider);
  writeLS('providers', items);
  // Optionally create login (provider dashboard access)
  if (input.password) {
    upsertRegisteredUser({ email: `${provider.id}@provider.jhar`, password: input.password, name: input.contactName || provider.title, role: 'provider' });
  }
  return provider;
}

export async function providers_update(id: string, patch: Partial<Omit<Provider, 'id'>>): Promise<Provider | null> {
  await delay(250);
  const items = readLS<Provider[]>('providers', []);
  const idx = items.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  items[idx] = { ...items[idx], ...patch };
  writeLS('providers', items);
  return items[idx];
}

export async function providers_delete(id: string): Promise<boolean> {
  await delay(200);
  const items = readLS<Provider[]>('providers', []);
  writeLS('providers', items.filter((p) => p.id !== id));
  return true;
}

// Complaints fetch (simple; creation handled elsewhere in app store)
export async function complaints_list(scope?: { district?: string; zone?: string }): Promise<Complaint[]> {
  await delay(200);
  let items = readLS<Complaint[]>('complaints', []);
  if (scope?.district) items = items.filter((c) => c.district === scope.district);
  if (scope?.zone) items = items.filter((c) => c.zone === scope.zone);
  return items;
}

// Analytics fetch
export type AnalyticsRow = {
  id: string;
  scope: 'state' | 'district' | 'zone';
  scopeName: string;
  period: string;
  revenue: number;
  bookingsCount: number;
  visitorsCount: number;
  growthPercent: number;
};

export async function analytics_list(scope: 'state' | 'district' | 'zone', name: string): Promise<AnalyticsRow[]> {
  await delay(250);
  // synthesize some rows
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `an-${scope}-${i}`,
    scope,
    scopeName: name,
    period: `2025-${String(i + 1).padStart(2, '0')}`,
    revenue: Math.floor(200000 + Math.random() * 500000),
    bookingsCount: Math.floor(300 + Math.random() * 1000),
    visitorsCount: Math.floor(1000 + Math.random() * 4000),
    growthPercent: Math.round((-5 + Math.random() * 15) * 10) / 10,
  }));
}


