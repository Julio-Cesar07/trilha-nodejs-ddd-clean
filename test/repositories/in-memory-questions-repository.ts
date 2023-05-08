import { QuestionRepository } from '@/domain/forum/application/repositories/interfaces/question-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionRepository{
	public items: Question[] = [];
    
	async create(question: Question): Promise<void> {
		this.items.push(question);
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.items.find(item => item.slug.value === slug);

		return question ?? null;
	}

	async findById(questionId: string): Promise<Question | null> {
		const question = this.items.find(item => item.id.toString() === questionId);

		return question ?? null;
	}

	async delete(question: Question): Promise<void> {
		const questionIndex = this.items.findIndex(item => item.id === question.id);

		this.items.splice(questionIndex, 1);
	}
}