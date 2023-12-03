import { readFile } from '../utils';

const DIRECTORY = import.meta.dir;
const FILENAME = 'input.txt';

readFile(DIRECTORY, FILENAME)
  .then(processContent)
  .then(console.log)
  .catch(console.error);

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
