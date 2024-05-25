import Bid from '../models/Bid.js';
import Item from '../models/Item.js';
import Notification from '../models/Notification.js';

export const getAllBids = async (req, res) => {
    try {
        const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const placeBid = async (req, res) => {
    const { bid_amount } = req.body;

    try {
        const item = await Item.findByPk(req.params.itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (bid_amount <= item.current_price) {
            return res.status(400).json({ message: 'Bid amount must be higher than current price' });
        }

        const bid = await Bid.create({
            item_id: req.params.itemId,
            user_id: req.user.userId,
            bid_amount,
        });

        item.current_price = bid_amount;
        await item.save();

        await Notification.create({
            user_id: item.user_id,
            message: `New bid of ${bid_amount} placed on your item ${item.name}`,
        });

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
