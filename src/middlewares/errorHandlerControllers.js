export default errorHandler = (e, req, res, next) => {
    res.status(500).json({ success: false, message: e.message });
};