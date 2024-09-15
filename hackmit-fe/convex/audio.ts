import { query } from './_generated/server'
import { v } from 'convex/values'

export const ipaChars = query({
    args: {},
    handler: async (ctx) => {
        const ipa_chars = await ctx.db.query("ipa").collect()
        return ipa_chars.map((ipa_char) => ipa_char.ipa_char)
    }
})

export const getAudio = query({
    args: {ipaChar: v.string()},
    handler: async (ctx, args) => {
        const ipa_char = await ctx.db.query("ipa").withIndex("by_ipa_char", (q) => q.eq('ipa_char', args.ipaChar)).collect()
        if (!ipa_char) {
            return null
        }
        return { url: await ctx.storage.getUrl(ipa_char[0].storage_id)}
    }
})

