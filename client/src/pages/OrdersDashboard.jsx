import { useEffect, useState } from "react";
import api from "../services/api";
import OrderRow from "../components/OrderRow";
import OrderDetailsModal from "../components/OrderDetailsModal";
import Layout from "../components/Layout";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setLoading(true);

    let endpoint = `/orders?page=${page}&limit=${limit}`;
    if (statusFilter) {
      endpoint += `&status=${statusFilter}`;
    }

    api
      .get(endpoint)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch(() => alert("Failed to fetch orders"))
      .finally(() => {
        setLoading(false);
      });
  }, [page, statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/orders/${id}/status`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? res.data : order)),
      );
    } catch {
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <Layout
      title="Orders Dashboard"
      actions={
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      }
    >
      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200 border-b border-slate-300">
            <tr className="text-left">
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Order #
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Amount
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Status
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Update
              </th>
              <th className="p-3 text-xs font-semibold text-slate-700 uppercase tracking-wide">
                View
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onStatusChange={updateStatus}
                  onView={() => setSelectedOrder(order)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </Layout>
  );
};

export default OrdersDashboard;
