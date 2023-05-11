import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@/domain/forum/enterprise/entities/question';

export interface QuestionRepository {
    create(question: Question): Promise<void>
    findById(questionId: string): Promise<Question | null>
    findBySlug(slug: string): Promise<Question | null>
    findManyRecent(params: PaginationParams): Promise<Question[]>
    save(question: Question): Promise<void>
    delete(question: Question): Promise<void>
}