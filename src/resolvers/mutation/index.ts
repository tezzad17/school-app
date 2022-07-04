import { NonEmptyArray } from 'type-graphql'
import { UserMutation } from './user'
import { AssignmentMutation } from './assignment_mutation'
import { ProfessorMutation } from './professor_mutation'
import { StudentMutation } from './student_mutation'
import { CourseMutation } from './course_mutation'
import { ScoreMutation } from './score_mutation'

export const mutations: NonEmptyArray<Function> = [
    AssignmentMutation,
    ProfessorMutation,
    StudentMutation,
    CourseMutation,
    ScoreMutation
]

