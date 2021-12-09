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
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    
    fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=start_date%3E=%22${year}-${month}-${day}T${hour}:${minute}:${second}Z%22&lang=fr&facet=description&facet=population&facet=start_date&facet=end_date&facet=zones&facet=annee_scolaire&refine.zones=Zone+B&refine.annee_scolaire=2021-2022&refine.location=Reims`, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {

    });
  }
}

module.exports = HolidaysCommand;