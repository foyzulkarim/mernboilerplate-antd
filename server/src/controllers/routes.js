const express = require('express');
const userRoutes = require('./user-controller');
const roleRoutes = require('./role-controller');
const customerRoutes = require('./customer-controller');
const productRoutes = require('./product-controller');
const resourceRoutes = require('./resource-controller');
const permissionRoutes = require('./permission-controller');
const filterRoutes = require('./filter-controller');

let router = express.Router();

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);
router.use("/resources", resourceRoutes);
router.use("/permissions", permissionRoutes);
router.use("/filters", filterRoutes);

module.exports = router;