const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

verifyToken = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token'];
        const id = req.headers['cda-id'];
        if (!token) invalidToken(res);

        const decoded = jwt.verify(token,process.env.CDA_SECRET);
        const admin = await Admin.findById(decoded.id, {password: 0});
        if (admin && (admin._id.toString() == id)) next();
        else invalidToken(res);
    } catch (e) {
        invalidToken(res);
    }
}

function invalidToken(res){
    return res.status(401).json({
        code: 401,
        message: "Token no válido",
        dateTime: new Date()
    });
}

module.exports = verifyToken;