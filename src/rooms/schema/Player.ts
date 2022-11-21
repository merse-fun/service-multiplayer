import { Schema, type } from '@colyseus/schema'

export interface IPosition {
  x: number
  y: number
  z: number
}

export class Position extends Schema {
  @type('number') x: number
  @type('number') y: number
  @type('number') z: number

  constructor(position: IPosition) {
    super()
    this.x = position.x
    this.y = position.y
    this.z = position.z
  }

  set(x: number, y: number, z: number) {
    this.x += x
    this.y += y
    this.z += z
  }
}

export class Player extends Schema {
  @type('string') id: string
  @type(Position) position: Position
  @type('string') action: string
  @type('number') placeholderForChange = 0

  constructor(id: string, position: IPosition) {
    super()
    this.id = id
    this.position = new Position(position)
  }
}
