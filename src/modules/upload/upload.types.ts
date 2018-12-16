import { FileUploadType } from 'graphql-upload';
import { Field, ObjectType } from 'type-graphql';
import { OmitStrict } from './../../types';

@ObjectType()
export class UploadPayload implements OmitStrict<FileUploadType, 'stream'> {
	@Field()
	public filename: string;

	@Field()
	public mimetype: string;

	@Field()
	public encoding: string;
}
