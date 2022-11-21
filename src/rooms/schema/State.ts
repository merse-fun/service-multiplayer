import { MapSchema, Schema, type } from '@colyseus/schema'
import { Player, Position } from './Player'

interface PlayerMoveData {
  forward: number
  backward: number
  left: number
  right: number
}

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>()

  createPlayer(sessionId: string) {
    this.players.set(sessionId, new Player(sessionId, { x: getRandomInt(2), y: 0, z: getRandomInt(3) }))
  }

  movePlayer(sessionId: string, data: PlayerMoveData) {
    let player = this.players.get(sessionId)
    const { forward, backward, left, right } = data
    let newPosition = [(Number(forward) - Number(backward)) * 0.25, 0, (Number(right) - Number(left)) * 0.25]

    player.position.x += newPosition[0]
    player.position.z += newPosition[2]
    player.placeholderForChange += 0.000005
  }

  removePlayer(sessionId: string) {
    this.players.delete(sessionId)
  }

  setAction(sessionId: string, action: string) {
    this.players.get(sessionId).id = sessionId
    this.players.get(sessionId).action = action
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
