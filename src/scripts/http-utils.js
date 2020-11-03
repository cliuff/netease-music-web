export function stringify(data, listOnly = false) {
  let qs = require("qs");
  let doListOnly = listOnly === true;
  let stringifiedData = qs.stringify(data);
  // array[0][prop] -> array[0].prop
  // object[prop] -> object.prop when !doListOnly
  // url escaped, %5B -> [, %5D -> ]
  let transRegex = doListOnly ? /%5D%5B([^\d].*?)%5D/g : /%5B([^\d].*?)%5D/g;
  let matches = stringifiedData.matchAll(transRegex);
  for (let match of matches) {
    stringifiedData = stringifiedData.replace(match[0], "." + match[1]);
  }
  return stringifiedData;
}
