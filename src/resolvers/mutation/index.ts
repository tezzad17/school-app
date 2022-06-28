import { NonEmptyArray } from 'type-graphql'
import { UserMutation } from './user'
import { AssignmentMutation } from './assignment'
import { ProfessorMutation } from './professor'
import { StudentMutation } from './student_mutation'
import { CourseMutation } from './course_mutation'

export const mutations: NonEmptyArray<Function> = [
    UserMutation,
    AssignmentMutation,
    ProfessorMutation,
    StudentMutation,
    CourseMutation
]

