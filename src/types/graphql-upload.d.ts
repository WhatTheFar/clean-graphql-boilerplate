declare module 'graphql-upload' {
	import { ReadStream } from 'fs';
	import { Readable } from 'stream';
	import { RequestHandler } from 'express';
	import { GraphQLScalarType } from 'graphql';

	export const GraphQLUpload: GraphQLScalarType;

	type FileUploadType = {
		filename: string;
		mimetype: string;
		encoding: string;
		stream: Readable;
		// For graphql-upload v7.0.0+
		// createReadStream: () => ReadStream;
	};

	type FileUpload = Promise<FileUploadType>;

	type UploadOptions = {
		/**
		 * Max allowed non-file multipart form field size in bytes; enough for your queries (default: 1 MB)
		 */
		maxFieldSize?: number;
		/**
		 * Max allowed file size in bytes (default: Infinity)
		 */
		maxFileSize?: number;
		/**
		 * Max allowed number of files (default: Infinity)
		 */
		maxFiles?: number;
	};

	export function graphqlUploadExpress(options?: UploadOptions): RequestHandler;
}
