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
		const { answer } = await sut.execute({
			content: 'Nova reposta',
			instructorId: '1',
			questionId: '1'
		});
	
		expect(answer.id).toBeTruthy();
		expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id);
	});
});