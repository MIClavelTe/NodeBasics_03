// const https = require('https');

// function printMessage(user, badges, points) {
//   const message = `${user} has ${badges} badge(s) and ${points} JS points`;
//   console.log(message);
// }

// function getProfile(username) {
//   try {
//     const request = https.get(`https://teamtreehouse.co/${username}.json`, response => {
//       let body = ""

//       response.on('data', data => {
//         body += data.toString();
//       });
  
//       response.on('end', () => {
//         var profile = JSON.parse(body);
//         printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
//       });
//     });
//   } catch(error) {
//     console.log('Error:' + error.message);
//   }
// }


// const users = process.argv.slice(2);
// users.forEach(getProfile);

// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
//___________________________________________________________________________________________________________________________

const https = require('https');

function printMessage(user, badges, points) {
  const message = `${user} has ${badges} badge(s) and ${points} JS points`;
  console.log(message);
}

function getProfile(username) {
  try {
    const request = https.get(`https://teamtreehouse./${username}.json`, response => {
      let body = ""
      
      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () => {
        var profile = JSON.parse(body);  
        console.log(username);                          
        printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
      });                          
    });
    request.on('error', error => console.error(`Error: ${error.message}`));
  } catch (error) {
    console.error(error.message);
  }
}

const users = process.argv.slice(2);
users.forEach(getProfile);