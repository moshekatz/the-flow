import React from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { TransactionSlideOver } from "./transaction-slide-over";
import { todayAsFilterMonth } from "./shared/calculation-utils";
import { MyFlow, title as myFlowTitle } from "./pages/my-flow";
import {
  Subscriptions,
  title as subscriptionsTitle,
} from "./pages/subscriptions";
import { Dashboard, title as dashboardTitle } from "./pages/dashboard";
import { Settings, title as settingsTitle } from "./pages/settings";
import { YourProfile, title as YourProfileTitle } from "./pages/your-profile";
import { NotFound } from "./pages/not-found";

import { useNavigation } from "../context/navigation-context";
import { TransactionsProvider } from "../api/transactions/transactions-api-hooks";

export default AuthenticatedApp;

const supportsFilter = [myFlowTitle];

function AuthenticatedApp() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterMonth, setFilterMonth] = React.useState(todayAsFilterMonth);
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
          onCreateTransaction={openTransactionSlideOver}
          onSelectTransaction={openTransactionSlideOverForId}
          searchQuery={searchQuery}
          filterMonth={filterMonth}
        />
      );
      break;
    }
    case subscriptionsTitle: {
      page = (
        <Subscriptions
          onCreateTransaction={openTransactionSlideOver}
          onSelectSubscription={openTransactionSlideOverForId}
          searchQuery={searchQuery}
        />
      );
      break;
    }
    case dashboardTitle: {
      page = <Dashboard />;
      break;
    }
    case settingsTitle: {
      page = <Settings />;
      break;
    }
    case YourProfileTitle: {
      page = <YourProfile />;
      break;
    }
    default: {
      page = <NotFound />;
      break;
    }
  }

  const showFilterDropdown = supportsFilter.includes(currentPage);

  return (
    <div
      className={`min-h-screen bg-white flex ${
        shouldHideScrollbar ? "overflow-y-hidden" : ""
      }`}
    >
      <Sidebar />

      <div className="mb-3 flex-1 lg:max-w-4xl mx-auto w-0 flex flex-col lg:px-8 xl:px-0">
        <Header
          searchQuery={searchQuery}
          onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
          filterMonth={filterMonth}
          onFilterMonthSelected={(selectedFilterMonth) =>
            setFilterMonth(selectedFilterMonth)
          }
          showFilterDropdown={showFilterDropdown}
        />
        <TransactionsProvider>
          <div className="flex ">
            <main
              className="flex-1 relative px-2 focus:outline-none"
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
