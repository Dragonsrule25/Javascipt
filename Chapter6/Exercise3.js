class Group {
    constructor() {
      this.group = [];
    }
    add(item) {
      if (!this.group.includes(item)) {
        this.group.push(item);
      }
    }
    delete(item) {
      let index = this.group.indexOf(item);
      if (index !== -1) {
        this.group.splice(index, 1);
      }
    }
    has(item) {
      return this.group.includes(item);
    }
    static from(a) {
      let g = new Group();
      for (let item of a) {
        g.add(item);
      }
      return g;
    }
    [Symbol.iterator]() {
      return new GroupIterator(this);
    };
  } 
  class GroupIterator {
    constructor(o) {
      this.i = 0;
      this.group = o.group;
    }
    next() {
      if (this.i == this.group.length || this.i > 10) return {done: true};
  
      let value = this.group[this.i];
      this.i++;
      return {value, done: false};
    }
  }
  for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }