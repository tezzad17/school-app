import { NonEmptyArray } from 'type-graphql'
import { UserMutation } from './user'
import { AssignmentMutation } from './assignment'
import { ProfessorMutation } from './professor'

export const mutations: NonEmptyArray<Function> = [
    UserMutation,
    AssignmentMutation,
    ProfessorMutation
]

