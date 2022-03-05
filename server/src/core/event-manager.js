const EventEmitter = require("events");

class EventManager {
  constructor() {
    if (!EventManager.instance) {
      EventManager.instance = new EventEmitter();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getInstance() {
    return EventManager.instance;
  }
}

module.exports = new EventManager();
