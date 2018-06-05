//Add eventlistener
document.querySelector('#loan-form').addEventListener('submit', function(e) {
  //Hide results
  document.querySelector('#results').style.display = 'none';

  // Show Loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculate, 1000);

  // Show loader

  e.preventDefault();
});

function calculate() {
  // Get elements
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const totalPayment = document.querySelector('#total-payment');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //Show results
    document.querySelector('#results').style.display = 'block';

    // Hide Loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }

}

function showError(error){
  //Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add a class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds
  setTimeout(clearError, 1500);

  // Hide Results
  document.querySelector('#loading').style.display = 'none';
  document.querySelector('#results').style.display = 'none';

}

function clearError(){
  document.querySelector('.alert').remove();
}
