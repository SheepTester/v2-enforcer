const fs = require("fs");
const fsPromisify = require("./fs-promisifier.js");

let data,
updateTimeout = null;

function updateData() {
  if (updateTimeout) clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => {
    fsPromisify(fs.writeFile, JSON.stringify(data));
  }, 500);
}

fsPromisify(fs.readFile, "../data.json", "utf8")
  .then(json => data = JSON.parse(json))
  .catch(() => {
    data = {
      users: {},
      proposals: [],
      vetoes: []
    };
    updateData();
  });

module.exports = {
  get(user, save = false) {
    if (!data.users[user.id]) {
      data.users[user.id] = {
        rep: false,
        leader: false,
        enforcer: false,
        judge: false,
        ls: 0,
        rs: 0,
        imprisoned: false,
        tag: user.tag
      };
    }
    if (save) updateData();
    return data.users[user.id];
  },
  newprop() {
    updateData();
  }
};
