export function QueryForm(params) {
  const handleChange = (event) => {
    let newQueryObject = { ...params.formObject };
    newQueryObject[event.target.name] = event.target.value;
    params.setFormObject(newQueryObject);
  };

  const onSubmitClick = (event) => {
    event.preventDefault();
    if (!params.formObject.queryName) {
      alert("Please provide a name for the query!");
      return;
    }
    if (!params.formObject.q || params.formObject.q.length === 0) {
      alert("Please provide some text for the query field!");
      return;
    }
    params.submitToParent(params.formObject);
  };

  const currentUserIsAdmin = () => {
    return params.currentUser && params.currentUser.user === "admin";
  };

  if (!params.currentUser) {
    return null; // Ensure QueryForm is not rendered if currentUser is null
  }

  return (
    <div className="form-container">
      <form>
        <div
          className={currentUserIsAdmin() ? "visible" : "hidden"}
          style={{ border: "solid black 1px", padding: "10px" }}
        >
          <div className="form-group">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              name="language"
              value={params.formObject.language}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pageSize">Page Size:</label>
            <input
              type="number"
              id="pageSize"
              name="pageSize"
              min={1}
              max={100}
              value={params.formObject.pageSize || 5}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="queryName">Query Name:</label>
          <input
            type="text"
            size={10}
            id="queryName"
            name="queryName"
            value={params.formObject.queryName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="q">Query Text:</label>
          <input
            type="text"
            size={10}
            id="q"
            name="q"
            value={params.formObject.q}
            onChange={handleChange}
          />
        </div>

        <input type="button" value="Submit" onClick={onSubmitClick} />
      </form>
    </div>
  );
}