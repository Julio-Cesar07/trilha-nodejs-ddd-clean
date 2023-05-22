import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from '../delete-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from '../errors/not-allowed';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete answer', () => {
	beforeEach(async () => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
	});

	it('should be able to delete a answer', async () => {
		const newAnswer = makeAnswer();

		await inMemoryAnswerRepository.create(newAnswer);

		await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: newAnswer.authorId.toString(),
		});

		expect(inMemoryAnswerRepository.items).toHaveLength(0);
	});

	it('should not be able to delete a answer from another user', async () => {
		const newAnswer = makeAnswer();

		await inMemoryAnswerRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: newAnswer.id.toString(),
			authorId: 'author-not-owner',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
