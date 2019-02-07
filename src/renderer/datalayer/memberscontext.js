import * as NeDBDataStore from 'nedb';
import * as path from 'path';
import { remote } from 'electron';

export default class {
  static context = null;
  constructor() {
    if (this.context) {
      return this.context;
    }

    this.context = new NeDBDataStore({
      filename: path.join(remote.app.getPath('appData'), '/scrumsheet/db/members.db'),
      autoload: true
    });
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
    return new Promise(resolve => this.context.find({teamId: teamId}, (err, data) => {
      if (err) {
        throw err;
      }
      resolve(data);
    }));
  }

  deleteMember(id) {
    return new Promise(resolve => this.context.remove({_id: id}, {multi: false}, (err, data) => {
      if (err) {
        throw err;
      }
      resolve();
    }));
  }
};
