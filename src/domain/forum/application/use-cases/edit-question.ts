import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/interfaces/question-repository';
import { NotAllowedError } from './errors/not-allowed';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface EditQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
}

type EditQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		question: Question;
	}
>;

export class EditQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		authorId,
		questionId,
		content,
		title,
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) return left(new ResourceNotFoundError());

		if (question.authorId.toString() !== authorId)
			return left(new NotAllowedError());

		question.title = title;
		question.content = content;

		this.questionRepository.save(question);

		return right({
			question,
		});
	}
}
