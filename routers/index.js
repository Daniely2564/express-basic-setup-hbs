const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('index/main');
})

module.exports = router;