class Scooter{

  constructor(station, user) {
    
    this.station = station;
    this.user = user;
    this.serial = Math.ceil(Math.random() * 1000);
    this.charge = Math.ceil(Math.random() * 100);
    this.isBroken = false;
    this.docked = true;

  }

  rent() {
    if (!this.isBroken){
      if (this.charge > 20) {
        this.docked = false;
        const msg = `Enjoy the ride!`;
        console.log(msg);
        return msg;
      } else {
        throw (`Scooter low on battery, please charge.`);
      }
    } else {
      throw (`Scooter is broken, please send a repair request.`);
    }
  }

  dock(station){
    if (station === undefined) {
      throw (`Docking station required!`);
    }
    this.station = station;
    this.docked = true;
    this.user = ``;
  }

  async recharge() {
    console.log('Starting charge');
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100
    console.log('Charge complete');   
  }

  async requestRepair() {
    console.log(`Starting repair`);
    await new Promise(resolve => setTimeout(resolve, 2000)); //wait 2 seconds
    this.isBroken = false;
    console.log(`Repair complete`);
  }
}

module.exports = Scooter
