export const utilService = {
    makeId,
    makeLorem,
    makeToyName,
    getLabels,
    randomDate,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

// Mister toy Util service funcitons
function getFormatDate(date) {     
    // same day
    if (date.getDate === new Date().getDate() && 
        date.getMonth === new Date().getMonth() && 
        date.getYear === new Date().getYear()) 
    { 
        return date.getHours() + ':' + date.getMinutes()
    }
    if (date.getYear < new Date().getYear() || // bigger year
          (date.getYear === new Date().getYear() && // or
          date.getMonth() < new Date().getMonth()) || //bigger month
          (date.getYear === new Date().getYear() && 
          date.getMonth() === new Date().getMonth()) ||
          (date.getDate() < new Date().getDate() - 7 &&
          date.getYear === new Date().getYear() && 
          date.getMonth() === new Date().getMonth())) // 
    {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    const day = date.getDay()
    switch (day) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}

function getLabels() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const numOfLabels = getRandomIntInclusive(1, 5)
    const newLabels = []
    for (let i = 0; i < numOfLabels; i++) {
        newLabels.push(labels[getRandomIntInclusive(0, labels.length)])
    }
    return newLabels
}

function makeToyName() {
    const adj = ['Red', 'Blue', 'Lightning', 'Wooden', 'Fast', 'Wheeled',]
    const nouns = ['Princess', 'Car', 'Train', 'Plane', 'Figure', 'Truck', 'Puzzle', 'Doll']
    const adjNum = getRandomIntInclusive(1, 3)
    let name = ''
    for (let i = 0; i < adjNum; i++) {
        name += adj[getRandomIntInclusive(0, adj.length - 1)] + ' '
    }
    name += nouns[getRandomIntInclusive(0, nouns.length - 1)]
    return name
}

function randomDate() {
    const year = getRandomIntInclusive(2024, 2025)
    const month = getRandomIntInclusive(0, 11)
    const day = getRandomIntInclusive(0, 29)
    return new Date(`${month}-${day}-${year}`)
}
