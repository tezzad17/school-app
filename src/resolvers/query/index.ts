import { NonEmptyArray } from 'type-graphql'
import { UserQuery } from './user'
import { AssignmentQuery } from './assignment_query'
import { ProfessorQuery } from './professor_query'
import { StudentQuery } from './student_query'
import { CourseQuery } from './course_query'
import { ScoreQuery } from './score_query'

export const queries: NonEmptyArray<Function> = [
    UserQuery,
    AssignmentQuery,
    ProfessorQuery,
    StudentQuery,
    CourseQuery,
    ScoreQuery
]
