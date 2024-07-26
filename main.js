// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}


// Accessing the error modal and its elements
const errorModal = document.querySelector('#modal');
const errorMessage = document.querySelector('#modal-message');

// Adding the 'hidden' class to the error modal initially
errorModal.classList.add('hidden');

// Function to handle heart click event
function handleHeartClick(event) {
  const heart = event.target;

  if (heart.classList.contains('activated-heart')) {
    // Heart is full, change it to empty
    heart.textContent = EMPTY_HEART;
    heart.classList.remove('activated-heart');
  } else {
    // Heart is empty, invoke mimicServerCall
    mimicServerCall()
      .then(() => {
        // Server response was successful
        heart.textContent = FULL_HEART;
        heart.classList.add('activated-heart');
      })
      .catch(error => {
        // Server response failed
        errorMessage.textContent = error;
        errorModal.classList.remove('hidden');
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  }
}

// Adding event listener to all heart elements
const hearts = document.querySelectorAll('.like-glyph');
hearts.forEach(heart => {
  heart.addEventListener('click', handleHeartClick);
});
