//const mathfn = require('./mathfn');
const mensaje = require('./message');
const { add, addAsync } = require('./mathfn')

//console.log(mathfn.add(1, 3));
console.log(mensaje);
console.log(add(1, 3));

addAsync(5, 6, (result) => {
    console.log("Suma : ", result);
})

function showResult(result) {
    console.log("Suma : ", result);
}
addAsync(5, 6, showResult)