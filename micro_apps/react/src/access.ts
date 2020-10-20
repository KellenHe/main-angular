// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAddUser: canAccess(currentUser, 'btn:user:add'),
    canEditUser: canAccess(currentUser, 'btn:user:edit'),
    canDeleteUser: canAccess(currentUser, 'btn:user:delete'),
    canAddRole: canAccess(currentUser, 'btn:role:add'),
    canEditRole: canAccess(currentUser, 'btn:role:edit'),
    canDeleteRole: canAccess(currentUser, 'btn:role:delete'),
    canViewDep: canAccess(currentUser, 'btn:department:view'),
    canAddDep: canAccess(currentUser, 'btn:department:add'),
    canEditDep: canAccess(currentUser, 'btn:department:edit'),
    canDeleteDep: canAccess(currentUser, 'btn:department:delete'),
    canAddMenu: canAccess(currentUser, 'btn:menu:add'),
    canEditMenu: canAccess(currentUser, 'btn:menu:edit'),
    canDeleteMenu: canAccess(currentUser, 'btn:menu:delete'),
    canViewTask: canAccess(currentUser, 'btn:task:view'),
    canAddTask: canAccess(currentUser, 'btn:task:add'),
    canEditTask: canAccess(currentUser, 'btn:task:edit'),
    canDeleteTask: canAccess(currentUser, 'btn:task:delete'),
  };
}

function canAccess(currentUser: API.CurrentUser | undefined, permission: string): boolean {
  return (currentUser !== undefined && currentUser.permissions.indexOf(permission) !== -1);
}
