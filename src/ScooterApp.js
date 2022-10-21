const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {

  static scooterStations = [];

  constructor () {

    this.stations = {Manhattan: [], Brooklyn: [], Queens: [], Bronx: [], StatenIsland: []};
    this.registeredUsers = {};
    ScooterApp.scooterStations.push(this);

  }

  register(user) {
    if (this.registeredUsers[user.username] !== undefined) {
      const msg = `already registered!`;
      console.log(msg);
      return msg;
    } else if (user.age <= 18){
      const msg = `too young to register!`;
      console.log(msg);
      return msg;
    } else {
      this.registeredUsers[user.username] = {
        password: user.password,
        age: user.age,
        loggedIn: false,
        accountChange: 0
      };
      const msg = `user has been registered`;
      console.log(msg);
      return msg;
    }
  }

  logIn(username, password){
    if (this.registeredUsers[username] !== undefined){
      if (this.registeredUsers[username].password === password) {
        this.registeredUsers[username].loggedIn = true;
        const msg = `User has logged in successfully.`;
        console.log(msg);
        return msg;
      }
    }
    throw(`Username or password is incorrect.`);
  }

  addScooter(location, scooter) {
    if (this.stations[location] !== undefined) {
      this.stations[location].push(scooter);
      scooter.station = location;
    } else {
      throw(`${location} is not a station.`);
    }
  }

  removeScooter(scooterToRemove) {
    const scooters = this.stations[scooterToRemove.station];
    let found = false;
    scooters.find((value, index) => {
      if (value.serial === scooterToRemove.serial) {
        this.stations[scooterToRemove.station].splice(index, 1);
        console.log(`The scooter has successfully been removed.`);
        found = true;
        return true;
      }
    });
    console.log(found);
    if (found) {
      return `The scooter has successfully been removed.`;
    } else {
      throw(`Scooter has not previously been added.`);
    }
  }
}

module.exports = ScooterApp
