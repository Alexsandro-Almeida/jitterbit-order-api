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