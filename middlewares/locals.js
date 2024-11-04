// import users from "../models/usermodel.js";

const usermiddleware = async (req, res, next) => {
    if (req.session.userId){
       try {
        const user = await users.findOne({
            where: {
                uuid: req.session.userId
            }
        });
        if (user){
            res.locals.user = {
                uuid: user.uuid,
                name: user.name,
                email : user.email
            }
        }
       } catch (error) {
        console.log(error)
       }
    }
    next()
};

export default usermiddleware;