import { AnswerRepository } from '../repositories/interfaces/answers-repository';

interface DeleteAnswerUseCaseRequest {
	authorId: string
    answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
	constructor(private answerRepository: AnswerRepository){}

	async execute({
		answerId,
		authorId
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if(!answer)
			throw new Error('Answer not found.');

		if(authorId !== answer.authorId.toString())
			throw new Error('Not allowed.');

		await this.answerRepository.delete(answer);

		return {};
	}
}