import Router from 'express'
import verifyToken from './verifyToken.js';
const router = Router();

router.get('/posts', verifyToken, (req, res) => {
    res.json({
        title: "Confidential",
        data: "You must not see this..."
    })
})

export default router;