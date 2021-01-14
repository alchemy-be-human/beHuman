const pool = require('../utils/pool');


module.exports = class Link {
  id;
  url;

  constructor(row) {
    this.id = row.id;
    this.url = row.url;
  }
}