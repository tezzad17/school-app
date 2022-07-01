import { Assignment } from '@prisma/client'
import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    Arg,
    FieldResolver,
    Root,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Professor } from '../../db/entities/Professor'
import { Score } from '../../db/entities/Score'

@Resolver(Score)
export class ScoreQuery {


    @Query(() => [Score])
    async allScores(@Ctx() ctx: Context) {
        return ctx.prisma.score.findMany()
    }
}