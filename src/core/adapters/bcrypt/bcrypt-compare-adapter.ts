import bcrypt from 'bcrypt';

export const adaptBcryptCompare = async (data: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(data, hash);
}
