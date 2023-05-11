import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/interfaces/answer-comments-repository';
import { AnswerComments } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository{
	public items: AnswerComments[] = [];
	async create(answerComments: AnswerComments): Promise<void> {
		this.items.push(answerComments);
	}
    
}