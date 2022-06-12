const router=require('express').Router();
const authentication=require('./authentication/login');
const cuisine=require('./cuisines/cuisine');

router.use('/authentication',authentication);
router.use('/cuisines',cuisine);

module.exports=router;