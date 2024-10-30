function stringifyWithCircularReferences(obj, visited = new WeakSet()) {
    if (obj === null || typeof obj !== "object") {
      return String(obj);
    }
    if (visited.has(obj)) {
      return "[Circular]";
    }
    visited.add(obj);
    if (Array.isArray(obj)) {
      const elements = obj.map(element => stringifyWithCircularReferences(element, visited));
      return "[" + elements.join(", ") + "]";
    }
    const entries = Object.entries(obj).map(([key, value]) => {
      return `${JSON.stringify(key)}: ${stringifyWithCircularReferences(value, visited)}`;
    });
    return "{" + entries.join(", ") + "}";
  }
  const obj = {
    name: "Alice",
    age: 30,
    friends: []
  };
  obj.friends.push(obj);
  console.log(stringifyWithCircularReferences(obj));