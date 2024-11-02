import * as React from 'react';

interface AdminContextValue {
  /**
   * TODO: this should come from `StrapiApp['getAdminInjectedComponents']`
   */
  getAdminInjectedComponents: () => unknown;
}

const AdminContext = React.createContext<AdminContextValue>({
  getAdminInjectedComponents() {
    console.warn('AdminContext: getAdminInjectedComponents() not implemented');
  },
});
type AdminContextProviderProps = AdminContextValue & ComponentBaseProps;

const AdminContextProvider = ({
  getAdminInjectedComponents,
  // Base props
  children,
}: AdminContextProviderProps) => {
  console.debug({ getAdminInjectedComponents });
  return (
    <AdminContext.Provider value={{ getAdminInjectedComponents }}>{children}</AdminContext.Provider>
  );
};

const useAdmin = () => React.useContext(AdminContext);

export { AdminContext, AdminContextProvider, useAdmin };
