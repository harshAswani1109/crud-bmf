const express = require('express');
const { purchaseProduct } = require('../controllers/transactionController');
const router = express.Router();

router.post('/purchase/:productId', purchaseProduct);

module.exports = router;
