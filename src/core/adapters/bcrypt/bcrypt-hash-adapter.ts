import bcrypt from 'bcrypt';

export const adaptBcryptHash = async (data: string, salt: number = 10): Promise<string> => {
  return await bcrypt.hash(data, salt)
}
