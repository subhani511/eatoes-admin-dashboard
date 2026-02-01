const Order = require("../models/Order");

/**
 * GET /api/orders
 * Query params: page, limit, status
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/:id
 */
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/orders
 */
exports.createOrder = async (req, res, next) => {
  try {
    const orderCount = await Order.countDocuments();

    const order = await Order.create({
      ...req.body,
      orderNumber: `ORD-${orderCount + 1}`,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/orders/:id/status
 */
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
