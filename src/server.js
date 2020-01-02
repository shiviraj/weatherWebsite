const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geoCode, getForecastDetails } = require('./weatherLib');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));

const port = process.env.PORT || 3000;

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Shivi'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Shivi'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Shivi'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'provide an address' });
  }
  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    getForecastDetails(data, (error, { location, daily, currently }) => {
      if (error) {
        return res.send({ error: 'Unable to connect to weather service' });
      }
      res.send({
        address: req.query.address,
        location,
        dailySummary: daily.data[0].summary,
        currentTemp: currently.temperature,
        summary: daily.summary,
        precipType: currently.precipType,
        precipProb: currently.precipProbability
      });
    });
  });
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'Provide search term' });
  }
  res.send({ name: 'Shivi' });
});
app.get('/help/*', (req, res) => {
  res.render('help', {
    title: 'Help',
    error: 'Help article not found',
    name: 'Shivi'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    error: 'Page not found',
    name: 'Shivi'
  });
});

app.listen(port, () => console.log('server is on'));
