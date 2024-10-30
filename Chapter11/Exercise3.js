function promiseAll(promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completedCount = 0;
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(result => {
            results[index] = result;
            completedCount++;
            if (completedCount === promises.length) {
              resolve(results);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
      if (promises.length === 0) {
        resolve(results);
      }
    });
  }
  const p1 = Promise.resolve(3);
  const p2 = Promise.resolve(42);
  const p3 = new Promise((resolve) => setTimeout(() => resolve('foo'), 100));
  promiseAll([p1, p2, p3])
    .then(values => {
      console.log(values); 
    })
    .catch(error => {
      console.error(error);
    });
  const p4 = Promise.reject("Error!");
  promiseAll([p1, p4])
    .then(values => {
      console.log(values);
    })
    .catch(error => {
      console.error(error); 
    });