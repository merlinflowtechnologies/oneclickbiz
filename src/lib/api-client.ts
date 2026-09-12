/**
 * OneClickBiz Unified API Client
 * Provides typed methods to interact with backend REST endpoints
 */

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  user?: any;
  lead?: any;
  leads?: any[];
  booking?: any;
  bookings?: any[];
  product?: any;
  products?: any[];
  post?: any;
  posts?: any[];
  profile?: any;
  users?: any[];
  telemetry?: any;
  settings?: any[];
}

async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || `HTTP error ${res.status}` };
    }
    return data;
  } catch (err: any) {
    return { error: err.message || 'Network request failed' };
  }
}

export const api = {
  // Auth API
  auth: {
    me: () => request('/api/auth/me'),
    login: (credentials: { email: string; password: string }) =>
      request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    register: (userData: { email: string; password: string; name?: string; phone?: string }) =>
      request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    logout: () =>
      request('/api/auth/logout', {
        method: 'POST',
      }),
  },

  // Profiles & Smart Cards API
  profiles: {
    getAll: () => request('/api/profiles'),
    getBySlug: (slug: string) => request(`/api/profiles/${slug}`),
    save: (profileData: any) =>
      request('/api/profiles', {
        method: 'POST',
        body: JSON.stringify(profileData),
      }),
  },

  // Leads CRM API
  leads: {
    getAll: () => request('/api/leads'),
    createPublic: (leadData: { profileId: string; name: string; phone: string; email?: string; notes?: string }) =>
      request('/api/leads', {
        method: 'POST',
        body: JSON.stringify(leadData),
      }),
    updateStatus: (leadId: string, status: string) =>
      request('/api/leads', {
        method: 'PATCH',
        body: JSON.stringify({ leadId, status }),
      }),
  },

  // Bookings API
  bookings: {
    getAll: () => request('/api/bookings'),
    createPublic: (bookingData: {
      profileId: string;
      customerName: string;
      customerPhone: string;
      customerEmail?: string;
      serviceTitle: string;
      bookingDate: string;
      bookingTime: string;
      notes?: string;
    }) =>
      request('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      }),
    updateStatus: (bookingId: string, status: string) =>
      request('/api/bookings', {
        method: 'PATCH',
        body: JSON.stringify({ bookingId, status }),
      }),
  },

  // WhatsApp Store API
  store: {
    getProducts: (userId?: string) =>
      request(`/api/store/products${userId ? `?userId=${userId}` : ''}`),
    createProduct: (productData: any) =>
      request('/api/store/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      }),
    deleteProduct: (productId: string) =>
      request(`/api/store/products?id=${productId}`, {
        method: 'DELETE',
      }),
  },

  // Blogs API
  blogs: {
    getAll: (authorId?: string) =>
      request(`/api/blogs${authorId ? `?authorId=${authorId}` : ''}`),
    getBySlug: (slug: string) => request(`/api/blogs?slug=${slug}`),
    create: (blogData: any) =>
      request('/api/blogs', {
        method: 'POST',
        body: JSON.stringify(blogData),
      }),
  },

  // Super Admin API
  admin: {
    getTelemetry: () => request('/api/admin/telemetry'),
    getUsers: (role?: string) =>
      request(`/api/admin/users${role ? `?role=${role}` : ''}`),
    updateUser: (userId: string, data: { plan?: string; role?: string; isBanned?: boolean }) =>
      request('/api/admin/users', {
        method: 'PATCH',
        body: JSON.stringify({ userId, ...data }),
      }),
    getSettings: () => request('/api/admin/settings'),
    updateSettings: (settings: { key: string; value: string }[]) =>
      request('/api/admin/settings', {
        method: 'POST',
        body: JSON.stringify({ settings }),
      }),
  },
};
