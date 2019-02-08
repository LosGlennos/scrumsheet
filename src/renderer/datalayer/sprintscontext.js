import * as NeDBDataStore from 'nedb';
import * as path from 'path';
import { remote } from 'electron';

let instance = null;

export default class SprintsContext {
  static context;
  constructor() {
    if (!instance) {
      instance = this;

      this.context = new NeDBDataStore({
        filename: path.join(remote.app.getPath('appData'), 'scrumsheet/db/sprints.db'),
        autoload: true
      });
    }

    return instance;
  }

  addSprint(name, startDate, endDate, teamId) {
    var sprint = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      teamId: teamId
    };

    return new Promise(resolve => this.context.insert(sprint, (err) => {
      if (err) {
        throw err;
      }

      resolve();
    }));
  }

  getSprints(teamId) {
    return new Promise(resolve => this.context.find({teamId: teamId}, (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data);
    }));
  }

  deleteSprint(id) {
    return new Promise(resolve => this.context.remove({_id: id}, {multi: false}, (err, data) => {
      if (err) {
        throw err;
      }
      resolve();
    }));
  }
};
