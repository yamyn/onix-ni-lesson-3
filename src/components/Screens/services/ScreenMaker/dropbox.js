const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');

const dropbox = new Dropbox({
    accessToken:
        'MNnmrb80hFAAAAAAAAAAKeNymkKecscP2z8dyia4ciTpwdRsLoHTWaN4USzDFC9W',
    fetch,
});

async function postImage(screenName, screen) {
    return dropbox.filesUpload({
        path: `/users_table_screens/${screenName}.png`,
        contents: screen,
    });
}

async function getImageLink(screenName) {
    return dropbox.sharingCreateSharedLinkWithSettings({
        path: `/users_table_screens/${screenName}.png`,
    });
}

module.exports = {
    postImage,
    getImageLink,
};
