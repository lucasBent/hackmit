import { action } from './_generated/server'
import { v } from 'convex/values'

export const doSomething = action({
    args: {
        original: v.string(),
        userInput: v.string(),
    },
    handler: (_, args) => {
        // implementation goes here

        // optionally return a value
        return 'success'
    },
})
