
class EventManager {

    constructor() {
        if (!EventManager.instance) {
            const EventEmitter = require('events');
            EventManager.instance = new EventEmitter();
        }
    }

    getInstance() {
        return EventManager.instance;
    }

}

module.exports = new EventManager();