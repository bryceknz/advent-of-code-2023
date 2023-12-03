import Bun from 'bun';
import path from 'path';

/** Reads the contents of a file and returns its lines as an array of strings. */
export async function readFile(
  directory: string,
  filename: string
): Promise<string[]> {
  const filepath = path.join(directory, filename);
  const file = Bun.file(filepath);

  const content = await file.text();
  return content.split('\n').filter(Boolean); // Remove empty line at the end of the file
}
