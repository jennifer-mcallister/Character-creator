const path = require('path')
const fsPromises = require('fs/promises')
const { fileExists, getDirectoryFileNames, readFile, deleteFile} = require('../utils/fileHandling')
const { GraphQLError } = require('graphql')
const crypto = require('crypto')

const charactersDirectory = path.join(__dirname, '..', 'data', 'characters')

exports.resolvers = {
    Query: {
        getCharacterByName: async (_, args, context) => {
            const characterName = args.characterName
            const filePath = path.join(charactersDirectory, `${characterName}.json`)
            const characterExists = await fileExists(filePath)
            if (!characterExists) return new GraphQLError('Character has not been created')
            const character = JSON.parse(await readFile(filePath))

            return character
            
        },
        getAllCharacters: async (_, args, context) => {
            const files = await getDirectoryFileNames(charactersDirectory)
            const characters = []
            for(const file of files) {
                const filePath = path.join(charactersDirectory, `${file}`)
                const character = JSON.parse(await readFile(filePath))
                characters.push(character)
            }
            if (characters.length === 0) return new GraphQLError('No characters created')
            return characters
        }
    },
    Mutation: {
        createCharacter: async (_, args, context) => {
            if (args.characterName.length <= 2) return new GraphQLError('Name must be at least three character long')

            const newCharacter = { 
                characterName: args.characterName, 
                haircolour: args.characterHaircolour || "BLUE", 
                eyecolour: args.characterEyecolour ||"BLUE", 
                characterClass: args.characterClass || "BERSERKER"
            } 

            const filePath = path.join(charactersDirectory, `${newCharacter.characterName}.json`)
            const characterExists = await fileExists(filePath)
            if (characterExists) return new GraphQLError('Name is not available')
            await fsPromises.writeFile(filePath, JSON.stringify(newCharacter))

            return newCharacter
        },
        updateCharacter: async (_, args, context) => {
            const { 
                characterName: characterName, 
                haircolour: haircolour, 
                eyecolour: eyecolour, 
                characterClass: characterClass
            } = args

            const filePath = path.join(charactersDirectory, `${characterName}.json`)
            const exists = await fileExists(filePath)
            if (!exists) return new GraphQLError('Character has not been created')
            const updatedCharacter = {characterName, haircolour, eyecolour, characterClass }
            await fsPromises.writeFile(filePath, JSON.stringify(updatedCharacter))

            return updatedCharacter
        },
        delteCharacter: async (_, args, context) => {
            const characterName = args.characterName
            const filePath = path.join(charactersDirectory, `${characterName}.json`)
            const Exists = await fileExists(filePath)
            if(!Exists) return new GraphQLError('Character has not been created')
            try {
                await deleteFile(filePath)
            } catch (error) {
                return {
                    deletedCharacter: characterName,
                    success: false
                }
            }
            return {
                deletedCharacter: characterName,
                success: true
            }
        },
    }
}