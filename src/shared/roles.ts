export const Roles = {
  Attendee: 0,
  Admin: 1,
  Staff: 2,
  SubTenant: 3,
  Developer: 99,
} as const;

export type RoleValue = (typeof Roles)[keyof typeof Roles];

export type Portal = 'public' | 'admin' | 'staff' | 'developer';

export function isDeveloper(role: number): boolean {
  return role === Roles.Developer;
}

export function isStaff(role: number): boolean {
  return role === Roles.Staff;
}

export function canAccessAdmin(role: number): boolean {
  return role === Roles.Admin || role === Roles.SubTenant;
}

export function isSubTenant(role: number): boolean {
  return role === Roles.SubTenant;
}

export function canManageTenantSettings(role: number): boolean {
  return role === Roles.Admin;
}

export function homePathForRole(role: number): string {
  if (isDeveloper(role)) {
    return '/developer';
  }
  if (canAccessAdmin(role)) {
    return '/admin';
  }
  if (isStaff(role)) {
    return '/staff';
  }
  return '/';
}

export function roleLabel(role: number): string {
  switch (role) {
    case Roles.Attendee:
      return 'Attendee';
    case Roles.Admin:
      return 'Admin';
    case Roles.Staff:
      return 'Staff';
    case Roles.SubTenant:
      return 'Sub-Tenant';
    case Roles.Developer:
      return 'Developer';
    default:
      return 'Unknown';
  }
}
