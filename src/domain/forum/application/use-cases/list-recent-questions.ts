import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/interfaces/question-repository';

interface ListRecentQuestionsUseCaseRequest {
    page: number
}

interface ListRecentQuestionsUseCaseResponse {
    questions: Question[]
}

export class ListRecentQuestionsUseCase {
	constructor(private questionRepository: QuestionRepository){}

	async execute({
		page,
	}: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
		const questions = await this.questionRepository.findManyRecent({
			page,
		});

		return {
			questions,
		};
	}
}