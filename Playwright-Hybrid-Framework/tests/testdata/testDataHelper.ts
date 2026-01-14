import fs from 'fs';
import path from 'path';

export function getTestData<T>(fileName: string): T {
  const filePath = path.resolve(process.cwd(), 'tests/testdata', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as T;
}
