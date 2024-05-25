import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { user_id: req.user.userId } });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markNotificationsRead = async (req, res) => {
    try {
        await Notification.update({ is_read: true }, { where: { user_id: req.user.userId } });
        res.json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
