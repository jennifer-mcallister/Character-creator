const path = require('path')
const fsPromises = require('fs/promises')
const { fileExists, getDirectoryFileNames, readFile, deleteFile} = require('../utils/fileHandling')
const { GraphQLError } = require('graphql')
const crypto = require('crypto')

const charactersDirectory = path.join(__dirname, '..', 'data', 'characters')

exports.resolvers = {
    Query: {
        getCharacterByName: async (_, args, context) => {
            const characterName = args.name
            const filePath = path.join(charactersDirectory, `${characterName}.json`)
            const characterExists = await fileExists(filePath)
            if (!characterExists) return new GraphQLError('Character  ')
            const character = JSON.parse(await readFile(filePath))

            return character
            
        },
        getAllCharacters: async (_, args, context) => {

            return null
        }
    },
    Mutation: {
        createCharacter: async (_, args, context) => {

            return null
        },
        updateCharacter: async (_, args, context) => {

            return null
        },
        delteCharacter: async (_, args, context) => {

            return null
        },
    }
}