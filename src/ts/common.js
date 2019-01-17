'use strict'
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ property: [] } instanceof Array && function (d, b) { d.property = b }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p] }
    return extendStatics(d, b)
  }
  return function (d, b) {
    extendStatics(d, b)
    function __ () { this.constructor = d } //
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
  }
})()
exports.__esModule = true
var name = 'vuejs'
console.log(name)
var Color
(function (Color) {
  Color[Color['red'] = 0] = 'red'
  Color[Color['green'] = 1] = 'green'
  Color[Color['blue'] = 2] = 'blue'
})(Color || (Color = {}))
var colorname = Color[2]
console.log(colorname)
function printLabel (labelledObj) {
  console.log(labelledObj.label)
}
var myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
/* function getters (type) {
  return 'hello'
} */
function createSquare (config) {
  var newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
createSquare({ color: 'black', height: 10 })
var Animal = /** @class */ (function () {
  function Animal (tname) {
    this.name = tname
  }
  Animal.prototype.move = function (distanceInMeters) {
    if (distanceInMeters === void 0) { distanceInMeters = 0 }
    console.log(this.name + ' moved ' + distanceInMeters + 'm.')
  }
  return Animal
}())
var Horse = /** @class */ (function (_super) {
  __extends(Horse, _super)
  function Horse (name) {
    return _super.call(this, name) || this
  }
  Horse.prototype.move = function (distanceInMeters) {
    if (distanceInMeters === void 0) { distanceInMeters = 45 }
    console.log('Galloping...')
    _super.prototype.move.call(this, distanceInMeters)
  }
  return Horse
}(Animal))
var tom = new Horse('Tommy the Palomino')
tom.move(349)
// exports['default'] = { getters: getters }
