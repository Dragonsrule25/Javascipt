function logSetElements(value1, value2, set) {
    console.log('set[' + value1 + '] = ' + value2);
  }
  class PGroup {
    constructor(pg = new Set()) {
      this.group = pg;
    }
    add(item) {
      let g = PGroup.from(this.group);
      g.group.add(item);
      return g;
    }
    delete(item) {
      let g = PGroup.from(this.group);
      g.group.delete(item);
      return g;
    }
    has(item) {
      return this.group.has(item);
    }
    static empty() {
      return new PGroup();
    }
    static from(a) {
      let g = new PGroup();
      for (let item of a) {
        g.group.add(item);
      }
      return g;
    }
  }
  let a = PGroup.empty().add("a");
  let ab = a.add("b");
  let b = ab.delete("a");
  console.log(b.has("b"));
  console.log(a.has("b"));
  console.log(b.has("a"));
  a.group.forEach(logSetElements);
  ab.group.forEach(logSetElements);
  b.group.forEach(logSetElements);