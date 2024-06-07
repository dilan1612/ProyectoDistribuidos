import User from '../models/usermodel.js'
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import { CreateAccesToken } from '../libs/jwt.js'
import { TOKEN_SECRET } from "../config.js";

export const register = async(req,res) =>{
    const {username,email,phone,password} =req.body

    try {
        const userFound =await User.findOne({email});
        if(userFound)
        return res.status(400).json(["El correo ya está en uso"])
        
        const passwordHash = await bcryptjs.hash(password,10)

        const newUser = new User({
            username,
            email,
            phone,
            password : passwordHash
        })
        const UserSaved = await newUser.save()
        const token = CreateAccesToken({ id : UserSaved.id})
        
       
          res.json({
            id: UserSaved.id,
            username: UserSaved.username,
            email: UserSaved.email,
            token
        })
        
    } catch (error) {
        console.log(error)
    }
   
}

export const login = async(req,res) =>{
    const {email,password} =req.body

    try {
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({
            message: "Usuario No Encontrado"
        })
        const isMatch = await bcryptjs.compare(password,userFound.password)

        if(!isMatch) return res.status(400).json ({
            message:"Credenciales Incorrectas"

        })
       
        const token = CreateAccesToken({ id : userFound.id})
        
          res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            token
        })
        
       
    } catch (error) {
        console.log(error)
    }
   
}

export const logout =(req,res)=>{

    res.cookie('token',"",{
       expires: new Date(0), 
    })
    return res.sendStatus(200)
}


export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({
        message : "Usuario no encontrado"
    })
    return res.json({
        id: userFound._id,
        username : userFound.username,
    })
}





export const verifyToken = async (req, res) => {
    const {id} = req.user
    
    const userFound = await User.findById(id)

    if(!userFound) return res.status(400).json({
        message : "Usuario no encontrado"
    })

    return res.json({
        id: userFound._id,
        username : userFound.username,
        email : userFound.email
    })
};
  
  