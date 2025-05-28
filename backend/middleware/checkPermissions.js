exports.checkPermissions=(premission)=>{
    return (req,res,next)=>{
        const userRole=req.user.role;
        if(premission.includes(userRole)){
            next();
        }else{
            res.status(403).json({message:"You are not authorized to access this resource"});
        }
    }
}