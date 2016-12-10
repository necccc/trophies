

/*

ProgressEvents.items = ['', '' ,'']
ProgressEvents.next()

*/


const EventEmitter = require('events');

class ProgressEvents extends EventEmitter {
    constructor () {
        super()

        this.__items = []
        this.__progress = 0
    }

    set items (items = []) {

        this.__items = [...items]

        this.emit('progress', this.getProgress())
    }

    add (item) {
        this.__items.push(item)
        this.emit('progress', this.getProgress())
    }

    next () {
        this.__progress += 1
        this.emit('progress', this.getProgress())
    }

    getProgress () {
        let title = this.__items[this.__progress] || ''
        let total = this.__items.length
        let current = this.__progress + 1

        if (current > total) current = total

        let percent = total > 0 ? Math.round((current / total) * 100) : 0;

        return {
            title,
            total,
            current,
            percent
        }
    }

    done () {
        this.__items = []
        this.__progress = 0
    }
}

const instance = new ProgressEvents()

module.exports = instance