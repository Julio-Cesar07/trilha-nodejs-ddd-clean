import { AnswerQuestionUseCase } from '../answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer a Question', () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
	});

	it('create an answer', async () => {
		const result = await sut.execute({
			content: 'Nova reposta',
			instructorId: '1',
			questionId: '1',
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
	});
});
