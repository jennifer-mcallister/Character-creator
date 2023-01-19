const path = require('path')
const fsPromises = require('fs/promises')
const { fileExists, getDirectoryFileNames, readFile, deleteFile} = require('../utils/fileHandling')
const { GraphQLError } = require('graphql')
const crypto = require('crypto')

const charactersDirectory = path.join(__dirname, '..', 'data', 'characters')

exports.resolvers = {
    Query: {
        getCharacterByName: async (_, args, context) => {

            return null
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