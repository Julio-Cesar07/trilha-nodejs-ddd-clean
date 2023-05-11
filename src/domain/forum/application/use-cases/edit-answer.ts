import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/interfaces/answers-repository';

interface EditAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

interface EditAnswerUseCaseResponse {
	answer: Answer
}


export class EditAnswerUseCase {
	constructor(private answerRepository: AnswerRepository){}

	async execute({
		authorId,
		answerId,
		content,
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse>{
		const answer = await this.answerRepository.findById(answerId);

		if(!answer)
			throw new Error('Answer not found.');

		if(answer.authorId.toString() !== authorId)
			throw new Error('Not allowed.');

		answer.content = content;

		this.answerRepository.save(answer);

		return {
			answer,
		};
        
	}
}