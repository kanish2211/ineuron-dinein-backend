const router=require('express').Router();
const authentication=require('./authentication/login');
const cuisine=require('./cuisines/cuisine');
const menu=require('./menu/menu');

router.use('/authentication',authentication);
router.use('/cuisines',cuisine);
router.use('/menu',menu);

module.exports=router;