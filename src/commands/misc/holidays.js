const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class HolidaysCommand extends Command {
  constructor() {
    super('holidays', {
      aliases: ['vacances', 'holiday']
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
    
    fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=start_date%3E=%22${year}-${month}-${day}T${hour}:${minute}:${second}%22&lang=fr&facet=description&facet=population&facet=start_date&facet=end_date&facet=zones&facet=annee_scolaire&refine.zones=Zone+B&refine.annee_scolaire=2021-2022&refine.location=Reims&exclude.population=Enseignants`, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      data.records.forEach(element => {
        console.log('\n' + element.fields.description);
        console.log(element.fields);
        /*
        array.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.date) - new Date(a.date);
});
*/
      });
    });
  }
}

module.exports = HolidaysCommand;