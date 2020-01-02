const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

message1.textContent = '';
message2.textContent = '';
const displayReport = () => {
  weatherForm.addEventListener('submit', event => {
    event.preventDefault();
    const location = search.value;
    fetch(`/weather?address=${location}`).then(response => {
      response.json().then(data => {
        if (data.error) {
          message1.textContent = data.error;
          return (message2.textContent = '');
        }
        message1.textContent = data.location;
        let report = data.dailySummary + '\nCurrent temp is ';
        report += data.currentTemp + '.\nThe probability of ';
        report += data.precipType + ' is ' + data.precipProb;
        message2.textContent = report + '.\n' + data.summary;
      });
    });
  });
};
displayReport();
