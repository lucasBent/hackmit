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
        let differingIndices = []
        let i = 0,
            j = 0

        // Track if we're in a sequence of consecutive differences
        let inDifferenceSequence = false
        let firstDifferenceIndex = -1

        // Compare the characters up to the length of the shorter string
        while (i < original.length && j < userInput.length) {
            if (original[i] !== userInput[j]) {
                if (!inDifferenceSequence) {
                    // Start of a difference sequence
                    firstDifferenceIndex = j
                    inDifferenceSequence = true
                }
            } else {
                if (inDifferenceSequence) {
                    // End of a difference sequence
                    differingIndices.push(firstDifferenceIndex)
                    differingIndices.push(j - 1) // Include the last different index
                    inDifferenceSequence = false
                }
            }
            i++
            j++
        }

        // If there's an ongoing difference sequence at the end of the loop
        if (inDifferenceSequence) {
            differingIndices.push(firstDifferenceIndex)
            differingIndices.push(j - 1)
        }

        // If userInput is longer, add the remaining extra characters' indices
        while (j < userInput.length) {
            differingIndices.push(j)
            j++
        }

        // Optionally log or return the differing indices
        return differingIndices
    },
})
