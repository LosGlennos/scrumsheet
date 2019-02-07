import * as NeDBDataStore from 'nedb';
import * as path from 'path';
import { remote } from 'electron';

let instance = null;

export default class {
  static context;
  constructor() {
    if (!instance) {
      instance = this;

      this.context = new NeDBDataStore({
        filename: path.join(remote.app.getPath('appData'), '/scrumsheet/db/members.db'),
        autoload: true
      });
    }

    return instance;
  }

  addMember(name, teamId) {
    var member = {
      name: name,
      teamId: teamId
    };

    return new Promise(resolve => this.context.insert(member, (err) => {
      if (err) {
        throw err;
      }

      resolve();
    }));
  }

  getMembers(teamId) {
    return new Promise(resolve => this.context.find({ teamId: teamId }, (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data);
    }));
  }

  deleteMember(id) {
    return new Promise(resolve => this.context.remove({ _id: id }, { multi: false }, (err, data) => {
      if (err) {
        throw err;
      }
      resolve();
    }));
  }
};
