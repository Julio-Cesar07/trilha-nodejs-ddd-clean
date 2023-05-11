import { QuestionRepository } from '../repositories/interfaces/question-repository';
import { QuestionComments } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/interfaces/question-comments-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface CommentOnQuestioUseCaseRequest {
    authorId: string
    questionId: string
    content: string
}

interface CommentOnQuestioUseCaseResponse {
    questionComment: QuestionComments
}

export class CommentOnQuestioUseCase {
	constructor(private questionRepository: QuestionRepository,
        private questionCommentsReposioty: QuestionCommentsRepository){}

	async execute({
		content,
		authorId,
		questionId
	}: CommentOnQuestioUseCaseRequest): Promise<CommentOnQuestioUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if(!question)
			throw new Error('Question not found.');

		const questionComment = QuestionComments.create({
			authorId: new UniqueEntityId(authorId),
			questionId: new UniqueEntityId(questionId),
			content,
		});

		await this.questionCommentsReposioty.create(questionComment);

		return {
			questionComment,
		};
	}
}