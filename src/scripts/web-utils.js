export function linkRes(resList, attrName = null) {
  let isString = attrName == null;
  let server = "http://localhost:5176/";
  if (isString) {
    return resList.map(function(res) {
      return server + res;
    });
  } else {
    for (let i = 0; i < resList.length; i++) {
      resList[i][attrName] = server + resList[i][attrName];
    }
    return resList;
  }
}
