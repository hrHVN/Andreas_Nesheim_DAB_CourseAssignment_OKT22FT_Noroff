function adoptAnimal(id) {
    fetch(`${window.location.origin}/animals/${id}`, {
        method: 'POST'
    })
        .then((res) => window.location.href = '/animals')
        .catch((err) => {
            console.log(err)
        });
}

function deleteAnimal(id) {
    fetch(`${window.location.origin}/animals/${id}`, {
        method: 'post'
    })
        .then(res => window.location.href = '/animals')
        .catch((err) => {
            console.log(err)
        });;
}

function updateSpecies(id) {
    newSpecies = prompt("Update species")
    fetch(`${window.location.origin}/species/${id}`, {
        method: 'POST'
    })
        .then(res => window.location.href = '/species')
        .catch((err) => {
            console.log(err)
        });
}

function deleteSpecies(id) {
    fetch(`${window.location.origin}/species/${id}`, {
        method: 'DELETE'
    })
        .then(res => window.location.href = '/species')
        .catch((err) => {
            console.log(err)
        });
}

function updateTemperament(id) {
    newTemperament = prompt("Update temperament")
    fetch(`${window.location.origin}/temperament/${id}`, {
        method: 'POST'
    })
        .then(res => window.location.href = '/temperament')
        .catch((err) => {
            console.log(err)
        });
}

function deleteTemperament(id) {
    fetch(`${window.location.origin}/temperament/${id}`, {
        method: 'DELETE'
    })
        .then(res => window.location.href = '/temperament')
        .catch((err) => {
            console.log(err)
        });
}