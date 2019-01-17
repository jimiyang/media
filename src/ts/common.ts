let name: string = 'vuejs'
console.log(name)
enum Color {red, green, blue}
let colorname: string = Color[2]
console.log(colorname)
interface LabelledValue {
  label: string
}
function printLabel (labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}
let myObj = {size: 10, label: 'Size 10 Object'}
printLabel(myObj)
function getters (type) {
  return 'hello'
}
interface SquareConfig {
  color?: string
  width?: number
}
function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let mySquare = createSquare({color: 'black', height: 10} as SquareConfig)
class Animal {
  name: string
  constructor (tname: string) {this.name = tname}
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}
class Horse extends Animal {
  constructor (name: string) {super(name)}
  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
 }
}
let tom: Animal = new Horse('Tommy the Palomino')
tom.move(349)
export default {getters}