import { useEffect, useState } from "react";
import api from "../services/api";
import MenuRow from "../components/MenuRow";
import MenuForm from "../components/MenuForm";
import ConfirmDelete from "../components/ConfirmDelete";
import useDebounce from "../hooks/useDebounce";
import Layout from "../components/Layout";

const MenuManagement = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // search & filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");

  // modals
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  // FETCH MENU
  useEffect(() => {
    setLoading(true);

    let endpoint = "/menu";

    if (debouncedSearch) {
      endpoint = `/menu/search?q=${debouncedSearch}`;
    } else {
      const params = [];
      if (category) params.push(`category=${category}`);
      if (availability) params.push(`isAvailable=${availability}`);
      if (params.length) endpoint = `/menu?${params.join("&")}`;
    }

    api
      .get(endpoint)
      .then((res) => setMenu(res.data))
      .catch(() => alert("Failed to fetch menu"))
      .finally(() => setLoading(false));
  }, [debouncedSearch, category, availability]);

  // TOGGLE AVAILABILITY
  const toggleAvailability = async (id, currentStatus) => {
    setMenu((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isAvailable: !currentStatus } : item,
      ),
    );

    try {
      await api.patch(`/menu/${id}/availability`);
    } catch {
      setMenu((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isAvailable: currentStatus } : item,
        ),
      );
      alert("Failed to update availability");
    }
  };

  // ADD / EDIT
  const handleSave = async (data) => {
    try {
      if (editingItem) {
        const res = await api.put(`/menu/${editingItem._id}`, data);
        setMenu((prev) =>
          prev.map((item) => (item._id === editingItem._id ? res.data : item)),
        );
      } else {
        const res = await api.post("/menu", data);
        setMenu((prev) => [res.data, ...prev]);
      }

      setShowForm(false);
      setEditingItem(null);
    } catch {
      alert("Failed to save menu item");
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      await api.delete(`/menu/${deletingItem._id}`);
      setMenu((prev) => prev.filter((item) => item._id !== deletingItem._id));
      setDeletingItem(null);
    } catch {
      alert("Failed to delete menu item");
    }
  };

  if (loading) {
    return <p className="p-6">Loading menu...</p>;
  }

  return (
    <Layout
      title="Menu Management"
      actions={
        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Item
        </button>
      }
    >
      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200 border-b border-slate-300">
            <tr className="text-left">
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Name
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Category
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Price
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Status
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {menu.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No menu items found
                </td>
              </tr>
            ) : (
              menu.map((item) => (
                <MenuRow
                  key={item._id}
                  item={item}
                  onToggle={toggleAvailability}
                  onEdit={(item) => {
                    setEditingItem(item);
                    setShowForm(true);
                  }}
                  onDelete={(item) => setDeletingItem(item)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {showForm && (
        <MenuForm
          initialData={editingItem}
          onSubmit={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}

      {deletingItem && (
        <ConfirmDelete
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </Layout>
  );
};

export default MenuManagement;
