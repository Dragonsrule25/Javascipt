function min(a,b) {
    var result = b;
    if (a < b)
      result = a;
    return result;
  }
  console.log(min(0, 10));
  console.log(min(0, -10));