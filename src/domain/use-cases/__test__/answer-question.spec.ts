import { AnswerQuestionUseCase } from '../answer-question';
import { AnswerRepository } from '../../repositories/interfaces/answers-repository';
import { Answer } from '../../entities/answer';

const fakeAnswersRepository: AnswerRepository = {
	create: async (answer: Answer) => {
		return;
	}
};

test('create an answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

	const answer = await answerQuestion.execute({
		content: 'Nova reposta',
		instructorId: '1',
		questionId: '1'
	});

	expect(answer.content).toEqual('Nova reposta');
});