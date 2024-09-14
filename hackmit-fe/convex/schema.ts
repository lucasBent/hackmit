import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    words: defineTable({
        word: v.string(),
        ipa: v.string(),
    })
        .index('by_word', ['word'])
        .searchIndex('search_word', {
            searchField: 'word',
        }),
})

