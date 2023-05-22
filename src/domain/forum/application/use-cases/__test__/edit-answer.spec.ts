import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { EditAnswerUseCase } from '../edit-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from '../errors/not-allowed';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit answer', () => {
	beforeEach(async () => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswerRepository);
	});

	it('should be able to edit a answer', async () => {
		const newAnswer = makeAnswer();

		await inMemoryAnswerRepository.create(newAnswer);

		await sut.execute({
			authorId: newAnswer.authorId.toString(),
			answerId: newAnswer.id.toString(),
			content: 'Novo conteudo teste',
		});

		expect(inMemoryAnswerRepository.items[0]).toMatchObject({
			content: 'Novo conteudo teste',
		});
	});

	it('should not be able to edit a answer from another user', async () => {
		const newAnswer = makeAnswer();

		await inMemoryAnswerRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: 'author-not-owner',
			content: 'nao importa',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
