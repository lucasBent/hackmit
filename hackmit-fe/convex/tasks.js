import { query } from './_generated/server'
import { v } from 'convex/values'

export const getWords = query({
    args: {},
    handler: async (ctx) => {
        const words = await ctx.db.query('words').take(100)
        return words.map((wordRecord) => wordRecord.word)
    },
})

export const getWord = query({
    args: {
        word: v.string(),
    },
    handler: async (ctx, args) => {
        const results = await ctx.db
            .query('words')
            .withIndex('by_word', (q) => q.eq('word', args.word))
            .order('desc')
            .take(5)
        return results
    },
})

export const searchWords = query({
    args: {
        query: v.string(),
    },
    handler: async (ctx, args) => {
        const results = await ctx.db
            .query('words')
            .withSearchIndex('search_word', (q) => q.search('word', args.query))
            .take(100)

        const filterResults = results.filter((doc) => doc.word.startsWith(args.query) || doc.word === args.query)
        return filterResults.map((filterResult) => filterResult.word)
    },
})
