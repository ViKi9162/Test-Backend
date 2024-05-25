import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Item from './Item.js';

const Bid = sequelize.define('Bid', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Item,
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

export default Bid;
