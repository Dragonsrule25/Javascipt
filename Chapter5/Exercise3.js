function every(array, test) {
    for (let element of array) {
      if (test(element) === false) {
        return false;
      }
    }
    return true;
  }
  console.log(every([1, 3, 5], n => n < 10));
  console.log(every([2, 4, 16], n => n < 10));
  console.log(every([], n => n < 10));
  function every(array, test) {
    return array.some(test);
  } 
  console.log(every([1, 3, 5], n => n < 10));
  console.log(every([2, 4, 16], n => n < 10));
  console.log(every([], n => n < 10));