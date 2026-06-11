document.querySelector('.item-window').addEventListener('click', (event) => {
  event.stopPropagation();
  
  const windowMenu = document.querySelector(".item-windows");
  if (windowMenu) {
    windowMenu.classList.toggle('active');
  }
});

document.querySelector('.wifi-container').addEventListener('click', (event) => {
  event.stopPropagation();
  
  const wifiModal = document.querySelector('.wifi-modal-container');
  if (wifiModal) {
    wifiModal.classList.toggle('active');
  }
});

document.querySelector('.date-container').addEventListener('click', (event) => {
  event.stopPropagation();
  
  const dateContainer = document.querySelector(".date-container");
  if (dateContainer) {
    document.querySelector('.time-container-p').classList.toggle('active');
  }
});

document.querySelector('.kboard-container').addEventListener('click', (event) => {
  event.stopPropagation();
  
  const kboardModal = document.querySelector('.kboard-modal-container');
  if (kboardModal) {
    kboardModal.classList.toggle('active');
    
    if (kboardModal.classList.contains('active')) {
      if (typeof startTyping === 'function') startTyping();
    } else {
      if (kboardModal) kboardModal.innerHTML = '';
    }
  }
});



document.addEventListener("click", (e) => {
  const windowMenu = document.querySelector(".item-windows");
  const wifiModal = document.querySelector('.wifi-modal-container');
  const dateContainer = document.querySelector(".date-container");
  const kboardModal = document.querySelector('.kboard-modal-container');

  if (dateContainer && !dateContainer.contains(e.target)) {
    document.querySelector('.time-container-p').classList.remove('active');
  }

  if (windowMenu && !windowMenu.contains(e.target)) {
    windowMenu.classList.remove('active');
  }

  if (wifiModal && !wifiModal.contains(e.target)) {
    wifiModal.classList.remove('active');
  }

  if (kboardModal && !kboardModal.contains(e.target)) {
    kboardModal.classList.remove('active');
    kboardModal.innerHTML = '';
  }
});

const nextDay = () => console.log('qwe');


document.addEventListener('click', (e) => {
  e.target.classList.contains('note-item') ? e.target.classList.toggle('active') : '';


})


document.querySelector('.chrome-nav-btn-reload').addEventListener('click', () => {
  document.querySelector('.chrome-nav-btn-reload').classList.toggle('reload-animation');
  setTimeout(() => document.querySelector('.chrome-nav-btn-reload').classList.toggle('reload-animation'), 1000)
});