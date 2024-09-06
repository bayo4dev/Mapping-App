'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class WorkOut {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends WorkOut {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
  }
}
class Cycling extends WorkOut {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([32, -12], 5.2, 24, 178);
const cycle1 = new Cycling([32, -12], 27, 95, 523);
console.log(run1, cycle1);

// app for the very biggest functionality.
class App {
  #map;
  #mapEvent;

  constructor() {
    this._getposition();
    form.addEventListener('submit', this._newWorkOut.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getposition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling clicks on maps
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    e.preventDefault();

    //get data from form

    //check if data is valid

    //if running running, create running object

    //if cycling creat cycling object

    //add new objrect to the workout array

    //render workout on map as a maker

    //hide the form and clear the input field


    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    const { lat, lng } = this.#mapEvent.latlng;
    const marker = L.marker([lat, lng], {
      // Customize marker options here (e.g., icon, title, draggable)
    }).addTo(this.#map);
    const popup = L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      // Use className property if needed
      className: 'running-popup', // Replace with your custom class name
    });
    // Set dynamic content using a function or template
    popup.setContent('Workout'); // Or use a function or template
    marker.bindPopup(popup).openPopup();
  }
}

const app = new App();
