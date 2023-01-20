document.getElementById("save-btn")?.addEventListener("click", async ()=> {
    createNewCharacter ();
    console.log("hello")
})


async function createNewCharacter () {

    const createCharacterQuery = `mutation createCharacterProject(characterName: String!) {
        createProject(name: $name, description: $description) {
            id
            name
            description
        }
    }`

    const createProjectQueryVars = {
        name: 'Testus',
        description: 'Testus project description',
    }
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `mutation createCharacter(characterName: String!) {
                    createCharacter(characterName: $characterName) {
                        characterName
                        haircolour
                        characterClass
                    }
                }`,
                variables: {
                    name: '',
                },
            }),
        })

        const data = await response.json()

        console.log(data)

}

// function renderCharacters () {
//     const container = document.getElementById("characters-container")


//     for (let i = 0; i < characters.length; i++) {

//     }
// }

// renderCharacters ();

// async function getAllCharacters () {
//     const graphQlQuery = async (url, query, variables = {}) => {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 query,
//                 variables,
//             }),
//         })

//         const res = await response.json()
//         return res.data
        
//     }

    
    
// }

// getAllCharacters();



