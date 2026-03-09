const mongoose = require('mongoose');

// Schema para os itens dentro do pedido
const ItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

// Schema principal do Pedido
const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    items: [ItemSchema]
}, { versionKey: false });

module.exports = mongoose.model('Order', OrderSchema);