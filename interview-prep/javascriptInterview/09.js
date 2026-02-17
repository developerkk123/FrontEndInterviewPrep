const a = [1];
const b = a;
b.push(2);
console.log(a, b);

/**
 * b pointing to a so changing in b reflects in a as well
 */