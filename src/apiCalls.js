function getTraveler(id) {
    return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
}

function getTrips() {
    return fetch("http://localhost:3001/api/v1/trips")
}

function getDestinations() {
    return fetch("http://localhost:3001/api/v1/destinations")
}

function getAllData(id) {
    let allData = [getTraveler(id), getTrips(), getDestinations()];
    console.log('allData', allData)
    return allData;
}

function prepareData(id) {
    Promise.all(getAllData(id))
    .then(response => {
        return Promise.all(response.map((element) => { element.json() }))
    })
}

export { prepareData };