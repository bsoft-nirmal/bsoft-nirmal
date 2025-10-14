import type { Role, Tier } from '../auth/AuthContext';

// Central RBAC policy: changeable, addable, dynamic
export type Permission =
  | 'view.home'
  | 'view.browse'
  | 'view.membership'
  | 'view.dashboard.contractor'
  | 'view.dashboard.company'
  | 'view.dashboard.admin'
  | 'bid.apply'
  | 'bid.save'
  | 'filters.advanced'
  | 'admin.manage.users';

export type RolePolicy = {
  inherits?: Role[];
  permissions: Permission[];
  tierGrants?: Partial<Record<Tier, Permission[]>>;
};

// Editable map of policies
export const ROLE_POLICIES: Record<Role, RolePolicy> = {
  GUEST: {
    permissions: ['view.home', 'view.browse', 'view.membership'],
  },
  CONTRACTOR: {
    inherits: ['GUEST'],
    permissions: ['view.dashboard.contractor', 'bid.apply', 'bid.save'],
    tierGrants: {
      BRONZE: [],
      SILVER: ['filters.advanced'],
      GOLD: ['filters.advanced'],
    },
  },
  COMPANY: {
    inherits: ['GUEST'],
    permissions: ['view.dashboard.company', 'bid.save'],
    tierGrants: { BRONZE: [], SILVER: ['filters.advanced'], GOLD: ['filters.advanced'] },
  },
  ADMIN: {
    inherits: ['COMPANY'],
    permissions: ['view.dashboard.admin', 'admin.manage.users'],
  },
};

function collectPermissions(role: Role, tier: Tier): Set<Permission> {
  const visited = new Set<Role>();
  const perms = new Set<Permission>();

  const dfs = (r: Role) => {
    if (visited.has(r)) return;
    visited.add(r);
    const policy = ROLE_POLICIES[r];
    if (!policy) return;
    policy.permissions.forEach((p) => perms.add(p));
    if (policy.tierGrants && policy.tierGrants[tier]) {
      policy.tierGrants[tier]!.forEach((p) => perms.add(p));
    }
    policy.inherits?.forEach(dfs);
  };

  dfs(role);
  return perms;
}

export function can(role: Role, tier: Tier, permission: Permission) {
  return collectPermissions(role, tier).has(permission);
}

export function expandAll(role: Role, tier: Tier) {
  return Array.from(collectPermissions(role, tier)).sort();
}
