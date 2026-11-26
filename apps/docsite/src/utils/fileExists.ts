import fs from 'node:fs/promises';

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(filePath);

    return stat.isFile();
  } catch {
    return false;
  }
};
