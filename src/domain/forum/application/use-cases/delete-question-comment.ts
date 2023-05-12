import { QuestionCommentsRepository } from '../repositories/interfaces/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {
}

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentsReposioty: QuestionCommentsRepository){}

	async execute({
		questionCommentId,
		authorId,
	}: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment = await this.questionCommentsReposioty.findById(questionCommentId);

		if(!questionComment)
			throw new Error('Question Comment not found.');

		if(questionComment.authorId.toString() !== authorId)
			throw new Error('Not allowed.');

		await this.questionCommentsReposioty.delete(questionComment);
        
		return{};
	}
}