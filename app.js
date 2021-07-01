const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const selectMovie = document.getElementById("movie")


// const ticketPrice = +selectMovie.value
let ticketPrice = +selectMovie.value // we also can use parseInt(selectMovie.value)

// how we are gonna select the seats? 
// we can map through or forEach through the "seats"
// but better way is to grab the parent and find which one is seat 

// update selected count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll(".row .seat.selected")
    // selectedSeats console returns nodelist[] which is kind of array
    // so we can have that's length
    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice

    // for local storage we use spread operator
    const selectedIndex = [...selectedSeats].map(seat => {
        // this will help to get the number of which seat is selected  
        return [...seats].indexOf(seat)
    }) 
    localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex))
}

// save selected movie data 
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}

// update movie
selectMovie.addEventListener("change", e => {
    ticketPrice = +e.target.value
    //set movie data to local storage
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

// update seat
container.addEventListener("click", e => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
        updateSelectedCount()
    }
})

// storage data to UI

const showToUI = ()=> {
    
    // getting the seats
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        })
    }

    //getting the movie
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex") 
    if(selectedMovieIndex !== null){
        selectMovie.selectedIndex = selectedMovieIndex
    }

}

// call the local storage
showToUI()

// to keep the price update all the time
updateSelectedCount()

// clear all storage
const clearStorage = () => {
    localStorage.clear()
    location.reload()
}