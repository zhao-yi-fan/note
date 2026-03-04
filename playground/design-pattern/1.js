Promise.myRace = function (promises){
  const arr = Array.from(promises);
  return new Promise((resolve,reject)=>{
    let count = 0;

    arr.forEach(p,i){
      Promise.resolve(p).then(resolve,reject)
    }
  })

}