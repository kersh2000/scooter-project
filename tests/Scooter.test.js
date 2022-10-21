const Scooter = require('../src/Scooter')
const User = require('../src/User')

//Property tests
describe(`Test for Scooter properties.`, () => {

  const user = new User(`heybeans`, `password`, 20);
  const scooter = new Scooter(`London`, user);

  test(`Check 'station' property`, () => {
    expect(scooter.station).toBe(`London`);
  });
  test(`Check 'user' property`, () => {
    expect(scooter.user).toEqual(user);
  });
  test(`Check 'serial' property is a number`, () => {
    expect(typeof(scooter.serial)).toBe(`number`);
  });
  test(`Check 'charge' property is a number`, () => {
    expect(typeof(scooter.charge)).toBe(`number`);
  });
  test(`Check 'isBroken' property is false`, () => {
    expect(scooter.isBroken).toBeFalsy();
  });
  test(`Check 'docked' property is false`, () => {
    expect(scooter.docked).toBeTruthy();
  });

});

//Method tests
describe(`Tests the 'rent()' method.`, () => {

  const user = new User();
  const scooter = new Scooter(`London`, user);

  test(`console's "Enjoy the ride!" when 'isBroken' is false and charge is above 20`, () => {
    scooter.charge = 25;
    expect(scooter.rent()).toBe(`Enjoy the ride!`);
  });

  test(`sets 'docked' to false when 'isBroken' is false and charge is above 20`, () => {
    expect(scooter.docked).toBeFalsy();
  });

  test(`throws error message “Scooter low on battery, please charge.” if charge is less than or equal to 20`, () => {
    const throwErr = () => {
      scooter.charge = 18;
      scooter.rent();
    }
    expect(throwErr).toThrow(`Scooter low on battery, please charge.`);
  });

  test(`throws error message “Scooter is broken, please send a repair request.” when scooter is broken`, () => {
    const throwErr = () => {
      scooter.charge = 40;
      scooter.isBroken = true;
      scooter.rent();
    }
    expect(throwErr).toThrow(`Scooter is broken, please send a repair request.`);
  });

})

describe(`Tests the 'dock()'.`, () => {

  const user = new User();
  const scooter = new Scooter(`London`, user);

  test(`updates 'location' to the argument passed`, () => {
    scooter.dock('Reading');
    expect(scooter.station).toBe(`Reading`);
  });

  test(`throws error message "Docking station required!" when no argument is passed`, () => {
    const throwErr = () => {
      scooter.dock();
    }
    expect(throwErr).toThrow(`Docking station required!`);
  });

  scooter.rent();
  scooter.dock('Southampton');

  test(`sets 'docked' back to true`, () => {
    expect(scooter.docked).toBeTruthy();
  });

  test(`sets 'user' to a blank string`, () => {
    expect(scooter.user).toBe(``);
  });
});

describe(`Tests the 'recharge()' function.`, () => {
  let diff1;
  test(`charges scooter`, async () => {
    const start = Date.now(); //start timer
    const scooter = new Scooter();
    await scooter.recharge(); // we need to wait for the charge!
    const end = Date.now(); //stop timer
    diff1 = Math.round((end - start) / 1000);  //find time taken to complete
    expect(scooter.charge).toBe(100);
  });
  test(`takes 2 seconds for scooter to charge`, () => {
    expect(diff1).toBe(2);
  });
});

describe(`Tests the 'requestRepair()' function.`, () => {
  let diff2;
  test(`repairs scooter`, async () => {
    const start = Date.now(); //start timer
    const scooter = new Scooter();
    await scooter.requestRepair(); // we need to wait for the charge!
    const end = Date.now(); //stop timer
    diff2 = Math.round((end - start) / 1000); //find time taken to complete
    expect(scooter.isBroken).toBeFalsy();
  });
  test(`takes 2 seconds for scooter to repair`, () => {
    expect(diff2).toBe(2);
  });
});