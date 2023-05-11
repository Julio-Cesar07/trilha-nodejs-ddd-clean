import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/interfaces/question-repository';

interface EditQuestionUseCaseRequest {
    authorId: string
    questionId: string
    title: string
    content: string
}

interface EditQuestionUseCaseResponse {
	question: Question
}


export class EditQuestionUseCase {
	constructor(private questionRepository: QuestionRepository){}

	async execute({
		authorId,
		questionId,
		content,
		title
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse>{
		const question = await this.questionRepository.findById(questionId);

		if(!question)
			throw new Error('Question not found.');

		if(question.authorId.toString() !== authorId)
			throw new Error('Not allowed.');

		question.title = title;
		question.content = content;

		this.questionRepository.save(question);

		return {
			question,
		};
        
	}
}