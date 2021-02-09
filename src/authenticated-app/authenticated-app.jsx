import React from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { TransactionSlideOver } from "./transaction-slide-over";
import { MyFlow } from "./pages/my-flow";
import { Subscriptions } from "./pages/subscriptions";
import { Dashboard } from "./pages/dashboard";
import { Settings } from "./pages/settings";
import { YourProfile } from "./pages/your-profile";
import { NotFound } from "./pages/not-found";

import { useNavigation } from "../context/navigation-context";
import { TransactionsProvider } from "../api/transactions/transactions-api-hooks";

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
    case "My Flow": {
      page = (
        <MyFlow
          onCreateTransaction={openTransactionSlideOver}
          onSelectTransaction={openTransactionSlideOverForId}
          searchQuery={searchQuery}
        />
      );
      break;
    }
    case "Subscriptions": {
      page = (
        <Subscriptions
          onCreateTransaction={openTransactionSlideOver}
          onSelectSubscription={openTransactionSlideOverForId}
          searchQuery={searchQuery}
        />
      );
      break;
    }
    case "Dashboard": {
      page = <Dashboard />;
      break;
    }
    case "Settings": {
      page = <Settings />;
      break;
    }
    case "Your Profile": {
      page = <YourProfile />;
      break;
    }
    default: {
      page = <NotFound />;
      break;
    }
  }

  return (
    <div
      className={`h-screen bg-white flex ${
        shouldHideScrollbar ? "overflow-y-hidden" : ""
      }`}
    >
      <Sidebar />

      <div className="flex-1 lg:max-w-4xl mx-auto w-0 flex flex-col lg:px-8 xl:px-0">
        <Header
          searchQuery={searchQuery}
          onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
        />
        <TransactionsProvider>
          <div className="flex ">
            <main
              className="flex-1 relative px-2  focus:outline-none"
              tabIndex={0}
            >
              {page}
            </main>
            {showTransactionSlideOver ? (
              <TransactionSlideOver
                handleClose={closeTransactionSlideOver}
                transactionId={editableTransactionId}
              />
            ) : null}
          </div>
        </TransactionsProvider>
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
