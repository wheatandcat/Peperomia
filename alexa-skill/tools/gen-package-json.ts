import { name, description, version, main, license, dependencies } from "pjson";

const packageJson = {
  name,
  description,
  version,
  main,
  license,
  dependencies
};

console.log(JSON.stringify(packageJson));
