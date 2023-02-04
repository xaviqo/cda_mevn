const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginService = {};

loginService.logIn = async (req,res) => {
    const { user, password } = req.body;
    const admin = await Admin.findOne({user:user});
    let checkPasswords = false;

    if (admin)
        checkPasswords = bcrypt.compareSync(password,admin.password);

    if (checkPasswords){
        res.status(200).json({
            id: admin._id,
            token: jwt.sign({ id: admin._id },process.env.CDA_SECRET,{
                expiresIn: 86400 // 24h
            })
        });
    } else {
        res.status(401).json({
            code: 401,
            message: "Credenciales incorrectas",
            dateTime: new Date()
        });
    }
}

/*loginService.createAdmin = async (req,res) => {
    const admin = new Admin({
        user: req.body.user,
        password: await encryptPassword(req.body.password)
    });
    res.json(await admin.save());
};*/

encryptPassword = async (pwd) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pwd,salt);
}

module.exports = loginService;