import { AnswerRepository } from '@/domain/forum/application/repositories/interfaces/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswerRepository{
	public items: Answer[] = [];

	async create(answer: Answer): Promise<void> {
		this.items.push(answer);
	}
	async delete(answer: Answer): Promise<void> {
		const answerIndex = this.items.findIndex(item => item.id === answer.id);

		this.items.splice(answerIndex, 1);
	}
	async findById(answerId: string): Promise<Answer | null> {
		const answer = this.items.find(item => item.id.toString() === answerId);

		return answer ?? null;
	}
}