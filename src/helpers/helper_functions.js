export function getNamesFromIds(array, ids){
  var names = [];
  if(ids instanceof Array){
    for (let id of ids) {
      names.push(array.find(function (d) {
        return d.id === id;
      }).name);
    }
  }else{
    names.push(array.find(function (d) {
      return d.id === ids;
    }).name);
  }
  return names;
}

export function square(x) {
  return x * x;
}