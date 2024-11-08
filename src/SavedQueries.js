export function SavedQueries(params) {
  const onSavedQueryClick = (savedQuery) => {
    params.onQuerySelect(savedQuery);
  };

  const getQueries = () => {
    return params.savedQueries.map((item, idx) => {
      let trimTitle = item.queryName.substring(0, 30);
      return (
        <li 
          key={idx} 
          onClick={() => onSavedQueryClick(item)} 
          className={item.queryName === params.selectedQueryName ? "selected" : ""} 
        >
          {`${trimTitle}: "${item.q}"`}
        </li>
      );
    });
  };

  const handleDeleteAllQueries = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all queries?");
    if (!confirmed) {
      return;
    }
    
    try {
      const response = await fetch("/api/deleteAllQueries", {
        method: "DELETE",
      });
      if (response.ok) {
        alert("All queries deleted successfully.");
        params.setSavedQueries([]); // Update saved queries
        params.setData({}); // Clear additional data if needed
      } else {
        alert("Failed to delete queries.");
      }
    } catch (error) {
      console.error("Error deleting queries:", error);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '150px' }}>
      <ul>
        {params.savedQueries && params.savedQueries.length > 0 ? (
          getQueries()
        ) : (
          <li>No Saved Queries, Yet!</li>
        )}
      </ul>

      <input
        type="button"
        value="Delete"
        onClick={handleDeleteAllQueries}
        title="Warning: This will delete all queries"
        className="important-button"
        style={{ position: 'absolute', bottom: '10px', left: '10px' }} // Positioning style
      />
    </div>
  );
}