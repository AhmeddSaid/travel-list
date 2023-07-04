import { useState, useEffect } from "react";
import Item from "./Item";
function PackingList({ items, onDeleteItem, onPackedItem, onClearList }) {
  const initVal = localStorage.getItem("sortBy");
  const [sortBy, setSortBy] = useState(initVal);
  let sortedItems;

  useEffect(() => {
    // Update local storage whenever sortBy changes
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  useEffect(() => {
    // Retrieve sortBy from local storage on component mount
    const storedSortBy = localStorage.getItem("sortBy");
    if (storedSortBy) {
      setSortBy(storedSortBy);
    }
  }, []);

  if (sortBy === "input") {
    sortedItems = items;
  }

  // sort alphabetically
  if (sortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }

  // sort by packed status
  if (sortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by name</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

export default PackingList;
