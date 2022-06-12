const jwt=require('jsonwebtoken');

module.exports=async(req,res,next) => {
    try{
        const token=req.headers["authorization"].split(' ')[1];
        const value=jwt.verify(token,process.env.JWT_KEY);
        req.tokenData=value;
        next();
    }
    catch(error) {
        return res.status(401).json({error : "Please try to login"});
    }
};