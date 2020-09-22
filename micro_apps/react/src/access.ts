// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canAddUser: canAccess(currentUser, 'btn:user:add'),
    canEditUser: canAccess(currentUser, 'btn:user:edit'),
    canDeleteUser: canAccess(currentUser, 'btn:user:delete'),
    canAddRole: canAccess(currentUser, 'btn:role:add'),
    canEditRole: canAccess(currentUser, 'btn:role:edit'),
    canDeleteRole: canAccess(currentUser, 'btn:role:delete'),
    canAddDep: canAccess(currentUser, 'btn:department:add'),
    canEditDep: canAccess(currentUser, 'btn:department:edit'),
    canDeleteDep: canAccess(currentUser, 'btn:department:delete'),
    canAddMenu: canAccess(currentUser, 'btn:menu:add'),
    canEditMenu: canAccess(currentUser, 'btn:menu:edit'),
    canDeleteMenu: canAccess(currentUser, 'btn:menu:delete'),
  };
}

function canAccess(currentUser: API.CurrentUser | undefined, permission: string): boolean {
  return (currentUser !== undefined && currentUser.permissions.indexOf(permission) !== -1);
}
