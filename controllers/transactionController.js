const Product = require('../models/productModel');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

exports.purchaseProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const buyerId = req.user._id; 

    const product = await Product.findById(productId);
    const buyer = await User.findById(buyerId);
    const seller = await User.findById(product.sellerId);

    if (!product || product.quantity <= 0) {
      return res.status(400).json({ message: 'Product unavailable' });
    }

    if (buyer.balance < product.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from buyer and add to seller
    buyer.balance -= product.price;
    seller.balance += product.price;

    // Decrease product quantity
    product.quantity -= 1;

    // Mark product as sold out if quantity reaches zero
    if (product.quantity === 0) {
      product.status = 'Sold Out';
    }

    // Save updates
    await buyer.save();
    await seller.save();
    await product.save();

    // Create transaction record
    const transaction = new Transaction({
      productId: product._id,
      buyerId: buyer._id,
      sellerId: seller._id,
      price: product.price
    });
    await transaction.save();

    res.json({ message: 'Purchase successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
