import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@models/user.types';
import { UserRole, MembershipTier } from '@models/user.types';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: Partial<User> & { password: string }) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  checkPermission: (permission: string) => boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'ogp_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!user;

  const signIn = useCallback(async (email: string, _password: string) => {
    // Mock sign-in: accept demo accounts
    const demoUsers: Record<string, User> = {
      'contractor@example.com': {
        id: 'contractor-1',
        email: 'contractor@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+123456789',
        role: UserRole.CONTRACTOR,
        membershipTier: MembershipTier.BRONZE,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        certifications: ['ISO 9001'],
      },
      'company@example.com': {
        id: 'company-1',
        email: 'company@example.com',
        firstName: 'Shell',
        lastName: 'International',
        phoneNumber: '+123456789',
        role: UserRole.COMPANY,
        membershipTier: MembershipTier.GOLD,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        companyName: 'Shell International',
        companyVerified: true,
      },
      'admin@example.com': {
        id: 'admin-1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        phoneNumber: '+123456789',
        role: UserRole.ADMIN,
        membershipTier: MembershipTier.GOLD,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    const found = demoUsers[email.toLowerCase()];
    if (!found) throw new Error('Invalid credentials');

    setUser(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }, []);

  const signUp = useCallback(async (data: Partial<User> & { password: string }) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email || 'user@example.com',
      firstName: data.firstName || 'New',
      lastName: data.lastName || 'User',
      phoneNumber: data.phoneNumber || '',
      role: (data.role as UserRole) || UserRole.CONTRACTOR,
      membershipTier: MembershipTier.BRONZE,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    setUser((prev: User | null) => {
      const updated = prev ? { ...prev, ...data, updatedAt: new Date().toISOString() } : prev;
      if (updated) localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const checkPermission = useCallback(
    (_permission: string) => {
      // Placeholder for future role/permission mapping
      return isAuthenticated;
    },
    [isAuthenticated],
  );

  const value = useMemo(
    () => ({ user, loading, isAuthenticated, signIn, signUp, signOut, updateProfile, checkPermission }),
    [user, loading, isAuthenticated, signIn, signUp, signOut, updateProfile, checkPermission],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
