import { MapSchema, Schema, type } from '@colyseus/schema'

type IVector3 = {
  x: number
  y: number
  z: number
}

export class Position extends Schema implements IVector3 {
  @type('number') x: number
  @type('number') y: number
  @type('number') z: number

  constructor(position: IVector3) {
    super()
    this.x = position.x
    this.y = position.y
    this.z = position.z
  }

  set(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }
}

export class Rotation extends Schema implements IVector3 {
  @type('number') x: number
  @type('number') y: number
  @type('number') z: number

  constructor(rotation: IVector3) {
    super()
    this.x = rotation.x
    this.y = rotation.y
    this.z = rotation.z
  }

  set(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }
}

export class Player extends Schema {
  @type('string') id: string
  @type(Position) position: Position
  @type(Rotation) rotation: Rotation
  @type('string') action: string
  @type('number') placeholderForChange = 0

  constructor(id: string, position: IVector3, rotation: IVector3) {
    super()
    this.id = id
    this.position = new Position(position)
    this.rotation = new Rotation(rotation)
  }
}

export class WorldState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>()
}
