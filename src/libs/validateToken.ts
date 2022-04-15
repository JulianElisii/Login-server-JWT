import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";

export interface IPayload {
  _id: string;
  iat: number;
} 


export const TokenValidation =(req : Request, res: Response, next: NextFunction)=> {
  const token = req.header("auth-token");
  if(!token) return res.status(401).json("Access denied");

  const payload  = Jwt.verify(token, process.env.TOKEN_SECRET || "" ) as IPayload; //Lo que hace verify es devolver todos los datos que contiene un token
  req.userId = payload._id
   next()
}