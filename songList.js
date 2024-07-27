const songListButton = document.getElementById('return-button');
const songsDiv = document.querySelector('.songs');

songListButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

function displaySongs() {
    // Retrieve the songs from localStorage or initialize to an empty array
    let songs = JSON.parse(localStorage.getItem('songs')) || [];

    // Check if the songs have already been shuffled and stored
    let shuffledSongs = JSON.parse(localStorage.getItem('shuffledSongs'));
    if (!shuffledSongs || shuffledSongs.length !== songs.length) {
        shuffledSongs = songs.slice(); // Copy the songs array

        // Shuffle the array using the Fisher-Yates algorithm
        for (let i = shuffledSongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
        }

        // Store the shuffled order in localStorage
        localStorage.setItem('shuffledSongs', JSON.stringify(shuffledSongs));
    }

    if (shuffledSongs.length > 0) {
        const ul = document.createElement('ul');

        shuffledSongs.forEach((song, index) => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            const buttonStrike = document.createElement('button');
            const deleteButton = document.createElement('button');

            p.textContent = "◽ " + song;
            buttonStrike.textContent = '✅';
            deleteButton.textContent = '❌';
            p.classList.add('song-text');
            buttonStrike.classList.add('button-strike');
            deleteButton.classList.add('delete-button');

            // Event listener for strike-through button
            buttonStrike.addEventListener('click', () => {
                p.style.textDecoration = p.style.textDecoration === 'line-through' ? '' : 'line-through';
            });

            // Event listener for delete button
            deleteButton.addEventListener('click', () => {
                // Remove the song from the shuffled array
                shuffledSongs.splice(index, 1);
                localStorage.setItem('shuffledSongs', JSON.stringify(shuffledSongs));

                // Remove the song from the original songs array
                const originalIndex = songs.indexOf(song);
                if (originalIndex !== -1) {
                    songs.splice(originalIndex, 1);
                    localStorage.setItem('songs', JSON.stringify(songs));
                }

                // Remove the list item from the DOM
                li.remove();

                // If no songs left, show a message
                if (shuffledSongs.length === 0) {
                    songsDiv.textContent = 'No songs added yet';
                }
            });

            li.appendChild(p);
            li.appendChild(buttonStrike);
            li.appendChild(deleteButton);
            li.classList.add('song-item');
            ul.appendChild(li);
        });

        songsDiv.appendChild(ul);
    } else {
        songsDiv.textContent = 'No songs added yet';
    }
}

document.addEventListener('DOMContentLoaded', displaySongs);


