import { Slug } from './slug';

it('should be able to create a new slug from text', async () => {
	const slug = Slug.createFromText(' Example question_title- ');

	console.log(slug.value);

	expect(slug.value).toEqual('example-question-title');
});