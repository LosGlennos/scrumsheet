import * as NeDBDataStore from 'nedb';
import * as path from 'path';
import { remote } from 'electron';

let instance = null;

export default class TeamsContext {
  static context;
  constructor() {
    if (!instance) {
      instance = this;

      this.context = new NeDBDataStore({
        filename: path.join(remote.app.getPath('appData'), 'scrumsheet/db/teams.db'),
        autoload: true
      });
    }

    return instance;
  }

  addTeam(name) {
    var team = {
      name: name
    };

    return new Promise(resolve => this.context.insert(team, (err) => {
      if (err) {
        throw err;
      }

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

  deleteTeam(id) {
    return new Promise(resolve => this.context.remove({_id: id}, {multi: false}, (err, data) => {
      if (err) {
        throw err;
      }
      resolve();
    }));
  }
};
