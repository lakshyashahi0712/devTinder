const adminAuth = (req,res,next)=>{

    const token = "xyz"
    const isAdminAuth = token === "xyz"
    if(!isAdminAuth){
        res.status(401).send("unauthorized")
    }
    else{

        next()
    }
}

const userAuth = (req,res,next)=>{
    const token = "abc";
    const isUserAuth = token === "abc";
    if(!isUserAuth){
        res.status(401).send("unauthorized")
    } else{
        next();
    }
}

module.exports = {
    adminAuth ,
    userAuth
}