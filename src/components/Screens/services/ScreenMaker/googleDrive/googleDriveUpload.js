const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const path = require('path');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS = path.join(__dirname, 'credentials.json');

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0],
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * @function
 * @param {string} imgName - name for create screen in google drive
 * @param {string} imgPath - path to current screen
 * @param {function} getLink - callback function, that get link for access to img
 * @returns {undefined}
 */
function postFoto(imgName, imgPath, getLink) {
    fs.readFile(CREDENTIALS, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), auth => {
            const drive = google.drive({ version: 'v3', auth });
            const folderId = '1CuP6rNnLPzjZi3buvpyH1iE3m1X33_Yd';

            const fileMetadata = {
                name: `${imgName}`,
                parents: [folderId],
            };
            const media = {
                mimeType: 'image/png',
                body: fs.createReadStream(imgPath),
            };
            drive.files.create(
                {
                    resource: fileMetadata,
                    media: media,
                    fields: 'id',
                },
                async (error, res) => {
                    try {
                        const screenLink = `https://drive.google.com/open?id=${res.data.id}`;
                        await getLink({ screenLink });
                        fs.unlink(imgPath, error => {
                            if (error) throw error;
                            console.log(
                                'Photo was saved in drive and link saved in db',
                            );
                            process.exit(0);
                        });
                    } catch (error) {
                        throw error;
                    }
                },
            );
        });
    });
}

module.exports = postFoto;
