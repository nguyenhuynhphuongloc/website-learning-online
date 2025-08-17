import { Module } from "@nestjs/common";
import { MessageBody, SubscribeMessage } from "@nestjs/websockets";
import { ChatGateway } from "src/chats/chat-gateway";

@Module(
    {
        providers: [ChatGateway]
    }
)
export class ChatModule {
    @SubscribeMessage('newMessage')
    handleNewMessage(@MessageBody() message: any) {
        console.log(message)
    }
}