import { CreateQuestionUseCase } from '../create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
	});
	it('should be able to create a question', async () => {
		const result = await sut.execute({
			content: 'Nova reposta',
			authorId: '1',
			title: 'Oie, eu sou o goku?',
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question);
	});
});
