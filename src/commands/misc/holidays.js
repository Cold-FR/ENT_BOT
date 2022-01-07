const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const nearest = require('nearest-date');
const timediff = require('timediff');
class HolidaysCommand extends Command {
  constructor() {
    super('holidays', {
      aliases: ['vacances', 'holidays']
    });
  }

  exec(message) {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if(month < 10) month = '0' + month;
    let day = date.getDate();
    if(day < 10) day = '0' + day;
    let hour = date.getHours();
    if(hour < 10) hour = '0' + hour;
    let minute = date.getMinutes();
    if(minute < 10) minute = '0' + minute;
    let second = date.getSeconds();
    if(second < 10) second = '0' + second;
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

      return message.reply(`Il reste **${timerHolidays.months}** mois, **${timerHolidays.weeks}** semaine(s), **${timerHolidays.days}** jour(s), **${timerHolidays.hours}** heure(s) et **${timerHolidays.minutes}** minute(s) avant les **${holidaysDescr[nearestHolidays]}** le **${nearestHolidaysDate.getDate()}/${nearestHolidaysDate.getMonth()}/${nearestHolidaysDate.getFullYear()} à ${nearestHolidaysDate.getHours()}:${'0' + nearestHolidaysDate.getMinutes()}** !`);
    });
  }
}

module.exports = HolidaysCommand;