// Event to validate form inputs and showing success tab on successfull validation
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const eventDate = document.getElementById('eventDate');
  const tickets = document.getElementById('tickets');
  const successContainer = document.querySelector('.container.success');
  const fillableFormContainer = document.querySelector('.container.form');
  let allValid = true;

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  allValid = allValid && validateField(name, nameRegex);
  allValid = allValid && validateField(email, emailRegex);
  allValid = allValid && validateField(phone, phoneRegex);

  if (!isValidDate(eventDate.value)) {
      showError(eventDate, 'Please enter a valid date in MM/DD/YYYY format');
      allValid = false;
  } else {
      showSuccess(eventDate);
  }

  if (tickets.value < 1 || tickets.value > 10) {
      showError(tickets, 'Number of tickets must be between 1 and 10');
      allValid = false;
  } else {
      showSuccess(tickets);
  }

  if (allValid) {
    hideShow(fillableFormContainer, successContainer, 'flex');
  }
});

// Event to reset the form and moving back to the form incase a user wants to register other tickets
document.querySelector('.container.success > p:last-of-type').addEventListener('click', function (event) {
  event.preventDefault();

  const successContainer = document.querySelector('.container.success');
  const fillableFormContainer = document.querySelector('.container.form');
  const registrationForm = document.getElementById('registrationForm');

  hideShow(successContainer, fillableFormContainer, 'block');
  registrationForm.reset();
})


function validateField(field, regex) {
  if (!regex.test(field.value)) {
      showError(field, 'Invalid input');
      return false;
  } else {
      showSuccess(field);
      return true;
  }
}

function isValidDate(dateString) {
  const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  return dateRegex.test(dateString);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');
  small.innerText = message;
  small.style.display = 'block';
  input.style.borderColor = 'red';
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');
  small.style.display = 'none';
  input.style.borderColor = '#ccc';
}

function hideShow(toBeHidden, toBeShown, display_type) {
  toBeHidden.style.display = 'none';
  toBeShown.style.display = display_type;
}
