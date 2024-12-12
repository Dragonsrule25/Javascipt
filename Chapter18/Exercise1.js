function findBestMatch(accepts, available) {
    for (let i = 0; i < accepts.length; i++) {
      for (let j = 0; j < available.length; j++) {
        if (accepts[i] === available[j]) {
          return accepts[i];  
        }
      }
    }
    for (let i = 0; i < accepts.length; i++) {
      if (accepts[i] === '*/*') {
        return available[0]; 
      }
    }
    return null; 
  }
  let accepts = ['application/json', 'text/html'];
  let available = ['text/html', 'application/json', 'image/png'];
  console.log(findBestMatch(accepts, available));   