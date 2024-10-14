function MultiplicatorUnitFailure() {}
function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}
function reliableMultiply1(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    } else {
      throw e;
    }
  }
}
function reliableMultiply2(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        continue;
      } else
        throw e;
    }
  }
}
console.log(reliableMultiply1(8, 8));
console.log(reliableMultiply1(6, 6));
function withBoxUnlocked(body) {
  box.unlock();
  try {
    body();
  }
  catch (e) {
  } finally {
    box.lock();
  } 
}
function withBoxUnlocked(body) {
  var state = box.locked;
  box.unlock();
  try {
    body();
  } catch (e) {
  } finally {
    if (state) {
      box.lock();
    }
  } 
}
withBoxUnlocked(function() {
  box.content.push("gold piece");
});
withBoxUnlocked(function() {
  throw new Error("Pirates on the horizon! Abort!");
});
console.log(box.locked);