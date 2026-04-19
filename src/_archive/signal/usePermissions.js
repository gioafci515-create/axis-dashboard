import { useSelector } from "react-redux";
import { PERMISSIONS, USER_ROLES } from "../utils/constants";

export const usePermissions = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || USER_ROLES.STAFF;
  const perms = PERMISSIONS[role] || PERMISSIONS[USER_ROLES.STAFF];

  return {
    role,
    isAdmin: role === USER_ROLES.ADMIN,
    isStaff: role === USER_ROLES.STAFF,
    canCreate: perms.canCreate,
    canEdit: perms.canEdit,
    canDelete: perms.canDelete,
    canAccessSettings: perms.canAccessSettings,
    canManageUsers: perms.canManageUsers,
  };
};

export default usePermissions;
