import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { DeleteQuestionUseCase } from '../delete-question';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question', () => {
	beforeEach(async () => {
		inMemoryQuestionRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
	});

	it('should be able to delete a question', async () => {
		const newQuestion = makeQuestion();

		await inMemoryQuestionRepository.create(newQuestion);

		await sut.execute({
			questionId: newQuestion.id.toString(),
			authorId: newQuestion.authorId.toString()
		});

		expect(inMemoryQuestionRepository.items).toHaveLength(0);

	});

	it('should not be able to delete a question from another user', async () => {
		const newQuestion = makeQuestion();

		await inMemoryQuestionRepository.create(newQuestion);

		await expect(() => sut.execute({
			questionId: newQuestion.id.toString(),
			authorId: 'author-not-owner'
		})).rejects.toBeInstanceOf(Error);
	});
});