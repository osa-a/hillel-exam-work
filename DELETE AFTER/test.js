//Дан объект: {name: 'John', 'surname': 'Johnson', 'age': '20'}. Напишите функцию которая записывает соответствующие значения в переменные name, surname и age. *

// const obj = {
//     name: 'John',
//     'surname': 'Johnson',
//     'age': '20'
// }

// function getInfo(obj, property) {
//    return obj[property];
// }

// let name = getInfo(obj, 'name');
// let surname= getInfo(obj, 'surname');
// let age = getInfo(obj, 'age');

// console.log(name+ ' ' + surname + ' ' + age);

//Дан массив: ['shoes', 'shirts', 'socks', 'sweaters']. 
//Напишите функцию которая записывает последний элемент этого массива в переменную elem1,
//а предпоследний - в переменную elem2, не обращаясь к свойству length для решения. *

// const arr = ['shoes', 'shirts', 'socks', 'sweaters'];

// function getElem(arr){
//     return arr.pop();
// }

// let elem1 = getElem(arr);
// let elem2 = getElem(arr);

//Дан массив с числами: [1, 2, 5, 8, 13]
//Напишите функцию которая находит сумму элементов этого массива, 
//без применения циклов: for (for..., for...in, for...of, forEach) и while (while... do, do...while). *

// const arr = [1, 2, 5, 8, 13];

// let temp = 0;
// let i = 0;
// let sum = calcSum(temp, arr, i);

// function calcSum(temp, arr, i) {
//     if (i < arr.length) {
//         temp = temp + arr[i];
//         i++;
//         return calcSum(temp, arr, i);
//     }
//     else {
//         return temp;
//     }
// }

//Напишите регулярное выражение для валидации email, 
//которое будет проверять строку на соблюдение данной структуры: 
//не менее одной буквы латиницей, любое количество цифр, 
//возможна точка и символ + , затем символ @ , 
//далее не менее одной буквы латиницей, 
//потом точка и не менее одной буквы латиницей, 
//сумма всех символов не должна превышать 60. *

// const mailPattern = /^[A-Z0-9a-z]+([_\.\-]?[a-zA-Z0-9]+)*@[A-Za-z]+.[A-Za-z]+$/i;



//TODO Дан массив [1, 'abc', [], [a], {}, {name: "ololo"}, null, 0].
//TODO Напишите функцию которая вернет новый массив без пустых значений
//TODO (пустой массив и пустой объект - тоже расцениваются как пустые значения)

let a = 1;
let arr = [1, 'abc', [], [a], {}, { name: "ololo" }, null, 0];
let res = cleanArray(arr);

function cleanArray(arr) {
    return arr.filter(elem => {
        if(elem && elem.constructor === Object) {
            return Object.keys(elem).length > 0;
        }
        if(elem && elem.constructor === Array) {
            return elem.length > 0;
        }
        elem !== null && elem !== 0
        return elem;
    });
}
console.log(res);