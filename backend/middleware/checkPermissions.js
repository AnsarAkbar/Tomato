const Role = require("../admin/models/roles.model");

exports.checkPermissions=(permission)=>{
   return async(req,res,next)=>{
    try{
        const userRole=await Role.findById({_id:req.user.role})
        if(userRole.name==="restaurant_owner"){
            return next();
        }
        if(userRole.permissions.includes(permission)){
            return next();
        }else{
            return res.status(403).json({message:"You are not authorized to access this resource"});
        }
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
   }
}