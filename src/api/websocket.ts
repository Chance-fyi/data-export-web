import {ExportSuccess} from "@/pages/export/List";

let ws: WebSocket
const url = 'ws://127.0.0.1:8001/ws'
let heartCheck: NodeJS.Timer
let lock = false

type msgData = {
  type: string
  data: any
}

export const send = (data: msgData) => {
  ws.send(JSON.stringify(data))
}

const message = (e: any) => {
  const json = JSON.parse(e.data)
  switch (json.type) {
    case 'export':
      ExportSuccess(json.data.name)
      break
    default:
      break
  }
}

export const InitWebSocket = () => {
  ws = new WebSocket(url)

  ws.onopen = function () {
    send({
      type: 'login',
      data: {
        'token': localStorage.getItem('token')
      }
    })
    heartCheck = setInterval(function () {
      ws.send('ping');
    }, 1000 * 8)
  }

  ws.onmessage = message

  ws.onclose = function () {
    console.warn('connect close')
    clearInterval(heartCheck)
    if (!lock) {
      lock = true
      setTimeout(function () {
        console.log('connect close setTimeout')
        InitWebSocket()
        lock = false
      }, 1000 * 3)
    }
  }

  ws.onerror = function () {
    console.error('connect error')
    clearInterval(heartCheck)
    if (!lock) {
      lock = true
      setTimeout(function () {
        console.log('connect close setTimeout')
        InitWebSocket()
        lock = false
      }, 1000 * 3)
    }
  }
}
