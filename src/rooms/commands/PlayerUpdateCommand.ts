import { Command } from '@colyseus/command'
import { Room } from 'colyseus'
import { getRandomInt } from '../../utils'
import { MerseWorld } from '../MerseWorld'
import { Player } from '../schema/WorldState'

const INITIAL_Y_AXES = 0

export class PlayerCreateCommand extends Command<
  MerseWorld,
  {
    sessionId: string
  }
> {
  execute(payload: this['payload']) {
    this.state.players.set(
      payload.sessionId,
      new Player(
        payload.sessionId,
        { x: getRandomInt(2), y: INITIAL_Y_AXES, z: getRandomInt(3) },
        { x: getRandomInt(2), y: INITIAL_Y_AXES, z: getRandomInt(3) }
      )
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
