import React from "react";

// TODO: does the dependency graph should look like that?
import { title as myFlowTitle } from "../authenticated-app/pages/my-flow";

export { NavigationProvider, useNavigation };

const defaultPage = myFlowTitle;
const NavigationContext = React.createContext();
NavigationContext.displayName = "NavigationContext";

function NavigationProvider(props) {
  const [
    { currentPage, isMobileNavOpen, isProfileDropdownOpen },
    setNavigationState,
  ] = React.useState({
    currentPage: defaultPage,
    isMobileNavOpen: false,
    isProfileDropdownOpen: false,
  });
  const gotoPage = (pageTitle) => {
    setNavigationState({
      currentPage: pageTitle,
      isMobileNavOpen: false,
      isProfileDropdownOpen: false,
    });
  };

  const openMobileNav = () => {
    setNavigationState((navState) => {
      return { ...navState, isMobileNavOpen: true };
    });
  };
  const closeMobileNav = () => {
    setNavigationState((navState) => {
      return { ...navState, isMobileNavOpen: false };
    });
  };
  const openProfileDropdown = () => {
    setNavigationState((navState) => {
      return { ...navState, isProfileDropdownOpen: true };
    });
  };
  const closeProfileDropdown = () => {
    setNavigationState((navState) => {
      return { ...navState, isProfileDropdownOpen: false };
    });
  };
  const toggleProfileDropdown = () => {
    setNavigationState((navState) => {
      return {
        ...navState,
        isProfileDropdownOpen: !navState.isProfileDropdownOpen,
      };
    });
  };

  // TODO: perf validate-optimization?
  const value = React.useMemo(() => {
    return {
      currentPage,
      isMobileNavOpen,
      isProfileDropdownOpen,
      gotoPage,
      goToDefault: () => gotoPage(defaultPage),
      openMobileNav,
      closeMobileNav,
      openProfileDropdown,
      closeProfileDropdown,
      toggleProfileDropdown,
    };
  }, [currentPage, isMobileNavOpen, isProfileDropdownOpen]);

  return <NavigationContext.Provider value={value} {...props} />;
}

function useNavigation() {
  const context = React.useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(`useNavigation must be used within a NavigationProvider`);
  }
  return context;
}
