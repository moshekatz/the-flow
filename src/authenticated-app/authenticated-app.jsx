import React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { TransactionSlideOver } from "./transaction-slide-over";
import { MyFlow, title as myFlowTitle } from "./pages/my-flow";
import {
  Subscriptions,
  title as subscriptionsTitle,
} from "./pages/subscriptions";
import { Dashboard, title as dashboardTitle } from "./pages/dashboard";
import { Settings, title as settingsTitle } from "./pages/settings";

import { useNavigation } from "../context/navigation-context";
import { TransactionsProvider } from "../api/transactions/transactions-api-hooks";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./shared/components";
import { logReactErrorBoundaryToAnalyticsService } from "../analytics";

export default AuthenticatedApp;

function AuthenticatedApp() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isMobileNavOpen, currentPage } = useNavigation();

  const {
    showTransactionSlideOver,
    editableTransactionId,
    openTransactionSlideOver,
    openTransactionSlideOverForId,
    closeTransactionSlideOver,
  } = useTransactionSlideOver();

  const shouldHideScrollbar = showTransactionSlideOver || isMobileNavOpen;

  let page;
  switch (currentPage) {
    case myFlowTitle: {
      page = (
        <MyFlow
          onSelectTransaction={openTransactionSlideOverForId}
          searchQuery={searchQuery}
        />
      );
      break;
    }
    case subscriptionsTitle: {
      page = (
        <Subscriptions
          onSelectSubscription={openTransactionSlideOverForId}
          searchQuery={searchQuery}
        />
      );
      break;
    }
    case dashboardTitle: {
      page = <Dashboard searchQuery={searchQuery} />;
      break;
    }
    case settingsTitle: {
      page = <Settings />;
      break;
    }
    default: {
      throw new Error(
        `Unsupported page ${currentPage} on <AuthenticatedApp/>.`
      );
    }
  }

  return (
    <div
      className={`min-h-screen bg-white flex ${
        shouldHideScrollbar ? "overflow-y-hidden" : ""
      }`}
    >
      <Sidebar />
      <div className="ml-0 lg:ml-64 min-h-screen w-full">
        <div className="mb-3 flex-1 lg:max-w-4xl mx-auto flex flex-col lg:px-8 xl:px-0">
          <Header
            searchQuery={searchQuery}
            onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
            onCreateTransaction={openTransactionSlideOver}
          />
          <ErrorBoundary
            FallbackComponent={ErrorFallback(
              "There was an error while loading your transactions:"
            )}
            onError={logReactErrorBoundaryToAnalyticsService}
          >
            <TransactionsProvider>
              <div className="flex ">
                <main
                  className="flex-1 relative focus:outline-none"
                  tabIndex={0}
                >
                  {page}
                </main>
                <TransactionSlideOver
                  handleClose={closeTransactionSlideOver}
                  transactionId={editableTransactionId}
                  showTransactionSlideOver={showTransactionSlideOver}
                />
              </div>
            </TransactionsProvider>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

function useTransactionSlideOver() {
  const [
    { isCreateMode, editableTransactionId },
    setTransactionSlideOverState,
  ] = React.useState({ isCreateMode: false, editableTransactionId: null });
  const isEditMode = editableTransactionId !== null;
  const showTransactionSlideOver = isCreateMode || isEditMode;

  const openTransactionSlideOver = () => {
    setTransactionSlideOverState({
      isCreateMode: true,
      editableTransactionId: null,
    });
  };
  const openTransactionSlideOverForId = (id) => {
    setTransactionSlideOverState({
      isCreateMode: false,
      editableTransactionId: id,
    });
  };
  const closeTransactionSlideOver = () => {
    setTransactionSlideOverState({
      isCreateMode: false,
      editableTransactionId: null,
    });
  };

  return {
    showTransactionSlideOver,
    editableTransactionId,
    openTransactionSlideOver,
    openTransactionSlideOverForId,
    closeTransactionSlideOver,
  };
}
