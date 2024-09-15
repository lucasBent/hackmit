import { action } from './_generated/server'
import { v } from 'convex/values'

export const compare = action({
    args: {
        original: v.string(),
        userInput: v.string(),
    },
    handler: (_, args) => {
        // implementation goes here
        const original = args.original
        const userInput = args.userInput
        
        let differingIndices = [];
        let i = 0

        // Compare characters in both strings until the end of the shorter string
        while (i < original.length && i < userInput.length) {
            if (original[i] !== userInput[i]) {
                differingIndices.push(i) // Flag mismatch
            }
            i++
        }

        // Flag any remaining characters in userInput if it's longer than original
        while (i < userInput.length) {
            differingIndices.push(i) // Flag extra characters in userInput
            i++
        }

        // If original is longer, flag the remaining characters as missing in userInput
        while (i < original.length) {
            differingIndices.push(i) // Flag missing characters in userInput
            i++
        }

        return differingIndices
    },
})
