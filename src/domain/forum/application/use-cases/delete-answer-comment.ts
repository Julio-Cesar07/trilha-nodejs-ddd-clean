import { AnswerCommentsRepository } from '../repositories/interfaces/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string
    answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {
}

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsReposioty: AnswerCommentsRepository){}

	async execute({
		answerCommentId,
		authorId,
	}: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment = await this.answerCommentsReposioty.findById(answerCommentId);

		if(!answerComment)
			throw new Error('Question Comment not found.');

		if(answerComment.authorId.toString() !== authorId)
			throw new Error('Not allowed.');

		await this.answerCommentsReposioty.delete(answerComment);
        
		return{};
	}
}