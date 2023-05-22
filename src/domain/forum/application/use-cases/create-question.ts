import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/interfaces/question-repository';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseRequest {
	authorId: string;
	title: string;
	content: string;
}

type CreateQuestionUseCaseResponse = Either<
	null,
	{
		question: Question;
	}
>;

export class CreateQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		content,
		authorId,
		title,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			content,
			title,
		});

		await this.questionRepository.create(question);

		return right({
			question,
		});
	}
}
