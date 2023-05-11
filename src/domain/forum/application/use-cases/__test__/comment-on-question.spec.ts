import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { CommentOnQuestioUseCase } from '../comment-on-question';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestioUseCase;

describe('Comment on Question', () => {
	beforeEach(async () => {
		inMemoryQuestionRepository = new InMemoryQuestionsRepository();
		inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
		sut = new CommentOnQuestioUseCase(inMemoryQuestionRepository, inMemoryQuestionCommentsRepository);
	});

	it('should be able to comment on question', async () => {
		const newQuestion = makeQuestion();

		await inMemoryQuestionRepository.create(newQuestion);

		await sut.execute({
			authorId: 'user-1',
			content: 'Comment example',
			questionId: newQuestion.id.toString()
		});

		expect(inMemoryQuestionCommentsRepository.items[0]).toMatchObject({
			content: 'Comment example',
		});
	});
});