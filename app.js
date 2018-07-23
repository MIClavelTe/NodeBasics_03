const https = require('https');
const users = process.argv.slice(2);

function printMessage(user, badges, points) {
  const message = `${user} has ${badges} badge(s) and ${points} JS points`;
  console.log(message);
}

function getProfile(username) {
  try {
    const request = https.get(`https://teamtreehouse.c/${username}.json`, response => {
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
          console.error(users + ' does not exist');
        }
      });  

    });
    request.on('error', error => console.error(`Problem with request`));
  } catch (error) {
    console.error('Problem with Request');
  }
}

users.forEach(getProfile);