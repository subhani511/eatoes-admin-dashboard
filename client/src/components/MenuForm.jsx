import { useEffect, useState } from "react";

const MenuForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    category: "Appetizer",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "Appetizer",
        price: initialData.price || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name and Price are required");
      return;
    }

    onSubmit({
      ...form,
      price: Number(form.price),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? "Edit Menu Item" : "Add Menu Item"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Item name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Appetizer</option>
            <option>Main Course</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
