document.getElementById("save-btn")?.addEventListener("click", async ()=> {
    createNewCharacter ();
    console.log("hello")
})



async function createNewCharacter () {
    const characterName = document.getElementById("charactername").value;
    const haircolour = document.getElementById("haircolour").value;
    const eyecolour = document.getElementById("eyecolour").value;
    const characterClass = document.getElementById("character-class").value;

    console.log(characterName)
    console.log(haircolour)
    console.log(eyecolour)
    console.log(characterClass)

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                     mutation CreateCharacter ($characterName: String!) {
                        createCharacter(characterName: $characterName) {
                            characterName
                            haircolour
                            eyecolour
                            characterClass
                        }
                    } `,
                variables: 
                    {
                        characterName: characterName,
                        haircolour: haircolour, 
                        eyecolour: eyecolour, 
                        characterClass: characterClass
                    }
                
            }),
        })

        const data = await response.json()

        console.log(response)

}





