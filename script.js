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
    const inputPopup = document.getElementById('inputPopup');
    const alertPopup = document.getElementById('alert');
    const closeAlert = document.getElementById('closeAlert');
    const personNameInput = document.getElementById('personName');
    const submitName = document.getElementById('submitName');
    
    let clickedDiv;

    board.addEventListener('click', (e) => {
        if (!e.target.classList.contains('selected')) {
            inputPopup.style.display = 'flex';
            clickedDiv = e.target; // store the clicked div
        }
    });

    submitName.addEventListener('click', () => {
        if (personNameInput.value.trim()) {
            clickedDiv.classList.add('selected');
            localStorage.setItem(clickedDiv.innerText, personNameInput.value.trim());
            personNameInput.value = '';
            inputPopup.style.display = 'none';
        } else {
            alertPopup.style.display = 'flex';
            inputPopup.style.display = 'none';
        }
    });

    closeAlert.addEventListener('click', () => {
        alertPopup.style.display = 'none';
        personNameInput.value = ''; // clear the input
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

