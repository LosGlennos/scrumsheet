import * as NeDBDataStore from 'nedb';
import * as path from 'path';
import { remote } from 'electron';

let instance = null;

export default class CapacityContext {
  static context;
  constructor() {
    if (!instance) {
      instance = this;

      this.context = new NeDBDataStore({
        filename: path.join(remote.app.getPath('appData'), 'scrumsheet/db/capacity.db'),
        autoload: true
      });
    }

    return instance;
  }

  saveCapacity(hours, sprintId, memberId, teamId) {
    var capacity = {
      hours: hours,
      memberId: memberId,
      sprintId: sprintId,
      teamId: teamId
    };

    return this.getCapacityForMember(sprintId, memberId).then((data) => {
      if (data) {
        return this.updateCapacity(data._id, capacity);
      } else {
        return new Promise(resolve => this.context.insert(capacity, (err) => {
          if (err) {
            throw err;
          }

          resolve();
        }));
      }
    });
  }

  getCapacityByTeamId(teamId) {
    return new Promise(resolve => this.context.find({teamId: teamId}, (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    }));
  }

  getCapacityForMember(sprintId, memberId) {
    return new Promise(resolve => this.context.findOne({sprintId: sprintId, memberId: memberId}, (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    }));
  }

  updateCapacity(id, capacity) {
    return new Promise(resolve => this.context.update({_id: id}, capacity, (err, data) => {
      if (err) {
        throw err;
      }

      resolve();
    }));
  }
};
