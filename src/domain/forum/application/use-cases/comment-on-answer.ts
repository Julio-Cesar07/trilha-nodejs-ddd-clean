import { AnswerRepository } from '../repositories/interfaces/answers-repository';
import { AnswerComments } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/interfaces/answer-comments-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface CommentOnQuestioUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

interface CommentOnQuestioUseCaseResponse {
    answerComment: AnswerComments
}

export class CommentOnQuestioUseCase {
	constructor(private answerRepository: AnswerRepository,
        private answerCommentsReposioty: AnswerCommentsRepository){}

	async execute({
		content,
		authorId,
		answerId
	}: CommentOnQuestioUseCaseRequest): Promise<CommentOnQuestioUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if(!answer)
			throw new Error('Answer not found.');

		const answerComment = AnswerComments.create({
			authorId: new UniqueEntityId(authorId),
			answerId: new UniqueEntityId(answerId),
			content,
		});

		await this.answerCommentsReposioty.create(answerComment);

		return {
			answerComment,
		};
	}
}