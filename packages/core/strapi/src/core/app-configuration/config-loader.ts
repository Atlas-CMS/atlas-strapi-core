import path from 'path';
import fs from 'fs';
import { loadFile } from './load-config-file';

const VALID_EXTENSIONS = ['.js', '.json'];

export default (dir: string) => {
  if (!fs.existsSync(dir)) return {};

  const loadedConfig = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((file) => file.isFile() && VALID_EXTENSIONS.includes(path.extname(file.name)))
    .reduce((acc, file) => {
      const key = path.basename(file.name, path.extname(file.name));

      acc[key] = loadFile(path.resolve(dir, file.name));

      return acc;
    }, {} as Record<string, unknown>);

  // console.log(`[Iliad] Loaded config from ${dir}`);
  // console.log({ loadedConfig });

  return loadedConfig;
};
