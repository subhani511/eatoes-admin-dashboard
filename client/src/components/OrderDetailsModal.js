const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">
            Order #{order.orderNumber}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 space-y-4">
          {/* CUSTOMER INFO */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Customer</p>
              <p className="font-medium text-slate-800">{order.customerName}</p>
            </div>

            <div>
              <p className="text-slate-500">Table</p>
              <p className="font-medium text-slate-800">{order.tableNumber}</p>
            </div>

            <div className="col-span-2">
              <p className="text-slate-500">Status</p>
              <p className="font-medium text-slate-800">{order.status}</p>
            </div>
          </div>

          {/* DIVIDER */}
          <hr className="border-slate-200" />

          {/* ITEMS */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Order Items
            </h4>

            <ul className="space-y-2 text-sm">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between text-slate-700">
                  <span>
                    {item.menuItem?.name} × {item.quantity}
                  </span>
                  <span className="font-medium">₹{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-200">
            <span className="text-base font-semibold text-slate-800">
              Total
            </span>
            <span className="text-base font-bold text-slate-900">
              ₹{order.totalAmount}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
