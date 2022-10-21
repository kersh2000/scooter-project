const User = require('../src/User')

describe(`Tests the 'User' class.`, () => {
  const user = new User(`joeBiden2`, `password`, 20);
  test(`sets 'username'`, () => {
    expect(user.username).toBe(`joeBiden2`);
  });
  test(`sets 'password'`, () => {
    expect(user.password).toBe(`password`);
  });
  test(`sets 'age'`, () => {
    expect(user.age).toBe(20);
  });
});