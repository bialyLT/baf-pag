const errorHandler = (e, req, res, next) => {
    res.status(500).json({ success: false, message: e.message });
};

module.exports = errorHandler;