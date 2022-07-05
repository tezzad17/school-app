import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx
} from 'type-graphql'
import { Context } from '../../config/context'
import { Score } from '../../db/entities/Score'

@Resolver(Score)
export class ScoreQuery {


    @Query(() => [Score])
    async getScores(@Ctx() ctx: Context) {
        return ctx.prisma.score.findMany({
            include: {
                assignment: true,
                student: true
            }
        })
    }
}