const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.post('/', controller.createOrder);
router.get('/list', controller.listOrders);
router.get('/:orderId', controller.getOrderByNumber);
router.put('/:orderId', controller.updateOrder);
router.delete('/:orderId', controller.deleteOrder);

module.exports = router;