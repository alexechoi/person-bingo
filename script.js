fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const shuffledItems = shuffle(data.items);
        const boardItems = shuffledItems.slice(0, 20); // Only need 20 items for 5x4

        const board = document.querySelector('.bingo-board');
        boardItems.forEach(item => {
            const div = document.createElement('div');
            div.innerText = item;
            div.addEventListener('click', () => div.classList.toggle('selected'));
            board.appendChild(div);
        });
    });

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Enter names and overlay

document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.bingo-board');
    
    board.addEventListener('click', (e) => {
        if (e.target.classList.contains('selected')) {
            const personName = prompt('Enter the name of the person:');
            if (personName) {
                localStorage.setItem(e.target.innerText, personName);
            }
        }
    });

    const namesPopup = document.getElementById('namesPopup');
    const namesList = document.getElementById('namesList');
    const showNamesBtn = document.getElementById('showNamesBtn');
    const closePopup = document.getElementById('closePopup');

    showNamesBtn.addEventListener('click', () => {
        namesList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const listItem = document.createElement('li');
            listItem.textContent = `${key}: ${value}`;
            namesList.appendChild(listItem);
        }
        namesPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', () => {
        namesPopup.style.display = 'none';
    });
});

