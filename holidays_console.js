const fetch = require('node-fetch');
const nearest = require('nearest-date');
const timediff = require('timediff');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1 < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1;
const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
let holidays = [];
let holidaysDescr = [];

fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=start_date%3E=%22${year}-${month}-${day}T${hour}:${minute}:${second}%22&lang=fr&facet=description&facet=population&facet=start_date&facet=end_date&facet=zones&facet=annee_scolaire&refine.zones=Zone+B&refine.annee_scolaire=2021-2022&refine.location=Reims&exclude.population=Enseignants`, {
  method: 'GET'
}).then((response) => {
  return response.json();
}).then((data) => {
  data.records.forEach(element => {
    holidays.push(new Date(element.fields.start_date));
    holidaysDescr.push(element.fields.description);
  });

  const nearestHolidays = nearest(holidays, date);
  const nearestHolidaysDate = new Date(holidays[nearestHolidays]);
  nearestHolidaysDate.setDate(nearestHolidaysDate.getDate() - 1);
  nearestHolidaysDate.setHours(18);
  let timerHolidays = timediff(date, nearestHolidaysDate, 'MWDHm');
  const dateHolidays = [
    nearestHolidaysDate.getDate() < 10 ? '0' + nearestHolidaysDate.getDate() : nearestHolidaysDate.getDate(),
    nearestHolidaysDate.getMonth() + 1 < 10 ? '0' + parseInt(nearestHolidaysDate.getMonth() + 1) : nearestHolidaysDate.getMonth() + 1,
    nearestHolidaysDate.getMinutes() < 10 ? '0' + nearestHolidaysDate.getMinutes() : nearestHolidaysDate.getMinutes()
  ];

  return console.log(`Il reste ${timerHolidays.months} mois, ${timerHolidays.weeks} semaine(s), ${timerHolidays.days} jour(s), ${timerHolidays.hours} heure(s) et ${timerHolidays.minutes} minute(s) avant les ${holidaysDescr[nearestHolidays]} le Vendredi ${dateHolidays[0]}/${dateHolidays[1]}/${nearestHolidaysDate.getFullYear()} à ${nearestHolidaysDate.getHours()}:${dateHolidays[2]} !`);
});