import * as NeDBDataStore from 'nedb';
import * as path from 'path';

export class TeamsContext {
  static context = null;
  constructor() {
    if (this.context) {
      return this.context;
    }

    this.context = new NeDBDataStore({
      filename: path.join(path.resolve(__dirname), '/teamscontext.db'),
      autoload: true
    });
  }

  addTeam(name) {
    var team = {
      name: name
    };

    return new Promise(resolve => this.context.insert(team, (err) => {
      console.log(err);
      resolve();
    }));
  }

  getTeams() {
    return new Promise(resolve => this.context.find({}, (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data);
    }));
  }
};
