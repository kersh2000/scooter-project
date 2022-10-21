const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here

// register user
describe(`Tests the 'register' function.`, () => {

  const scooterApp = new ScooterApp();

  test(`recognises user already exists`, () => {
    const user = new User(`bradz2`, `thisMyPassword`, 35);
    scooterApp.register(user);
    expect(scooterApp.register(user)).toBe(`already registered!`);
  });

  test(`recognises user is too old`, () => {
    const user = new User(`bradz1`, `password`, 17);
    expect(scooterApp.register(user)).toBe(`too young to register!`);
  });

  let output;
  test(`adds new user`, () => {
    const user = new User(`bradz1`, `password`, 20);
    output = scooterApp.register(user);
    expect(scooterApp.registeredUsers[`bradz1`]).toEqual({
        password: `password`,
        age: 20,
        loggedIn: false,
        accountChange: 0
    });
  });

  test(`console's the user has been registered`, () => {
    expect(output).toBe(`user has been registered`);
  })
});

// log in
describe(`Tests the 'logIn' function.`, () => {
  const scooterApp = new ScooterApp();
  const user = new User(`Sam`, `password1`, 30);
  scooterApp.register(user);

  test(`throws error if log in details are wrong`, () => {
    const throwErr = () => {
      scooterApp.logIn(`a`, `b`);
    }
    expect(throwErr).toThrow(`Username or password is incorrect.`);
  });

  const msg = scooterApp.logIn('Sam', 'password1');
  test(`assigns 'loggedIn' to true on user log in`, () => {
    expect(scooterApp.registeredUsers[`Sam`].loggedIn).toBeTruthy();
  });

  test(`console's user has logged in successfully`, () => {
    expect(msg).toBe(`User has logged in successfully.`);
  });
});

//add scooter
const scooterApp = new ScooterApp();
const user = new User(`yo`, `pass`, 27);
const scooter = new Scooter(`Queens`, user);

describe(`Tests the 'addScooter' function.`, () => {

  scooter.dock(`Bronx`);

  test(`can add scooter`, () => {
    scooterApp.addScooter(`Bronx`, scooter);
    expect(scooterApp.stations[`Bronx`][0]).toEqual(scooter);
  });

  test(`throws error if location is not recognised`, () => {
    const throwErr = () => {
      scooterApp.addScooter(`London`, scooter);
    }
    expect(throwErr).toThrow(`London is not a station.`);
  });
});

// remove scooter
describe(`Tests the 'removeScooter' function.`, () => {

  test(`console's scooter has been removed`, () => {
    expect(scooterApp.removeScooter(scooter)).toBe(`The scooter has successfully been removed.`);
  });

  test(`scooter has been successfully removed`, () => {
    expect(scooterApp.stations[`Bronx`][0]).toEqual(undefined);
  });

  test(`throws error when scooter's serial doesn't match`, () => {
    scooterApp.addScooter(`Bronx`, scooter);
    const scooter2 = new Scooter(`Queens`, user);
    const throwErr = () => {
      scooterApp.removeScooter(scooter2);
    }
    expect(throwErr).toThrow(`Scooter has not previously been added.`);
  });
});