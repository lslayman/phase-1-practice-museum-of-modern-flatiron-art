const exhibitTitle = document.querySelector("#exhibit-title")
const buyTicketsButton = document.querySelector("#buy-tickets-button")
const ticketsBought = document.querySelector("#tickets-bought")
const exhibitDescription = document.querySelector("#exhibit-description")
const exhibitComments = document.querySelector("#comments-section")
const commentForm = document.querySelector("#comment-form")
const exhibitImage = document.querySelector("#exhibit-image")

let numberTicketsBought = 0

fetch("http://localhost:3000/current-exhibits")
    .then(res => res.json())
    .then(data => {
        renderExhibit(data[0])
    })

function renderExhibit(currentExhibit) {
    console.log(currentExhibit)
    exhibitTitle.textContent = currentExhibit.title
    exhibitDescription.textContent = currentExhibit.description
    exhibitImage.src = currentExhibit.image
    exhibitImage.alt = currentExhibit.title
    renderComments(currentExhibit.comments)
    numberTicketsBought = currentExhibit.tickets_bought
}

function purchaseTickets() {
    numberTicketsBought += 1
    ticketsBought.textContent = `${numberTicketsBought} tickets bought`
}

buyTicketsButton.addEventListener('click', purchaseTickets)

function renderComments(comments) {
  comments.forEach(comment => addNewComment(comment))
}

function addNewComment(comment) {
  const p = document.createElement('p')
   p.textContent = comment
   exhibitComments.append(p)
}

function submitNewComment(e) {
    e.preventDefault();
    const newComment = e.target[0].value
    addNewComment(newComment)
    e.target.reset()
}

commentForm.addEventListener('submit', submitNewComment)
