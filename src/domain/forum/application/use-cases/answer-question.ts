import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/interfaces/answers-repository';
import { Either, right } from '@/core/either';

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

type AnswerQuestionUseCaseResponse = Either<
	null,
	{
		answer: Answer;
	}
>;

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswerRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		await this.answersRepository.create(answer);

		return right({ answer });
	}
}
