function reverseArray(array) {
    result = [];
    for (let item of array) {
      result.unshift(item);
    }
    return result;
  }
  function reverseArrayInPlace(array) {
    let len = array.length;
    for (let i = 0; i < Math.floor(len/2); i++) {
      console.log(i, len-i-1, array[i], array[len-i-1], array);
      let swap = array[i];
      array[i] = array[len-i-1];
      array[len-i-1] = swap;
    }
    return array;
  }
  console.log(reverseArray(["A", "B", "C"]));
  let arrayValue = [1, 2, 3, 4, 5];
  reverseArrayInPlace(arrayValue);
  console.log(arrayValue);
  let arrayValue2 = [1, 2, 3, 4];
  reverseArrayInPlace(arrayValue2);
  console.log(arrayValue2);