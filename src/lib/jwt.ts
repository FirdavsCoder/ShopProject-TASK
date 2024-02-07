import jwt from "jsonwebtoken"
import {config} from "../common/config";

export function jwtSign(data:any) :string{
  return jwt.sign(data, config.jwtKey)
}

export function verifyToken(data: any) :any{
  return jwt.verify(data, config.jwtKey)
}

