const hackrf = require('hackrf');
const initialState = () => ({
    radio: {
        isConnected: false
    }
});

let device = null;

let stateObservers = [];

let state = initialState();

function changeState() {
    let args = Array.prototype.slice.call(arguments);
    let keys = args;
    let value = args.pop();
    let set = (keys, obj, val) => {
        if (keys.length === 1) {
            obj[keys[0]] = val;
            return true;
        } else {
            return set(keys.slice(1), obj[keys[0]], val);
        }
    }
    set(keys, state, value);
    stateObservers.forEach(o => o(state));
}

function observe(callback) {
    stateObservers.push(callback);
    callback(state); // initial call
}


function statusLoop() {
    if (!device) {
        let hrf = hackrf();
        if (hrf.length === 0) {
            changeState('radio', 'isConnected', false);
        } else if (!state.radio.isConnected) {
            changeState('radio', 'isConnected', true);
            device = hrf.open(0);
            changeState('radio', 'version', device.getVersion());
        }
    }
    setTimeout(statusLoop, 500);
}

statusLoop(); 

//console.log(hrf);
//window.radio = hrf.open(0);

module.exports = {
    observe: observe
};