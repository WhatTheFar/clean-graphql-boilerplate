import { plainToClass } from 'class-transformer';
import {
	Arg,
	Mutation,
	Publisher,
	PubSub,
	Resolver,
	Root,
	Subscription
} from 'type-graphql';
import { ChatMessageInput } from './chat.inputs';
import { ChatMessage, ChatMessageNotification } from './chat.types';

const PUBSUB_CHAT_MESSAGE_NOTIFICATION = 'pubsub_chat_message_notification';

@Resolver()
export class CharResolver {
	private autoIncrement = 0;

	@Mutation(returns => ChatMessage)
	public async addNewMessage(
		@Arg('data') { message }: ChatMessageInput,
		@PubSub(PUBSUB_CHAT_MESSAGE_NOTIFICATION) publish: Publisher<ChatMessage>
	): Promise<ChatMessage> {
		const chatMessage = { id: ++this.autoIncrement, message };
		await publish(chatMessage);
		return chatMessage;
	}

	@Subscription({ topics: PUBSUB_CHAT_MESSAGE_NOTIFICATION })
	public newMessageNotification(
		@Root() chatMessage: ChatMessage
	): ChatMessageNotification {
		return plainToClass(ChatMessageNotification, {
			...chatMessage,
			date: new Date()
		});
	}
}
