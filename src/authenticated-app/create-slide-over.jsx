export { CreateSlideOver };

const todayAsInputValue = new Date().toISOString().split("T")[0];

function CreateSlideOver({ handleClose, createOutgoing }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, amount, currency, repeat, due } = e.target.elements;
    const outgoingToCreate = {
      name: name.value,
      amount: amount.value,
      currency: currency.value,
      repeat: repeat.value,
      due: due.value,
    };
    try {
      await createOutgoing(outgoingToCreate);
      handleClose();
      // if (error) {
      //   alert(error.message);
      // }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <section
      className="pl-3 max-w-full flex"
      aria-labelledby="slide-over-heading"
    >
      {/*
  Slide-over panel, show/hide based on slide-over state.

  Entering: "transform transition ease-in-out duration-500 sm:duration-700"
    From: "translate-x-full"
    To: "translate-x-0"
  Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
    From: "translate-x-0"
    To: "translate-x-full"
*/}
      <div className="w-screen max-w-xs">
        <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="min-h-0 flex-1 flex flex-col py-6">
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    id="slide-over-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Create a new item
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={handleClose}
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Close panel</span>
                      {/* Heroicon name: x */}
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      autoFocus
                      type="text"
                      name="name"
                      id="name"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="pt-6 sm:pt-5">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder={0.0}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor="currency" className="sr-only">
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        defaultValue="ILS"
                        className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                      >
                        <option>ILS</option>
                        <option>USD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 sm:pt-5">
                  <div role="group" aria-labelledby="label-repeat">
                    <label
                      htmlFor="repeat"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Repeat
                    </label>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                      <div className="sm:col-span-2">
                        <div className="max-w-lg">
                          <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                              <input
                                defaultChecked
                                id="one-time"
                                name="repeat"
                                type="radio"
                                value="One Time"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="one-time"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                One Time
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="monthly"
                                name="repeat"
                                type="radio"
                                value="Monthly"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="monthly"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Monthly
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="annually"
                                name="repeat"
                                type="radio"
                                value="Annually"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                              />
                              <label
                                htmlFor="annually"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Annually
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 sm:pt-5">
                  <label
                    htmlFor="due"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Due
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={todayAsInputValue}
                      type="date"
                      name="due"
                      id="due"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 px-4 py-4 flex justify-end">
              <button
                onClick={handleClose}
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
