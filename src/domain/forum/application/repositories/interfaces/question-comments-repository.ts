import { QuestionComments } from '@/domain/forum/enterprise/entities/question-comment';

export interface QuestionCommentsRepository {
    create(questionComments: QuestionComments): Promise<void>
}