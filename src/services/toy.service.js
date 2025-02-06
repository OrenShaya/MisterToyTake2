
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {              
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        'name': '',
        price: 0,
        labels: [],
        createdAt: new Date(),
        inStock: false,
    }
}

function getRandomToy() {
    return {
        'name': utilService.makeToyName(),
        price: utilService.getRandomIntInclusive(10, 450),
        labels: utilService.getLabels(),
        createdAt: utilService.randomDate(),
        inStock: utilService.getRandomIntInclusive(0, 1) ? true : false,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', minSpeed: '' }
}
