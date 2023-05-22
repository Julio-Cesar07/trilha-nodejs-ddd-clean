import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from '../edit-question';
import { makeQuestion } from 'test/factories/make-question';
import { NotAllowedError } from '../errors/not-allowed';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit question', () => {
	beforeEach(async () => {
		inMemoryQuestionRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionRepository);
	});

	it('should be able to edit a question', async () => {
		const newQuestion = makeQuestion();

		await inMemoryQuestionRepository.create(newQuestion);

		await sut.execute({
			authorId: newQuestion.authorId.toString(),
			questionId: newQuestion.id.toString(),
			content: 'Novo conteúdo teste',
			title: 'Nova pergunta test',
		});

		expect(inMemoryQuestionRepository.items[0]).toMatchObject({
			content: 'Novo conteúdo teste',
			title: 'Nova pergunta test',
		});
	});

	it('should not be able to edit a question from another user', async () => {
		const newQuestion = makeQuestion();

		await inMemoryQuestionRepository.create(newQuestion);

		const result = await sut.execute({
			questionId: newQuestion.id.toString(),
			authorId: 'author-not-owner',
			content: 'nao importa',
			title: 'tambem não importa',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
