


async function getAllCharacters () {

    const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query getAllCharacters {
                    getAllCharacters {
                        characterName
                        haircolour
                        eyecolour
                        characterClass
                    }
                } `
        })
    })
    const data = await response.json()

    const characters = data.data.getAllCharacters


    return characters


}

async function renderCharacters () {
    let list = await getAllCharacters();
    let container = document.getElementById("characters-container")

    for (let i = 0; i < list.length; i++) {
        console.log(list[i])
        let characterContainer = document.createElement("div")
        characterContainer.classList.add("character-container")
        container.appendChild(characterContainer)

        let imageContainer = document.createElement("div")
        imageContainer.classList.add("character-container__image")
        characterContainer.appendChild(imageContainer)

        let text = document.createElement("p")
        text.innerText = list[i].characterName
        imageContainer.appendChild(text)
        
        let haircolour = document.createElement("p")
        haircolour.innerText = "Haircolour: " + list[i].haircolour
        imageContainer.appendChild(haircolour)

        let eyecolour = document.createElement("p")
        eyecolour.innerText = "Eyecolour: " + list[i].eyecolour
        imageContainer.appendChild(eyecolour)

        let characterClass = document.createElement("p")
        characterClass.innerText = "Class: " + list[i].characterClass
        imageContainer.appendChild(characterClass)



        let containerName = document.createElement("div")
        containerName.classList.add("character-container__name")
        characterContainer.appendChild(containerName)
    }

    
}   


renderCharacters ()


