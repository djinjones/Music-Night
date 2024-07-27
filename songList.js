const songListButton = document.getElementById('return-button');
const songsDiv = document.querySelector('.songs');

songListButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

function displaySongs() {
    const songs = JSON.parse(localStorage.getItem('songs')) || [];

    if (songs.length > 0) {
        const ul = document.createElement('ul');

        songs.forEach((song, index) => {
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
                // Remove the song from the array
                songs.splice(index, 1);
                localStorage.setItem('songs', JSON.stringify(songs));

                // Remove the list item from the DOM
                li.remove();

                // If no songs left, show a message
                if (songs.length === 0) {
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
