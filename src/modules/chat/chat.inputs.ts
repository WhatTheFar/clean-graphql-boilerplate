import { Field, InputType } from 'type-graphql';
import { ChatMessage } from './chat.types';

@InputType()
export class ChatMessageInput implements Pick<ChatMessage, 'message'> {
	@Field()
	public message: string;
}
