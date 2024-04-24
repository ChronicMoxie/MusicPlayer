var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let form = document.getElementById('form')

let userInteracted = false;

document.addEventListener('click', function() {
    userInteracted = true;
    console.log('User has interacted with the page!');
});


form.addEventListener('submit',(e) => {
    e.preventDefault()
    let url = document.getElementById('url').value
    changeVideo(url)
})
var player;
var done = false;  // Define done at a global scope

function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer', {
        height: '390',
        width: '640',
        playerVars: {
            playsinline: 1,  // Corrected typo here
            controls: 1,
            disablekb: 0,
            enablejsapi: 1,
            autoplay: 1,
            mute: 1
        },
        events: {
            'onError': onPlayerError,
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

    // Define the onError event handler
    function onPlayerError(event) {
          console.log('Unknown error occurred.');
      }
    

function onPlayerReady(event) {
    // Player is ready but no video is loaded
    player.setVolume(10);

    // Add allow="autoplay" to the iframe
    var iframe = document.querySelector('#videoPlayer iframe');
    if (iframe) {
        iframe.setAttribute('allow', 'autoplay');
    }
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function changeVideo(url) {
    player.loadVideoById({videoId: url});
}
function playVideo() {
    console.log("Attempting to play video...");
    if (userInteracted) {
        console.log("User has interacted, playing video.");
        player.playVideo();
    } else {
        console.log("The video cannot play yet because there hasn't been a user interaction.");
    }
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