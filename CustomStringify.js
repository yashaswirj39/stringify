function customStrigify(data) {
    if(checkTypeOfObject(data) === "array") {
        return '"' + arrayStringify(data) + '"';
    }
    else if (checkTypeOfObject(data) === "object") {
            let objStringifyRes = '"{';
            objStringifyRes += objectStringify(data);
            return objStringifyRes += '}"';
    }
}

function objectStringify(obj) {
    let stringifiedStringObj = '';
    if (!Object.keys(obj).length) {
        return stringifiedStringObj;
    }
    Object.keys(obj).map(key => {
        if (obj[key] instanceof Number || typeof obj[key] === "number" || !obj[key]) {
            stringifiedStringObj += '"' + key + '":' + obj[key] + ",";
        } else if (obj[key] instanceof String || typeof obj[key] === "string") {
            stringifiedStringObj += '"' + key + '":' + '"' + obj[key] + '"' + ",";
        } else if (obj[key] instanceof Boolean || typeof obj[key] === "boolean") {
            stringifiedStringObj += '"' + key + '":' + obj[key] + ",";
         } //else if (Array.isArray(obj[key])) {
        //     stringifiedStringObj += '"' + key + '":' + arrayStringify(obj[key]);
        // } else if (obj instanceof Object) {
        //     stringifiedStringObj += '"' + key + '":';
        //     stringifiedStringObj += objectStringify(obj[key]) + ",";
        // }
    });
    //stringifiedStringObj = stringifiedStringObj.replace(/(, })/gm, '}');
    //stringifiedStringObj = stringifiedStringObj.replace(/(,})/gm, '}');
    return stringifiedStringObj;
}

function checkTypeOfObject(type) {
    if(Array.isArray(type)) {
        return "array";
    }
    else if (type instanceof Object){
        return "object";
    }
    return normalStringify(type);
}
function arrayStringify(arrObj) {
    let stringifiedString = "";
    stringifiedString += '[';
    arrObj.map(x => {
        if (Number.isNaN(x) || x === Infinity || !x) { 
            stringifiedString += null + ",";
        } else if (typeof x === 'number' || x instanceof Number ||
            typeof x === 'boolean' || x instanceof Boolean) {
            stringifiedString += x + ",";
        } else if (typeof x === 'string' || x instanceof String) {
            if(x.length > 0) {
            stringifiedString += '"' + x + '"' + ",";
            } else {
                stringifiedString += '""' + ",";
            }
        } else if (typeof x === 'undefined' || typeof x === 'symbol' ||
            typeof x === 'function') {
            stringifiedString += null + ",";
        } else if (x instanceof Set || x instanceof Map || x instanceof WeakSet || 
            x instanceof WeakMap) {
                stringifiedString += "{}" + ",";
        } else if (x instanceof Uint8Array || x instanceof Uint8ClampedArray || 
                            x instanceof Uint16Array || x instanceof Uint32Array) {
            stringifiedString += '{';    
            x.map((y,index) => {
                stringifiedString += '"' + index + '":' + y + ","; 
            });
            stringifiedString += "},";
        } else if (x instanceof Object && !Array.isArray(x)) {
            stringifiedString += objectStringify(x) + ",";
        } else if (Array.isArray(x)) {
            stringifiedString += arrayStringify(x) + ",";
        }
    });
    stringifiedString += '],';
    stringifiedString = stringifiedString.replace(/(,})/gm, '}');
    stringifiedString = stringifiedString.replace(/(,])/gm, ']');
    return stringifiedString;
}
function normalStringify(simplifiedData) {
    var stringifiedStringsimple = '""';
    var normalStringifiedsimple = '"';
    if (typeof simplifiedData === "string") {
        return stringifiedStringsimple += simplifiedData + '""';
    } else if (typeof simplifiedData === "number") {
        return normalStringifiedsimple += simplifiedData + '"';
    } else if (typeof simplifiedData ==="boolean") {
        return normalStringifiedsimple += simplifiedData + '"';
    }
}

console.log(customStrigify({b:[1,{},[1,2,{},[]]]}));

// console.log(customStrigify({
//     a: [{
//         Name1: "John", Age1: 10, Address1: { Street: "Bakerloo", City: "London" },
//         employees: [{ firstName: "John", lastName: "Doe" }, { firstName: "Anna", lastName: "Smith" },
//         { firstName: "Peter", lastName: "Jones" }], Name2: "Mayer", Age2: 20, Address2:
//             { Country: "England" }, Employed: false, status: null
//     }]
// }));
var arr_one = [new Number(1), new String('we'), new Boolean(false), Symbol(''), undefined, "", [1, 2, 3]];
var arr_two = [new Number(1), new String('we'), new Boolean(false), Symbol(''), undefined, ""];
var arr_three = [1, "we", false, Symbol(''), undefined, ""];
var arr_four = [1, 'false', false]
var arr_five = [NaN, null, Infinity];
//console.log(customStrigify({ x: 5, y: 6 }));
//console.log(customStrigify({ x: 5 }));

//console.log(customStrigify(false));

//console.log(customStrigify({ x: [10, undefined, function () { }, Symbol('')] }));

        //, status: null
/** ======================================|
 *                                        |
 * Testing console's for array stringify  |
 */                                    // |
//========================================|

// 1. console.log(customStrigify(arr_one));
// 2. console.log(customStrigify(arr_three));
// 3. console.log(customStrigify(arr_five));
/**
 * 4. String-keyed array elements are not enumerable and make no sense in JSON
 * let a = ['foo', 'bar'];
 * a['baz'] = 'quux';
 * console.log(customStrigify(a));
 */

/** var arr_six = [new Set([1]), new Map([[1, 2]]), new WeakSet([{ a: 1 }]), new WeakMap([[{ a: 1 }, 2]])];
    console.log(customStrigify(arr_six));*/

/**
 * var arr_seven = [new Uint8Array([1]), new Uint8ClampedArray([1]), new Uint16Array([1]), new Uint32Array([1])];
 * console.log(customStrigify(arr_seven));
 */

/**
 * var arr_eight = [new Uint8Array([1,2,3]), new Uint8ClampedArray([4,5,6]), new Uint16Array([7,8,9]), new Uint32Array([11,12,13])];
 * console.log(customStrigify(arr_eight));
 */