var aSyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('a or b are not numbers!');
      }
    }, 2500);
  });
};

aSyncAdd(2, 5).then((res) => {
  console.log("Result:", res);
  return aSyncAdd(res, '33');
}).then((res) => {
  console.log("Result:", res);
}).catch((error) => {
  console.log(error);
})

/*
  var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('Hey. it worked!');
        reject('Unable to fulfill promise');
    },2500);

  });
}

somePromise.then((message) => {
  console.log('Succes: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
*/
