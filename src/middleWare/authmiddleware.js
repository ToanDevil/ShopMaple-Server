const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.access_token.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: "Không tìm thấy token"
            });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
            if (err) {
                return res.status(403).json({
                    status: 'ERR',
                    message: "Token không hợp lệ"
                });
            }

            const { payload } = user;

            if (payload.isAdmin) {
                next();
            } else {
                return res.status(400).json({
                    status: 'ERR',
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
        const token = req.headers.access_token.split(' ')[1];
        const userID = req.params.id;

        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: "Không tìm thấy token"
            });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
            if (err) {
                return res.status(200).json({
                    status: 'ERR',
                    message: "Token không hợp lệ",
                    err: err
                });
            }

            if (!user.isAdmin && user.id === userID) {
                next();
            } else {
                return res.status(400).json({
                    status: 'ERR',
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
