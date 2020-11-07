export function linkRes(resList, attrName = null) {
  let isString = attrName == null;
  let isProduction = false;
  let productionUrl = "http://123.56.247.98:5176/";
  let developmentUrl = "http://localhost:5176/";
  let server = isProduction ? productionUrl : developmentUrl;
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
