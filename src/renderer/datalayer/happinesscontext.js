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
          '/scrumsheet/db/happiness.db'
        ),
        autoload: true
      });
    }

    return instance;
  }

  getHappinessByTeamId(teamId) {
    return new Promise(resolve =>
      this.context.find({ teamId: teamId }, (err, data) => {
        if (err) {
          throw err;
        }

        resolve(data);
      })
    );
  }

  saveHappiness(rating, sprintId, teamId) {
    var happiness = {
      rating: rating,
      sprintId: sprintId,
      teamId: teamId
    };

    return this.getHappinessForSprint(sprintId).then(data => {
      if (data) {
        return this.updateEffort(data._id, happiness);
      } else {
        return this.insertData(happiness);
      }
    });
  }

  insertData(happiness) {
    return new Promise(resolve =>
      this.context.insert(happiness, err => {
        if (err) {
          throw err;
        }

        resolve();
      })
    );
  }

  updateEffort(id, happiness) {
    this.getHappinessForSprint(happiness.sprintId).then(data => {
      var happinessToSave = {
        _id: data._id,
        rating: happiness.rating === '' ? null : happiness.rating,
        sprintId: happiness.sprintId,
        teamId: happiness.teamId
      };

      return new Promise(resolve =>
        this.context.update({ _id: id }, happinessToSave, (err, data) => {
          if (err) {
            throw err;
          }

          resolve();
        })
      );
    });
  }

  getHappinessForSprint(sprintId) {
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
