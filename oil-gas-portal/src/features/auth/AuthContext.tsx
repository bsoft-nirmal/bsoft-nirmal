import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export type Role = 'GUEST' | 'CONTRACTOR' | 'COMPANY' | 'ADMIN';
export type Tier = 'BRONZE' | 'SILVER' | 'GOLD';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  membershipTier: Tier;
  companyName?: string;
  isVerified?: boolean;
};

export type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (payload: Partial<User> & { password: string }) => Promise<void>;
  demoSignIn: (kind: 'contractor' | 'company' | 'admin') => void;
  upgradeMembership: (tier: Tier) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mockUsers: Record<string, User & { password: string }> = {
  'contractor@demo.com': {
    id: 'user-1', email: 'contractor@demo.com', password: 'Demo123!', firstName: 'John', lastName: 'Smith', role: 'CONTRACTOR', membershipTier: 'BRONZE', isVerified: true,
  },
  'company@demo.com': {
    id: 'user-2', email: 'company@demo.com', password: 'Demo123!', firstName: 'Sarah', lastName: 'Johnson', role: 'COMPANY', membershipTier: 'GOLD', companyName: 'Shell International', isVerified: true,
  },
  'admin@demo.com': {
    id: 'user-3', email: 'admin@demo.com', password: 'Demo123!', firstName: 'Admin', lastName: 'User', role: 'ADMIN', membershipTier: 'GOLD', isVerified: true,
  },
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    const u = mockUsers[email];
    if (!u || u.password !== password) throw new Error('Invalid credentials');
    setUser(u);
  }

  function demoSignIn(kind: 'contractor' | 'company' | 'admin') {
    const selected = kind === 'contractor' ? mockUsers['contractor@demo.com'] : kind === 'company' ? mockUsers['company@demo.com'] : mockUsers['admin@demo.com'];
    setUser(selected);
  }

  async function signUp(payload: Partial<User> & { password: string }) {
    const id = 'user-' + Date.now();
    const newUser: User = {
      id,
      email: payload.email || '',
      firstName: payload.firstName || '',
      lastName: payload.lastName || '',
      role: (payload.role as Role) || 'CONTRACTOR',
      membershipTier: 'BRONZE',
      companyName: payload.companyName,
      isVerified: true,
    };
    setUser(newUser);
  }

  function signOut() { setUser(null); }

  function upgradeMembership(tier: Tier) { if (user) setUser({ ...user, membershipTier: tier }); }

  const value = useMemo<AuthContextValue>(() => ({ user, signIn, signOut, signUp, demoSignIn, upgradeMembership }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
