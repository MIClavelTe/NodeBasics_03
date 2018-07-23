const https = require('https');

function printMessage(user, badges, points) {
  const message = `${user} has ${badges} badge(s) and ${points} JS points`;
  console.log(message);
}

function printError(message) {
  console.error(message);
}

function getProfile(username) {
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      let body = ""
      
      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () => {
        try {
          var profile = JSON.parse(body);  
          console.log(username);                          
          printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
        } catch (error) {
          console.error('Your input does not exist');
        }
      });  

    });
    request.on('error', error => console.error(`Problem with request`));
  } catch (error) {
    printError('Problem with Request');
  }
}

const users = process.argv.slice(2);
users.forEach(getProfile);