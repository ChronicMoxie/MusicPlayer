var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let form = document.getElementById('form')

form.addEventListener('submit',(e) => {
    e.preventDefault()
    let url = document.getElementById('url').value
    changeVideo(url)
})
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer', {
        height: '390',
        width: '640',
        playerVars: {
            playersinline: 1,
            controls: 1, // Enable controls
            disablekb: 0,
            enablejsapi: 1,
            autoplay: 0 // Set autoplay to 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Player is ready but no video is loaded
	player.setVolume(10)
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      done = true;
    }
}

function changeVideo(url) {
    player.loadVideoById({videoId: url});
}
function playVideo(){
    player.playVideo()
}
function pauseVideo(){
    player.pauseVideo()
}
function hideVideo(){
    const element = document.querySelector('.video');
    element.style.visibility = 'hidden';
}
function showVideo(){
    const element = document.querySelector('.video');
    element.style.visibility = 'visible';
}