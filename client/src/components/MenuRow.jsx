const MenuRow = ({ item, onToggle, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-3 font-medium text-gray-800">{item.name}</td>

      <td className="p-3 text-gray-600">{item.category}</td>

      <td className="p-3 text-gray-700">₹{item.price}</td>

      <td className="p-3">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            item.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.isAvailable ? "Available" : "Unavailable"}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="p-3">
        <div className="flex gap-2">
          <button
            onClick={() => onToggle(item._id, item.isAvailable)}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Toggle
          </button>

          <button
            onClick={() => onEdit(item)}
            className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item)}
            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MenuRow;
