import Item from '../models/Item.js';

export const getAllItems = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const items = await Item.findAndCountAll({ limit, offset });
        res.json({
            totalItems: items.count,
            totalPages: Math.ceil(items.count / limit),
            currentPage: page,
            items: items.rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const image_url = req.file ? req.file.path : null;

    try {
        const item = await Item.create({
            name,
            description,
            starting_price,
            current_price: starting_price,
            image_url,
            end_time,
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const image_url = req.file ? req.file.path : null;

    try {
        const item = await Item.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.name = name || item.name;
        item.description = description || item.description;
        item.starting_price = starting_price || item.starting_price;
        item.end_time = end_time || item.end_time;
        item.image_url = image_url || item.image_url;

        await item.save();

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.destroy();
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
