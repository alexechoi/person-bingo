document.addEventListener('DOMContentLoaded', () => {
    // Clear localStorage on page refresh
    localStorage.clear();

    const board = document.querySelector('.bingo-board');
    const inputPopup = document.getElementById('inputPopup');
    const alertPopup = document.getElementById('alert');
    const closeAlert = document.getElementById('closeAlert');
    const personNameInput = document.getElementById('personName');
    const submitName = document.getElementById('submitName');
    let clickedDiv;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const shuffledItems = shuffle(data.items);
            const boardItems = shuffledItems.slice(0, 16);

            boardItems.forEach(item => {
                const div = document.createElement('div');
                div.innerText = item;
                div.addEventListener('click', () => {
                    if (!div.classList.contains('selected')) {
                        inputPopup.style.display = 'flex';
                        clickedDiv = div;
                    } else {  // Unselect and remove from localStorage if already selected
                        div.classList.remove('selected');
                        localStorage.removeItem(div.innerText);
                    }
                });
                board.appendChild(div);
            });
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
        personNameInput.value = '';
    });

    const namesPopup = document.getElementById('namesPopup');
    const namesList = document.getElementById('namesList');
    const showNamesBtn = document.getElementById('showNamesBtn');
    const closePopup = document.getElementById('closePopup');

    showNamesBtn.addEventListener('click', () => {
        namesList.innerHTML = '';
        if (localStorage.length === 0) {
            namesList.innerHTML = 'You have not completed any tiles yet!';
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const listItem = document.createElement('li');
                const span = document.createElement('span');
                span.textContent = key;
                listItem.appendChild(span);
                listItem.appendChild(document.createTextNode(`: ${value} `));

                // Adding remove button
                const removeBtn = document.createElement('button');
                removeBtn.innerText = 'Remove';
                removeBtn.addEventListener('click', () => {
                    localStorage.removeItem(key);
                    listItem.remove();
                    Array.from(board.children).forEach(div => {
                        if (div.innerText === key) {
                            div.classList.remove('selected');
                        }
                    });
                });
                listItem.appendChild(removeBtn);

                namesList.appendChild(listItem);
            }
        }
        namesPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', () => {
        namesPopup.style.display = 'none';
    });

    // Close popups when clicking on the dark translucent background
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    });
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
