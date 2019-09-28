function customStrigify(data) {
    if (typeof data === "string" || data === null) {
        return "\"" + data + "\"";
    }
    if (typeof data === "number" || typeof data === "boolean") {
        return data;
    }
    if (typeof data === "function" || typeof data === "undefined") {
        return ;
    }
    if(Array.isArray(data)) {
        let tempArr = [];
        for(let i = 0; i < data.length; i++){
            tempArr.push(customStrigify(data[i]));
        }
        return "[" + tempArr.join(',') + "]";
    }
    if (data instanceof Object || !Array.isArray(data)) {
        let tempObj = '';
        Object.keys(data).forEach(function(key){
            tempObj += "\"" + key + "\":" + customStrigify(data[key])  
        })
        return "{" + tempObj + "}";
    }
}

console.log(customStrigify([null]));
console.log(customStrigify({}));

console.log(customStrigify({
    a: [{
        Name1: "John", Age1: 10, Address1: { Street: "Bakerloo", City: "London" },
        employees: [{ firstName: "John", lastName: "Doe" }, { firstName: "Anna", lastName: "Smith" },
        { firstName: "Peter", lastName: "Jones" }], Name2: "Mayer", Age2: 20, Address2:
            { Country: "England" }, Employed: false, status: null
    }]
}));