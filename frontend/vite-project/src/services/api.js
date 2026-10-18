const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('alumniconnect_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || `Request failed with status ${res.status}`);
      error.status = res.status;
      error.errors = data.errors || null;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`[API ERROR] ${options.method || 'GET'} ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth
  auth: {
    login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
    register: (userData) => request('/auth/register', { method: 'POST', body: userData }),
    getMe: () => request('/auth/me')
  },

  // Alumni Directory
  alumni: {
    getDirectory: (params = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.append(key, val);
        }
      });
      const qs = searchParams.toString();
      return request(`/alumni${qs ? `?${qs}` : ''}`);
    },
    getById: (id) => request(`/alumni/${id}`),
    updateMe: (data) => request('/alumni/me', { method: 'PATCH', body: data })
  },

  // Verification
  verification: {
    submit: (data) => request('/alumni/verification', { method: 'POST', body: data }),
    getMyHistory: () => request('/alumni/me/verification'),
    getAdminQueue: (params = {}) => {
      const searchParams = new URLSearchParams();
      if (params.status) searchParams.append('status', params.status);
      if (params.page) searchParams.append('page', params.page);
      if (params.limit) searchParams.append('limit', params.limit);
      const qs = searchParams.toString();
      return request(`/admin/verifications${qs ? `?${qs}` : ''}`);
    },
    getAdminById: (id) => request(`/admin/verifications/${id}`),
    reviewDecision: (id, data) => request(`/admin/verifications/${id}`, { method: 'PATCH', body: data })
  },

  // Mentorship
  mentorship: {
    create: (data) => request('/mentorship-requests', { method: 'POST', body: data }),
    getMyRequests: (params = {}) => {
      const qs = params.status ? `?status=${params.status}` : '';
      return request(`/mentorship-requests/me${qs}`);
    },
    getById: (id) => request(`/mentorship-requests/${id}`),
    updateStatus: (id, data) => request(`/mentorship-requests/${id}`, { method: 'PATCH', body: data })
  },

  // Recommendations
  recommendations: {
    getMentors: (params = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v) searchParams.append(k, v);
      });
      const qs = searchParams.toString();
      return request(`/recommendations/mentors${qs ? `?${qs}` : ''}`);
    }
  }
};
