import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const adaptJwtSign = async (uniqueProp: string | number, expiresIn: number) => {
  const token = jwt.sign({ uniqueProp }, process.env.JWT_SECRET || '', {
    expiresIn
  })

  return token
}
