import { AnswerComments } from '@/domain/forum/enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
    create(answerComments: AnswerComments): Promise<void>
}