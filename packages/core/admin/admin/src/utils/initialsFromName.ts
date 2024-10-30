function initialsFromName(name: string) {
  return name
    .split(' ')
    .map((name) => name.substring(0, 1))
    .join('')
    .substring(0, 2);
}

export default initialsFromName;
export { initialsFromName };
