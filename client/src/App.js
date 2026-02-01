import { useState } from "react";
import MenuManagement from "./pages/MenuManagement";
import OrdersDashboard from "./pages/OrdersDashboard";

function App() {
  const [view, setView] = useState("menu");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* TOP NAVBAR */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* LEFT: APP TITLE */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-slate-800">
              Eatoes Admin
            </span>
          </div>

          {/* RIGHT: NAVIGATION */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setView("menu")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                view === "menu"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Menu
            </button>

            <button
              onClick={() => setView("orders")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                view === "orders"
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Orders
            </button>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {view === "menu" ? <MenuManagement /> : <OrdersDashboard />}
    </div>
  );
}

export default App;
