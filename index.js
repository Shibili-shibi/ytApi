var express = require("express");
var ytfps = require('ytfps');
var ytdl = require('ytdl-core');
var ytch = require('yt-channel-info')

var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/getPlayListVideos', function(req, res) {

    let playlistId = req.query.playlistId;

    ytfps(playlistId).then(playlist => {
        res.json(playlist);
    }).
    catch (err => {
        console.log(err);
    });

});

app.get('/getVideoInfo', async(req, res) => {

    let videoId = req.query.videoId;

    let info = await ytdl.getBasicInfo(videoId);

    res.json(info)

});

app.get('/getChannelVideos', async(req, res) => {

    const channelId = req.query.channelId;

    ytch.getChannelVideos(channelId, 'newest', 0).then((response) => {
        res.json(response)
    }).
    catch ((err) => {
        console.log(err)
    });

});

app.get('/getChannelVideosCtn', async(req, res) => {

    const continuation = req.query.continuation;

    ytch.getChannelVideosMore(continuation).then((response) => {
        res.json(response)
    }).
    catch ((err) => {
        console.log(err)
    })

});

app.listen(app.get('port'), () => {
    console.log("app running on " + app.get('port'))
});