import { Client, Room } from 'colyseus'
import { State } from './schema/State'

export class StateHandlerRoom extends Room<State> {
  async onCreate(options: any) {
    console.log('Classroom created', options)

    this.roomId = await options.roomId

    this.setState(new State())

    this.onMessage('main-player/move', (client, data) => {
      this.state.movePlayer(client.sessionId, data)
    })
  }

  onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
    console.log(`--> ${client.sessionId} joined!`)

    this.state.createPlayer(client.sessionId)
  }

  onLeave(client: Client, consented?: boolean): void | Promise<any> {
    console.log(`<-- ${client.sessionId} leave!`)
    this.state.removePlayer(client.sessionId)
  }

  onDispose(): void | Promise<any> {
    console.log('Dispose StateHandlerRoom')
  }
}
