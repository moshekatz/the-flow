export function Header({ heading }) {
  return (
    <header
      style={{
        backgroundColor: "#282c34",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)",
      }}
    >
      <h1 className="text-green-400">{heading}</h1>
    </header>
  );
}

export function ErrorMessage({ error }) {
  return (
    <div className="rounded-md bg-red-50 p-4 max-w-md w-full">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Heroicon name: x-circle */}
          <svg
            className="h-5 w-5 text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There was an error:
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <pre>{error.message}</pre>
            {/* <ul className="list-disc pl-5 space-y-1">
                <li>Your password must be at least 8 characters</li>
                <li>
                  Your password must include at least one pro wrestling
                  finishing move
                </li>
              </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Form({ onSubmit, elements }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const elementProps = elements.reduce((acc, { name, type }) => {
      if (type === "submit") return acc;
      let elementValue = formElements[name].value;
      if (elementValue === "") return acc;
      if (type === "number") {
        elementValue = Number(elementValue);
      }
      // if (type === "date") {
      //   elementValue = Date(elementValue);
      // }

      acc[name] = elementValue;
      return acc;
    }, {});

    onSubmit(elementProps);
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "minmax(max-content,40vw)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {elements.map(mapFormElementsToComponents)}
    </form>
  );
}

function mapFormElementsToComponents({ type, name }) {
  switch (type) {
    case "text":
    case "password":
    case "date":
    case "number":
    case "email": {
      return (
        <div
          key={`${type}-${name}`}
          style={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <label style={{ float: "left", marginRight: "3px" }} htmlFor={name}> */}
          <label htmlFor={name}>{`${capitalize(name)}:`}</label>
          {/* <input style={{ float: "right" }} type={type} name={name}></input> */}
          <input type={type} name={name}></input>
        </div>
      );
    }
    case "submit": {
      return (
        <button
          key={type}
          style={{
            alignSelf: "stretch",
            borderRadius: "7px",
            margin: "8px 0",
          }}
          type="submit"
        >
          {name}
        </button>
      );
    }
    default: {
      throw new Error(`Unsupported form element of type ${type}`);
    }
  }
}

function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
