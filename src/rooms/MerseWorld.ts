import { Client, Room } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import {
  PlayerActionCommand,
  PlayerCreateCommand,
  PlayerLeaveCommand,
  PlayerMoveCommand,
} from './commands/PlayerUpdateCommand'
import { MESSAGES } from './constants/Message'
import { WorldState } from './schema/WorldState'

export class MerseWorld extends Room<WorldState> {
  dispatcher = new Dispatcher(this)

  async onCreate(options: any) {
    this.setState(new WorldState())

    this.onMessage(MESSAGES.PLAYER.MOVE, (client, data) => {
      this.dispatcher.dispatch(new PlayerMoveCommand(), {
        sessionId: client.sessionId,
        data,
      })
    })

    this.onMessage(MESSAGES.PLAYER.ACTION, (client, data) => {
      console.log(data)

      this.dispatcher.dispatch(new PlayerActionCommand(), {
        sessionId: client.sessionId,
        action: data.action,
      })
    })
  }

  onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
    console.log(`--> ${client.sessionId} joined!`)

    this.dispatcher.dispatch(new PlayerCreateCommand(), {
      sessionId: client.sessionId,
    })
  }

  onLeave(client: Client, consented?: boolean): void | Promise<any> {
    console.log(`<-- ${client.sessionId} leave!`)
    this.dispatcher.dispatch(new PlayerLeaveCommand(), {
      sessionId: client.sessionId,
    })
  }

  onDispose(): void | Promise<any> {
    console.log('❌ Dispose Merse World')
    this.dispatcher.stop()
  }
}
