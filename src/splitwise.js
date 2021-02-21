export const SPLITWISE_CONSTS = {
  MOSHE_ID: 12405891,
  LA_FAMILIA_GROUP_ID: 14694889,
  ODED_ID: 14843832,
  MARIN_ID: 26120325,
  APARTMENT_GROUP_ID: 21398298,
  ZVIGI_ID: 29678195,
  LIOR_ID: 36087857,
};

export function createExpense() {
  const payload = {
    description: "Moshe Code",
    group_id: SPLITWISE_CONSTS.APARTMENT_GROUP_ID,
    cost: 100.0,
    users__0__user_id: SPLITWISE_CONSTS.MOSHE_ID,
    users__0__paid_share: 100.0,
    users__0__owed_share: 50.0,
    users__1__user_id: SPLITWISE_CONSTS.ZVIGI_ID,
    users__1__paid_share: 0.0,
    users__1__owed_share: 50.0,
    currency_code: "ILS",
    creation_method: "unequal",
  };

  fetch("https://secure.splitwise.com/api/v3.0/create_expense", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPLITWISE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Success!");
    });
}
