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
