import Bun from 'bun';
import path from 'path';

const FILENAME = 'input.txt';

readFile(FILENAME).then(processContent).then(console.log).catch(console.error);

/** Reads the contents of a file and returns its lines as an array of strings. */
async function readFile(filename: string): Promise<string[]> {
  const currentDirectory = import.meta.dir;
  const filepath = path.join(currentDirectory, filename);

  const file = Bun.file(filepath);
  const content = await file.text();
  return content.split('\n').filter(Boolean); // Remove empty lines
}

/** Processes each line and returns the sum of all extracted codes. */
function processContent(content: string[]): number {
  let sum = 0;
  for (const line of content) sum += extractCode(line);

  return sum;
}

/** Extracts the first and last digits from a string and returns them as a number. */
export function extractCode(line: string): number {
  const [, first, last] = line.match(/(\d)(?:.*?(\d))?[\D]*$/)!;

  // If a second number is not found, append the first number
  return Number(first + (last ?? first));
}
