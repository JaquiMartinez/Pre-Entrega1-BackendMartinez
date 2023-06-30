// let product = {
//     code: 'Error',
//     title: 'Titulo',
//     description: 'Descripción',
//     price: 15,
//     thumbnail: 'Sin imagen',
//     stock: 500,
// };

// const checkData = product.filter(product => product === 'Error');
// console.log(checkData);

/* ----------------------------- spread operator ---------------------------- */

const array = [ 1,2,3,5,6,];
console.log(Math.min(...array));

const array2 = [ ...array, 10, 55, 210 ]

console.log(array2);

const obj1 = {
    a: 1,
    b: 2,
    c: 3
}
console.log(obj1);
const obj3 = {
    b: 99
}
console.log(obj3);

const obj2 = {
    ...obj1,
    ...obj3,
    d: 4
}

console.log(obj2);

/* ------------------------------ rest operator ----------------------------- */

const myFunc = (a, b, ...otherParamethers) => {
    console.log(a);
    console.log(b);
    console.log(otherParamethers);
}
console.log('ejecutando function con operador rest:::');
myFunc(1, 2, 3, 4, 5, 'a', [1,2,3,4,5,5], {a: 1})