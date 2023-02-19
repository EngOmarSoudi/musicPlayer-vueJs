export default {
    formatTime ( time )
    {
        let minutes = Math.floor( time / 60 ) || 0;
        let seconds = Math.round((time - minutes * 60) || 0);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }
}