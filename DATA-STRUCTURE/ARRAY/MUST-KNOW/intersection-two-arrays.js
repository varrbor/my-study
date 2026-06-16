// Intersection of Two Arrays

const a = [1,2,3]
const b = [2,3,4,5]
const intersection = (array1, array2) => array1.filter(value => array2.includes(value));

console.log(intersection(a, b))
