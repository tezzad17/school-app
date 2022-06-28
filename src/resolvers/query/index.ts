import { NonEmptyArray } from 'type-graphql'
import { UserQuery } from './user'
import { AssignmentQuery } from './assignment'
import { ProfessorQuery } from './professor'
import { StudentQuery } from './student_query'

export const queries: NonEmptyArray<Function> = [
    UserQuery,
    AssignmentQuery,
    ProfessorQuery,
    StudentQuery
]
