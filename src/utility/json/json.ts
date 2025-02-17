import { readFileSync, writeFileSync } from 'fs';

/**
 * Write Json File utf-8 to filePath
 * @returns {Promise<boolean>} Returns true or false based on success of writing json file
 */

export async function writeJsonFile(filePath: string, json: any): Promise<boolean> {
  let fileSuccess = false;
  try {
    writeFileSync(filePath, JSON.stringify(json), 'utf-8');
    fileSuccess = true;
  } catch (error) {
    console.error('File Write Error: ', error);
    fileSuccess = false;
  }
  return fileSuccess;
}

/**
 * Get Json at FilePath
 */
export async function getJsonFile(filePath: string): Promise<any> {
  let json: any;
  try {
    json = readFileSync(`${filePath}.json`, 'utf-8');
  } catch (error) {
    console.error('Read Json File Error: ', error);
  }

  return JSON.parse(json);
}
