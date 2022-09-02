import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const adaptJwtSign = async (params: any, expiresIn: number) => {
  const token = jwt.sign(params, process.env.JWT_SECRET || '', {
    expiresIn
  })

  return token
}
