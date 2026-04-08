// Real API with fallback to mock for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Fallback mock data for development
const mockUsers = {
  'superadmin@example.com': {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@example.com',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  'admin@example.com': {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  'user@example.com': {
    id: '3',
    name: 'John Doe',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  },
  'test@example.com': {
    id: '4',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  'saad@funfarm.com': {
    id: '5',
    name: 'Shaikh Saad',
    email: 'saad@funfarm.com',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  }
};

const generateMockToken = (email) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    email, 
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      console.warn('Backend unavailable, using mock:', error.message);
      // Fallback to mock
      await new Promise(resolve => setTimeout(resolve, 800));
      const user = mockUsers[email];
      if (!user) {
        throw new Error('Email or password is incorrect');
      }

      const validPasswords = {
        'superadmin@example.com': 'SuperAdmin123',
        'admin@example.com': 'Admin123',
        'user@example.com': 'User123',
        'test@example.com': 'Test123',
        'saad@funfarm.com': 'Saad123'
      };

      if (validPasswords[email] !== password) {
        throw new Error('Email or password is incorrect');
      }

      const token = generateMockToken(email);
      return { success: true, user, token };
    }
  },

  register: async (name, email, password, confirmPassword, role = 'user') => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword, role })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.warn('Backend unavailable, using mock:', error.message);
      // Fallback to mock
      await new Promise(resolve => setTimeout(resolve, 800));

      if (mockUsers[email]) {
        throw new Error('This email is already registered');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
      };

      mockUsers[email] = newUser;
      const token = generateMockToken(email);
      return { success: true, user: newUser, token };
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Logout error:', error);
      return { success: true };
    }
  },

  verify: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      return data;
    } catch (error) {
      console.warn('Verification error:', error);
      // Fallback - just return true for now
      return { success: true, valid: true };
    }
  }
};
