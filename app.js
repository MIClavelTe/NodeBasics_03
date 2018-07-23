const https = require('https');

function printMessage(user, badges, points) {
    const message = `${user} has ${badges} badge(s) and ${points} JS points`;
    console.log(message);
}

function getProfile(username) {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        let body = ""

        response.on('data', data => {
            body += data.toString();
        });

        response.on('end', () => {
            var profile = JSON.parse(body);
            printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
        });
    });
};

const users = process.argv.slice(2);
users.forEach(getProfile);