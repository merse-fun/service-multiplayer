import { Server, LobbyRoom, RedisPresence } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import { MerseWorld } from './rooms/MerseWorld'

const port = Number(process.env.port) || 2567

const app = express()
app.use(cors())
app.use(express.json())

const gameServer = new Server({
  server: createServer(app),
})

gameServer.define('merse-world', MerseWorld).enableRealtimeListing()

app.use('/colyseus', monitor())

gameServer.listen(port)
console.log(`Listening on ws://localhost:${port}`)
