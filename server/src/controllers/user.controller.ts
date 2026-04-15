import { Request, Response } from "express";
import { getUser, login, register } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({ path: '.env.local' }); 

const secret=process.env.JWT_SECRET as string;

export const registerUser = async (req: Request, res: Response) => {
  try{
const { email, password: hashedPassword } = req.body;
  const user = await register(email, hashedPassword);
  res.status(201).json(user);
  }catch(error:any){
    res.status(400).json({message:error.message})
  }
  
};

export const loginUser = async (req: Request, res: Response) => {
  try{
const { email, password } = req.body;
  const user = await login(email);
  if (!user) {
    return res.status(404).json({ field:"email",message: "No user available" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({  field:"password", message: "Password is not match" });
  }
  let token = jwt.sign({ id: user._id,  }, secret,{ expiresIn: "1h" } );
  res.cookie("token", token);
  res.json({token});
  }catch(error:any){
    res.status(400).json({field:"email",message:error.message})
  }
  
};


export const  getUsers=async(req:Request,res:Response)=>{
  try{
    const user=await getUser();
    res.json(user);
  }catch(error:any){
    res.status(400).json({message:"No User Available"})
  }
}
