const submit = document.getElementById('submit')
const songListButton = document.getElementById('song-list-button');
const songInput = document.getElementById('song-input');

submit.addEventListener('click', (event) => {
    event.preventDefault();

    const songName = songInput.value.trim();

    if (songName) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];

        songs.push(songName);

        localStorage.setItem('songs', JSON.stringify(songs));
        
        songInput.value = '';
    }

});

songListButton.addEventListener('click', () => {
    window.location.href = 'songList.html';
});