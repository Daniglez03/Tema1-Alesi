/**
 * 
 * Para poder utilizar la palabra reservada import debemos:
 * En package.json establecer type:module
 * Cambiar las extenciones de los ficheros a .mjs
 * Podemos utilizar el formato:
 * 
 * import * as mathfn from './mathfn'
 * import { add } math from './mathfn'
 * 
 */

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

//exports.add =  (a, b) => a + b

const addAsync = (a, b, cb) => {
    setTimeout(() => {
        const result = a + b
        cb(result)
    }, 1000);
};

const week = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
];

function daysOfWeek() {
    return week;
}

module.exports = {
    add,
    sub,
    mul,
    div,
    addAsync,
    daysOfWeek
}