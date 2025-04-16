const userModel = require("../Models/user.model");
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        const { email, password, fullName } = req.body;
        const hashPassword = await userModel.hashPassword(password)
        const isUserAlready = await userModel.findOne({ email });

        if (isUserAlready) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const newUser = new userModel({
            email,
            fullName,
            password: hashPassword
        })
        const user = await newUser.save()

        const token = newUser.generateAuthToken()
        res.status(201).json({ token, user });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });

    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });

}