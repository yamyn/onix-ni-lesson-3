const ScreenMaker = require('./ScreenMaker');
const ScreenListService = require('./dBService');

async function toMakeScreen() {
    try {
        const imgName = ScreenMaker.createScreenName();
        const screen = await ScreenMaker.makeScreen();
        await ScreenMaker.imageService.postImage(imgName, screen);
        const imgLink = await ScreenMaker.imageService.getImageLink(imgName);

        await ScreenListService.create({ screenLink: imgLink.url }).then(
            res => {
                if (res._id)
                    console.log(
                        'Photo was saved in drive and link saved in db',
                    );
                process.exit(0);
            },
        );
    } catch (error) {
        throw error;
    }
}

toMakeScreen();
