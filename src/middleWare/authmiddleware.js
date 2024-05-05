const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                status: "ERROR",
                message: "Không tìm thấy token"
            });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
            if (err) {
                return res.status(403).json({
                    status: "ERROR",
                    message: "Token không hợp lệ"
                });
            }

            const { payload } = user;

            if (payload.isAdmin) {
                next();
            } else {
                return res.status(400).json({
                    status: "ERROR",
                    message: "Bạn không đủ quyền!"
                });
            }
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};

const authCusMiddleware = (req, res, next) => {
    try {
        const token = req.headers.token;
        const userID = req.params.id;

        if (!token) {
            return res.status(401).json({
                status: "ERROR",
                message: "Không tìm thấy token"
            });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
            if (err) {
                return res.status(403).json({
                    status: "ERROR",
                    message: "Token không hợp lệ",
                    err: err
                });
            }

            const { payload } = user;

            if (!payload.isAdmin && payload.id === userID) {
                next();
            } else {
                return res.status(400).json({
                    status: "ERROR",
                    message: "Bạn không đủ quyền!"
                });
            }
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    authMiddleware,
    authCusMiddleware
};
