import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/interfaces/question-comments-repository';
import { QuestionComments } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository{
	public items: QuestionComments[] = [];
	async create(questionComments: QuestionComments): Promise<void> {
		this.items.push(questionComments);
	}
    
}