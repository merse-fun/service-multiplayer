import { Client, Room } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { PlayerCreateCommand, PlayerLeaveCommand } from './commands/PlayerUpdateCommand'
import { MESSAGES } from './constants/Message'
import { WorldState } from './schema/WorldState'

export class MerseWorld extends Room<WorldState> {
  dispatcher = new Dispatcher(this)

  async onCreate(options: any) {
    this.setState(new WorldState())

    this.onMessage(MESSAGES.PLAYER.MOVE, (client, data) => {})
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
