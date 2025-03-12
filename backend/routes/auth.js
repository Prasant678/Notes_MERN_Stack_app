const express = require('express')
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const Jwt_SECRET = 'Prasantisagoodb$oy';

router.post('/Createuser', [
    body('name','enter a valid name').isLength({min:5}),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').isLength({min:6})
],async(req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, error: errors.array()});
    }
    try {
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).json({success, error: "Email Already Exist"})
    }
    const salt = await bcrypt.genSalt(2);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, Jwt_SECRET);
    success = true;
    res.json({success, authtoken});

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],async(req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (!user){
            success = false;
            return res.status(400).json({error: 'Invalid Credentails'})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
            success = false;
            return res.status(400).json({error: 'Invalid Credentails'}) 
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, Jwt_SECRET);
        success = true;
        res.json({success, authtoken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/getuser', fetchuser, async(req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;