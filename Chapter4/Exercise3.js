function arrayToList(array) {
    let result = {};
    if (Array.isArray(array)) {
      let currListItem = result;
      for (let item of array) {
        let newListItem = {
            value: item,
            rest: null
        };
        if (typeof currListItem.rest === 'undefined') {
          result = newListItem;
        } else {
            currListItem.rest = newListItem;
        }
        currListItem = newListItem;
      }
    }
    return result;
  }
  function listToArray(list) {
    let result = [];
    if (typeof list === 'undefined' || list.value === undefined || list.rest === undefined) {
      return result;
    } else {
      result.push(list.value);
      while (list.hasOwnProperty('rest') && list.rest !== null) {
        list = list.rest;
        if (list.hasOwnProperty('value')) {
            result.push(list.value);
        }
      }
    }
    return result;
  }
  function prepend(element, list) {
    return {
      value: element,
      rest: list
    };
  }
  function nth(list, number) {
    return listToArray(list)[number];
  }
  function nthRecursive(list, number) {
    if (number === 0) {
      return list.value;
    } else if (list.rest === null) {
      return undefined;
    } else {
      return nthRecursive(list.rest, number-1);
    }
  }
  console.log(arrayToList());
  console.log(arrayToList([10, 20]));
  console.log(arrayToList([4, 3, 2, 1]));
  console.log(listToArray());
  console.log(listToArray(arrayToList([10, 20, 30])));
  console.log(listToArray({value: 10, rest: {xxx: 20, yyy: null}}));
  console.log(listToArray({value: 10, rest: {value: 20, yyy: null}}));
  console.log(listToArray({value: 10, rest: {xxx: 20, rest: null}}));
  console.log(prepend(10, prepend(20, null)));
  console.log(nth(arrayToList([10, 20, 30]), 1));
  console.log(nth(arrayToList([10, 20, 30]), 3));
  console.log(nth(arrayToList([10, 20, 30]), -2));
  console.log(nthRecursive(arrayToList([10, 20, 30]), 1));
  console.log(nthRecursive(arrayToList([10, 20, 30]), 3));
  console.log(nthRecursive(arrayToList([10, 20, 30]), -2));
  function arrayToListWithHints(array) {
    let result = {};
    if (Array.isArray(array)) {
      let list = null;
      array = array.reverse();
      for (let item of array) {
        list = {
          value: item,
          rest: list
        };
      }
      result = list;
    }
    return result;
  }
  function listToArrayWithHints(list) {
    let result = [];
    if (typeof list === 'undefined' || list.value === undefined || list.rest === undefined) {
      return result;
    } else {
      for (let node = list; node; node = node.rest) {
        if (node.hasOwnProperty('value')) {
          result.push(node.value);
        }
      }
    }
    return result;
  }
  console.log('\nWith Hints:');
  console.log(arrayToListWithHints());
  console.log(arrayToListWithHints([10, 20]));
  console.log(arrayToListWithHints([4, 3, 2, 1]));
  console.log(listToArrayWithHints());
  console.log(listToArrayWithHints(arrayToListWithHints([10, 20, 30])));
  console.log(listToArrayWithHints({value: 10, rest: {xxx: 20, yyy: null}}));
  console.log(listToArrayWithHints({value: 10, rest: {value: 20, yyy: null}}));
  console.log(listToArrayWithHints({value: 10, rest: {xxx: 20, rest: null}}));
  console.log(nth(arrayToListWithHints([10, 20, 30]), 1));
  console.log(nth(arrayToListWithHints([10, 20, 30]), 3));
  console.log(nth(arrayToListWithHints([10, 20, 30]), -2));