import bcrypt from 'bcrypt';

export const adaptHash = async (data: string, salt: number = 10): Promise<string> => {
  const hash = await bcrypt.hash(data, salt);

  return hash
}
