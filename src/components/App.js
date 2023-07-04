import { useState, useEffect } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("Loading items from localStorage...");
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      console.log("Found items in localStorage:", storedItems);
      setItems((prevItems) => [...prevItems, ...JSON.parse(storedItems)]);
    }
  }, []);

  useEffect(() => {
    console.log("Saving items to localStorage:", items);
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Events
  function handleAddItem(item) {
    console.log("Adding item:", item);
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    console.log("Deleting item with ID:", id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    console.log("Toggling item with ID:", id);
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) {
      console.log("Clearing all items.");
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackedItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
