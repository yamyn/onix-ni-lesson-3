const ScreenMaker = require('./ScreenMaker');
const ScreenListService = require('./dBService');

(async () => {
    try {
        const imgName = ScreenMaker.createScreenName();
        const imgPath = await ScreenMaker.makeScreen(imgName);
        ScreenMaker.postImage(imgName, imgPath, ScreenListService.create);
    } catch (error) {
        throw error;
    }
})();
