import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    ipa: defineTable({
        ipa_char: v.string(),
        storage_id: v.id("_storage"),
      })
      .index('by_ipa_char', ['ipa_char']),
    words: defineTable({
        word: v.string(),
        ipa: v.string(),
    })
        .index('by_word', ['word'])
        .searchIndex('search_word', {
            searchField: 'word',
        }),
})

