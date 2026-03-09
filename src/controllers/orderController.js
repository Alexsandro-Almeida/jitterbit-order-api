const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

        // REGRA DE MAPEAMENTO/TRANSFORMAÇÃO
        const mappedOrder = {
            // Removemos o sufixo caso exista para o orderId ficar limpo
            orderId: numeroPedido.split('-')[0], 
            value: valorTotal,
            creationDate: new Date(dataCriacao),
            items: items.map(item => ({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };

        const newOrder = new Order(mappedOrder);
        await newOrder.save();

        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(400).json({ 
            error: "Erro na criação do pedido", 
            message: error.message 
        });
    }
};

// Obter por ID (parâmetro na URL)
exports.getOrderByNumber = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Listar todos os pedidos
exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            req.body,
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "Pedido inexistente" });
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.findOneAndDelete({ orderId: req.params.orderId });
        if (!deleted) return res.status(404).json({ message: "Pedido inexistente" });
        return res.status(200).json({ message: "Pedido deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};