const MenuItem = require("../models/MenuItem");

/**
 * GET /api/menu
 * Filters: category, availability, minPrice, maxPrice
 */
exports.getAllMenuItems = async (req, res, next) => {
  try {
    const { category, isAvailable, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === "true";

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const menuItems = await MenuItem.find(filter).sort({ createdAt: -1 });

    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/menu/:id
 */
exports.getMenuItemById = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/menu
 */
exports.createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/menu/:id
 */
exports.updateMenuItem = async (req, res, next) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/menu/:id
 */
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/menu/:id/availability
 */
exports.toggleAvailability = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/menu/search?q=
 */
exports.searchMenuItems = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await MenuItem.find({
      $text: { $search: q },
    });

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
