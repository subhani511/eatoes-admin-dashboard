const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  Ready: "bg-green-100 text-green-700",
  Delivered: "bg-slate-200 text-slate-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderRow = ({ order, onStatusChange, onView }) => {
  return (
    <tr className="border-b hover:bg-slate-50 transition">
      <td className="p-3 text-sm text-slate-800 font-medium">
        {order.orderNumber}
      </td>

      <td className="p-3 text-sm text-slate-700">₹{order.totalAmount}</td>

      <td className="p-3">
        <span
          className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </td>

      <td className="p-3">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className="text-sm p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Pending</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </td>

      <td className="p-3">
        <button
          onClick={onView}
          className="px-3 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
