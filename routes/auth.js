import Router from 'express'
import User from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';
import {registerValidation, loginValidation} from '../validation.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/register', async (req, res) => {
    // Data validation before storing to DB.
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // Checking if email already exists
    const emailExists = await User.find({email:req.body.email})
    if(emailExists.length > 0) return res.status(400).send('Email already exists')

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save();
        res.send({user: savedUser._id})
    } catch {
        res.send('Error Occured..')
    }
})

router.post('/login', async (req, res) => {
    // Validation of login details
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error['details'][0].message);

    // Checking if email already exists
    const user = await User.find({email:req.body.email})
    if(user.length === 0) return res.status(400).send('Email doesn\'t exists..')

    // Check whether password is correct
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err) return res.status(400).send('Invalid Password..')
        //Create and assign a token
        const token = jsonwebtoken.sign({_id:user._id}, process.env.SECRET_TOKEN)
        res.header('auth-token', token).status(200).send(token)
    })
})


export default router;