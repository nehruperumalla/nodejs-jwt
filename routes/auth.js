import Router from 'express'
import User from '../models/User.js';
import {registerValidation, loginValidation} from '../validation.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/register', async (req, res) => {
    // Data validation before storing to DB.
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error['details'][0].message)

    // Checking if email already exists
    const emailExists = await User.find({email:req.body.email})
    console.log(emailExists)
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
        res.send(savedUser)
    } catch {
        res.send('Error Occured..')
    }
})

router.post('/login', (req, res) => {
    res.status(200).send('Login')
})


export default router;