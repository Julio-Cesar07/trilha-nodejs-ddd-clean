import { Either, left, right } from '@/core/either';
import { QuestionRepository } from '../repositories/interfaces/question-repository';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { NotAllowedError } from './errors/not-allowed';

interface DeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

export class DeleteQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		questionId,
		authorId,
	}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) return left(new ResourceNotFoundError());

		if (authorId !== question.authorId.toString())
			return left(new NotAllowedError());

		await this.questionRepository.delete(question);

		return right({});
	}
}
