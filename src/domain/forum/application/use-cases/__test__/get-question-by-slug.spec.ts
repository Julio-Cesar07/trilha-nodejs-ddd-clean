import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from '../get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
	beforeEach(async () => {
		inMemoryQuestionRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);

		const newQuestion = makeQuestion({
			slug: Slug.create('example-question'),
		});

		await inMemoryQuestionRepository.create(newQuestion);
	});

	it('should be able to get a question by slug', async () => {
		const result = await sut.execute({
			slug: 'example-question',
		});

		if (result.isRight())
			expect(result.value?.question).toEqual(
				inMemoryQuestionRepository.items[0]
			);
	});
});
