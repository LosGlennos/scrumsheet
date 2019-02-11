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
        filename: path.join(
          remote.app.getPath('appData'),
          '/scrumsheet/db/velocity.db'
        ),
        autoload: true
      });
    }

    return instance;
  }

  getVelocityByTeamId(teamId) {
    return new Promise(resolve =>
      this.context.find({ teamId: teamId }, (err, data) => {
        if (err) {
          throw err;
        }

        resolve(data);
      })
    );
  }

  saveAllocatedEffort(allocatedEffort, sprintId, teamId) {
    var effort = {
      allocatedEffort: allocatedEffort,
      actualEffort: null,
      sprintId: sprintId,
      teamId: teamId
    };

    return this.getVelocityForSprint(sprintId).then(data => {
      if (data) {
        return this.updateEffort(data._id, effort);
      } else {
        return this.insertData(effort);
      }
    });
  }

  saveActualEffort(actualEffort, sprintId, teamId) {
    var effort = {
      allocatedEffort: null,
      actualEffort: actualEffort,
      sprintId: sprintId,
      teamId: teamId
    };

    return this.getVelocityForSprint(sprintId).then(data => {
      if (data) {
        return this.updateEffort(data._id, effort);
      } else {
        return this.insertData(effort);
      }
    });
  }

  insertData(effort) {
    return new Promise(resolve =>
      this.context.insert(effort, err => {
        if (err) {
          throw err;
        }

        resolve();
      })
    );
  }

  updateEffort(id, effort) {
    this.getVelocityForSprint(effort.sprintId).then(data => {
      let effortToSave;
      if (effort.actualEffort === null) {
        effortToSave = {
          _id: data._id,
          allocatedEffort: effort.allocatedEffort === '' ? null : effort.allocatedEffort,
          actualEffort: data.actualEffort,
          sprintId: effort.sprintId,
          teamId: effort.teamId
        };
      } else if (effort.allocatedEffort === null) {
        effortToSave = {
          _id: data._id,
          allocatedEffort: data.allocatedEffort,
          actualEffort: effort.actualEffort === '' ? null : effort.actualEffort,
          sprintId: effort.sprintId,
          teamId: effort.teamId
        };
      } else {
        throw Error('Both actual and allocated has been updated');
      }

      return new Promise(resolve =>
        this.context.update({ _id: id }, effortToSave, (err, data) => {
          if (err) {
            throw err;
          }

          resolve();
        })
      );
    });
  }

  getVelocityForSprint(sprintId) {
    return new Promise(resolve =>
      this.context.findOne({ sprintId: sprintId }, (err, sprint) => {
        if (err) {
          throw err;
        }

        resolve(sprint);
      })
    );
  }
}
