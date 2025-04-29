
// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:

// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef




// Posso anche fare una funzione che prende url e converte direttamente la risposta in json cosi non lo andremo a scrivere dentro facciamo entrambi i casi
async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}


//Altrimenti senza la funzione di sopra
async function getChefBirthday(id) {

    // Prendiamo le ricette
    const responseRicette = await fetch(`https://dummyjson.com/recipes/${id}`)
    const ricette = await responseRicette.json()

    // Prendiamo informazioni dello chef
    const responseChef = await fetch(`https://dummyjson.com/users/${ricette.userId}`)
    const chef = await responseChef.json()


    return chef
}


// Se facessimo solo questo stiamo stampando la promise che ancora deve essere risolta perche getChefBirthday e una funzione async e quindi restituiesce sempre una promise 
// NON VA BENE USCIRA PENDING
// console.log(getChefBirthday(1))



// O SI UTILIZZA QUESTO COME ABBIAMO VISTO pero ci e utile solo se vogliamo farlo velocemente pk se avessimo altre chiamate causa l annidamente delle chiamate 
getChefBirthday(5)
    .then(chef => console.log(`Data di nascita dello schef ${chef.firstName} ${chef.lastName} e:`, chef.birthDate))
    .catch(err => console.error(err))


    // Oppure SI UTILIZZA QUESTO IIFE (funzione anonima che si invoca da sola)
    (async () => {
        try {
            const chef = await getChefBirthday(5)
            console.log(`Data di nascita dello chef ${chef.firstName} ${chef.lastName} è: ${chef.birthDate}`)
        } catch (err) {
            console.error(err)
        }
    })()
