function deepEqual(a, b) {
    if (a === b) {
      return true;
    } else if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
      let keys = Object.keys(a).concat(Object.keys(b));
      keys = keys.filter(
        function (value, index, self) { 
          return self.indexOf(value) === index;
        }
      );
      for (p of keys) {
        if (typeof a[p] === 'object' && typeof b[p] === 'object') {
          if (deepEqual(a[p], b[p]) === false) {
            return false;
          }
        } else if (a[p] !== b[p]) {
          return false;
        }
      }
      return true;
    } else {
     return false; 
    }
  }
  let obj = {here: {is: "an"}, object: 2};
  console.log(deepEqual(obj, obj));
  console.log(deepEqual(obj, {here: 1, object: 2}));
  console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
  console.log(deepEqual(obj, {here: {is: "an"}, object: 0}));
  console.log(deepEqual(obj, {here: {is: "another"}, object: 2}));
  console.log(deepEqual(obj, {here: {isnt: "an"}, object: 2}));
  console.log(deepEqual(obj, {here: {is: "an", deep: {poop: null, value: -1}}, object: 2}));
  let json = '{"candidate": "Jon Urry", "job": "Junior Full-Stack JavaScript Developer", "portfolio": "jon.urry.me", "skills": ["HTML", "CSS", "JavaScript", "ES6", "Node", "React", "Vue", "Git", "XML", "UX", "Responsive Design", "Design Patterns", "TDD", "Chrome Inspector", "Agile", "SEO", "Analytics", "WordPress", "Databases"], "contact": [{"email": "mailto:jon@urry.me"}, {"github": "github.com/jonurry"}, {"linkedin": "linkedin.com/in/jonurry"}, {"mobile": "tel:+44-7986-371-299"}, {"skype": "skype:jonurry"}, {"twitter": "twitter.com/jonurry"}]}';
  let json2 = '{"candidate": "Jon Urry", "job": "Junior Full-Stack JavaScript Developer", "portfolio": "jon.urry.me", "skills": ["HTML", "CSS", "JavaScript", "ES6", "Node", "React", "Vue", "Git", "XML", "UX", "Responsive Design", "Design Patterns", "TDD", "Chrome Inspector", "Agile", "SEO", "Analytics", "WordPress", "Databases2"], "contact": [{"email": "mailto:jon@urry.me"}, {"github": "github.com/jonurry"}, {"linkedin": "linkedin.com/in/jonurry"}, {"mobile": "tel:+44-7986-371-299"}, {"skype": "skype:jonurry"}, {"twitter2": "twitter.com/jonurry2"}]}';
  let jsonObj = JSON.parse(json);
  let jsonObjCopy = JSON.parse(JSON.stringify(jsonObj));
  let jsonObj2 = JSON.parse(json2);
  console.log(jsonObj);
  console.log(deepEqual(jsonObj, jsonObj));
  console.log(deepEqual(jsonObj, jsonObjCopy));
  console.log(deepEqual(jsonObj, jsonObj2));
  console.log(deepEqual(null, obj));
  console.log(deepEqual(obj, null));
  console.log(deepEqual(null, null));