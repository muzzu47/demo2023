"use strict";
let lname = "john";
let empList = ["San", "Man"];
let emp = empList.find((emp) => emp == "Sana");
console.log("lname", emp);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let c = Color.Blue;
console.log("what is Color", Color,c);
