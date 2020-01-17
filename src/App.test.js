// const sum = require('./sum');

function sum(n1, n2) {
  return Number(n1) + Number(n2);
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
