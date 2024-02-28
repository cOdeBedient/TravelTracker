function getTraveler(id, travelers) {
    return travelers.find(traveler => id === traveler.id)
}

export {
    getTraveler
}