/* eslint-disable linebreak-style */
/* eslint-disable indent */

function Walker(name = 'John Doe', state = 'dead') {
    this.name = name;
    this.state = state;
    Object.defineProperty(this, 'firstName', {
        writeable: true,
        enumerable: true,
        configurable: true,
        get() {
            return this.name.split(' ')[0];
        },
        set(value) {
            this.name = `${value} ${this.name.split(' ')[1]}`;
        },
    });
    Object.defineProperty(this, 'lastName', {
        writeable: true,
        enumerable: true,
        configurable: true,
        get() {
            return this.name.split(' ')[1];
        },
        set(value) {
            this.name = `${this.name.split(' ')[0]} ${value}`;
        },
    });
}

Walker.prototype = {
    walk(speedInMph = 10) {
        return `${this.name} the ${this.state} walks with ${speedInMph} mph!`;
    },
    eat(foodName = 'meat') {
        return `${this.name} the ${this.state} eats ${foodName}!`;
    },
    speak(sound = 'grrrrrr') {
        return `${this.name} the ${this.state} says ${sound}!`;
    },
};

export default Walker;
