import { Field, ID, ObjectType } from 'type-graphql';
// tslint:disable:no-empty-interface
// tslint:disable:max-classes-per-file

@ObjectType()
export class ChatMessage {
	@Field(type => ID)
	public id: number;

	@Field()
	public message: string;
}

@ObjectType()
export class ChatMessageNotification extends ChatMessage {
	@Field()
	public date: Date;
}
