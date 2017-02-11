export default class DB {
  constructor() {
    const db = window.localStorage;
    this.dbGet = (variable) => db.getItem(variable);
    this.dbSet = (variable, value) => db.setItem(variable, value);
  }

  get (variable) {
    return this.dbGet(variable);
  }

  getJSON (variable) {
    return JSON.parse(this.dbGet(variable));
  }

  set (variable, value) {
    return this.dbSet(variable, value);
  }

  setJSON (variable, value) {
    return this.dbSet(variable, JSON.stringify(value));
  }
}
