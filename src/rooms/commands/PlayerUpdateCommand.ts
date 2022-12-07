import { Command } from '@colyseus/command'
import { getRandomInt } from '../../utils'
import { MerseWorld } from '../MerseWorld'
import { Player, Vector3, Vector4 } from '../schema/WorldState'

const INITIAL_Y_AXES = 0

export class PlayerCreateCommand extends Command<
  MerseWorld,
  {
    sessionId: string
    publicKey: string
  }
> {
  execute(payload: this['payload']) {
    const x = getRandomInt(4)
    const y = INITIAL_Y_AXES
    const z = getRandomInt(5)
    this.state.players.set(
      payload.sessionId,
      new Player(payload.sessionId, { x, y, z }, { x: 0, y: 0, z: 0, w: 0 }, payload.publicKey)
    )
  }
}

export class PlayerLeaveCommand extends Command<
  MerseWorld,
  {
    sessionId: string
  }
> {
  execute(payload: this['payload']) {
    this.state.players.delete(payload.sessionId)
  }
}

export class PlayerMoveCommand extends Command<
  MerseWorld,
  {
    sessionId: string
    data: {
      position: Vector3
      quaternion: Vector4
    }
  }
> {
  execute(payload: this['payload']) {
    const player = this.state.players.get(payload.sessionId)
    player.position.set(payload.data.position)
    player.quaternion.set(payload.data.quaternion)
    player.placeholderForChange += 0.00001
  }
}

export class PlayerActionCommand extends Command<
  MerseWorld,
  {
    sessionId: string
    action: string
  }
> {
  execute(payload: this['payload']) {
    const player = this.state.players.get(payload.sessionId)
    player.action = payload.action
  }
}
