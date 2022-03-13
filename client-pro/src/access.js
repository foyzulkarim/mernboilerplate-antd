/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser, permissions } = initialState || {};
  // console.log('access.initialState', initialState);
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canReadPageA: currentUser && currentUser.access === 'pageA',
    canAccess: (route) => {
      // console.log('access.route', route.path, permissions);
      const isAllowed = permissions && Array.isArray(permissions)
        && permissions.some((permission) => permission.resourceName === route.path);
      // console.log('access.isAllowed', isAllowed);
      return isAllowed;
    },
    canShow: (element) => {
      console.log('access.element', element);
      const isAllowed = permissions && Array.isArray(permissions)
        && permissions.some((permission) => permission.resourceName === element);
      console.log('access.isAllowed', isAllowed);
      return isAllowed;
    },
    isDisabled: (element) => {
      console.log('access.element', element);
      const isDisabled = permissions && Array.isArray(permissions)
        && permissions.some((permission) => permission.resourceName === element && permission.isDisabled);
      console.log('access.isDisabled', isDisabled);
      return isDisabled;
    }
  };
}
