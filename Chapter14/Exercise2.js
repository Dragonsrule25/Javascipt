function elementByTagName(tagName) {
    let allElements = document.getElementsByTagName(tagName);
    return Array.from(allElements);
  }
  let pElements = elementByTagName("p");
  console.log(pElements);   