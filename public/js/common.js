function adoptAnimal(id) {
    fetch(`${window.location.origin}/animals/${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => window.location.href = '/animals')
        .catch((err) => {
            console.log(err)
        });
}

function deleteAnimal(id) {
    fetch(`${window.location.origin}/animals/${id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => window.location.href = '/animals')
        .catch((err) => {
            console.log(err)
        });;
}

function updateSpecies(id) {
    let newSpecies = prompt("Update species")
    if (!id) id = `new`;
    fetch(`${window.location.origin}/species/update/${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newSpecies
        })
    })
        .then(() => window.location.href = '/species')
        .catch((err) => {
            console.log(err)
        });
}

function deleteSpecies(id) {
    fetch(`${window.location.origin}/species/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => window.location.href = '/species')
        .catch((err) => {
            console.log(err)
        });
}

function updateTemperament(id) {
    let newTemperament = prompt("Update temperament");
    if (!id) id = `new`;

    fetch(`${window.location.origin}/temperament/update/${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTemperament })
    })
        .then(res => window.location.href = '/temperament')
        .catch((err) => {
            console.log(err)
        });
}

function deleteTemperament(id) {
    fetch(`${window.location.origin}/temperament/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => window.location.href = '/temperament')
        .catch((err) => {
            console.log(err)
        });
}