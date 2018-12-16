import * as fs from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import * as path from 'path';
import { Readable } from 'stream';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { UploadPayload } from './upload.types';

const UPLOAD_DIR = path.resolve(__dirname, '..', '..', 'generated');

const storeFileByFs = async (stream: Readable, filename: string) => {
	const filePath = path.resolve(UPLOAD_DIR, filename);

	return new Promise((resolve, reject) =>
		stream
			.on('error', error => reject(error))
			.pipe(fs.createWriteStream(filePath))
			.on('error', error => reject(error))
			.on('finish', () => resolve({ filename, filePath }))
	);
};

const processUpload = async (upload: FileUpload) => {
	const fileUpload = await upload;
	const stream = fileUpload.stream;
	// For graphql-upload v7.0.0+
	// const stream = fileUpload.createReadStream();

	await storeFileByFs(stream, fileUpload.filename);

	return fileUpload;
};

@Resolver()
export class UploadResolver {
	@Mutation(returns => UploadPayload)
	public async singleUpload(
		@Arg('file', type => GraphQLUpload) file: FileUpload
	): Promise<UploadPayload> {
		return await processUpload(file);
	}

	@Mutation(returns => [UploadPayload])
	public async multipleUpload(
		@Arg('files', type => [GraphQLUpload]) files: FileUpload[]
	): Promise<UploadPayload[]> {
		return await Promise.all(files.map(processUpload));
	}
}
