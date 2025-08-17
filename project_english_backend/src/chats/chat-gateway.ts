import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";



@WebSocketGateway(3002, {}) // Cổng WebSocket + bật CORS nếu cần
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {

    console.log("clent log in", client.id)

  }

  handleDisconnect(@ConnectedSocket() client: Socket) {

    console.log("client log out", client.id)

  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() message: any) {
    console.log(message)
    client.emit('reply', 'hi')
    this.server.emit('reply', 'boarding')
  }
}
