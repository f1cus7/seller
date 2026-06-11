let CompanyName = "ficus comp";
let lastOpenedChromeTab = Number(localStorage.getItem("chromeTab")) || 1;
let typingTimer = null;
let lastUpdate = localStorage.getItem("promo_last_update");
let balance = 1000;
let promoState = {
  codes: ["", "", "", "", ""],
  active: [false, false, false, false, false],
  bonuses: [15, 35, 75, 10, 25],
  lastUpdate: "",
  isFirstAdWatched: false,
  isSecondAdWatched: false,
};


// начало нодов приложений
let isChromeActive = false;
let isShopActive = false;
let isSupplierActive = false;
let isBankActive = false;
let isStocksActive = false;
let isLiderboardActive = false;
let isUpgradeActive = false;
let isSettingsActive = false;

const ShopNode = document.querySelector(".shop__screen");
const ShopBottomNode = document.querySelector(".item-shop-bottom");
const ChromeNode = document.querySelector(".chrome__screen");
const ChromeBottomNode = document.querySelector(".item-chrome-bottom");
const SupplierNode = document.querySelector(".supplier__screen");
const SupplierBottomNode = document.querySelector(".item-supplier-bottom");
const BankNode = document.querySelector(".bank__screen");
const BankBottomNode = document.querySelector(".item-bank-bottom");
const StocksNode = document.querySelector(".stocks__screen");
const StocksBottomNode = document.querySelector(".item-stocks-bottom");
const LiderboardNode = document.querySelector(".liderboard__screen");
const LiderboardBottomNode = document.querySelector(".item-liderboard-bottom");
const UpgradeNode = document.querySelector(".upgrade__screen");
const UpgradeBottomNode = document.querySelector(".item-upgrade-bottom");
const SettingsNode = document.querySelector(".settings__screen");
const SettingsBottomNode = document.querySelector(".item-settings-bottom");



// начало промокодов

function generateCode(length = 5) {
  const letters = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ";

  return Array.from(
    { length },
    () => letters[Math.floor(Math.random() * letters.length)],
  ).join("");
}

function saveState() {
  localStorage.setItem("promoState", JSON.stringify(promoState));
}

function loadState() {
  const savedState = localStorage.getItem("promoState");

  if (savedState) {
    promoState = JSON.parse(savedState);
  }
}

function getTodayDate() {
  return new Date().toLocaleDateString("sv-SE");
}

function needUpdate() {
  return promoState.lastUpdate !== getTodayDate();
}

function updatePromocodes() {
  promoState.codes = promoState.codes.map(() => generateCode());

  promoState.active = promoState.active.map(() => false);

  promoState.lastUpdate = getTodayDate();

  saveState();
}

function initPromocodes() {
  loadState();

  if (needUpdate()) {
    updatePromocodes();
  }
}

initPromocodes();

document.querySelector(".chrome-promocodes-column-epic").innerHTML += `
<div class="closed-ad-promocode-1"><p>Откроется 
после получения стандартного промокода</p></div>
`;

document.querySelector(".chrome-promocodes-column-legendary").innerHTML += `
<div class="closed-ad-promocode-2"><p>Откроется 
после получения эпического промокода</p></div>
`;

// конец промокодов



// начало кода для панели вкладок винды
const getCurrDate = () => {
  return new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getCurrTime = () => {
  return new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const dateContainer = document.querySelector(".date-container-p");
const noteDateContainer = document.querySelector(".note-date-container");
const timeContainer = document.querySelector(".time-container-p");

setInterval(() => {
  if (timeContainer) timeContainer.innerHTML = getCurrTime();
}, 1000);

if (dateContainer) dateContainer.innerHTML = getCurrDate();
if (noteDateContainer) noteDateContainer.innerHTML = getCurrDate();

const startTyping = () => {
  const kboardModal = document.querySelector(".kboard-modal-container");
  if (!kboardModal) return;

  clearInterval(typingTimer);

  kboardModal.innerHTML = `<span class="typing-text"></span><span class="typing-cursor">|</span>`;

  const textContainer = kboardModal.querySelector(".typing-text");
  const cursorContainer = kboardModal.querySelector(".typing-cursor");

  let index = 0;

  typingTimer = setInterval(() => {
    if (index < CompanyName.length) {
      textContainer.innerHTML += CompanyName[index];
      index++;
    } else {
      clearInterval(typingTimer);
      if (cursorContainer) cursorContainer.remove();
    }
  }, 200);
};

document.querySelector(".main_screen-bottom-left").textContent = CompanyName;

const mainNode = document.querySelector(".main__screen");

// конец кода для панели вкладок винды

// chrome

document.querySelectorAll(".chrome-tab").forEach((tab) => {
  tab.addEventListener("click", chromeTab);
});

function chromeTab(e) {
  if (e.currentTarget.id === "tab-chrome-1") {
    lastOpenedChromeTab = 1;
    document.querySelector(".chrome-screen-kitties").classList.remove("d-none");
    document.querySelector(".chrome-screen-capybaras").classList.add("d-none");
    document.querySelector(".chrome-screen-promocodes").classList.add("d-none");
    document.getElementById("tab-chrome-1").classList.add("active");
    document.getElementById("tab-chrome-2").classList.remove("active");
    document.getElementById("tab-chrome-3").classList.remove("active");
  } else if (e.currentTarget.id === "tab-chrome-2") {
    lastOpenedChromeTab = 2;
    document.querySelector(".chrome-screen-kitties").classList.add("d-none");
    document
      .querySelector(".chrome-screen-capybaras")
      .classList.remove("d-none");
    document.querySelector(".chrome-screen-promocodes").classList.add("d-none");
    document.getElementById("tab-chrome-1").classList.remove("active");
    document.getElementById("tab-chrome-2").classList.add("active");
    document.getElementById("tab-chrome-3").classList.remove("active");
  } else if (e.currentTarget.id === "tab-chrome-3") {
    lastOpenedChromeTab = 3;
    document.querySelector(".chrome-screen-kitties").classList.add("d-none");
    document.querySelector(".chrome-screen-capybaras").classList.add("d-none");
    document
      .querySelector(".chrome-screen-promocodes")
      .classList.remove("d-none");
    document.getElementById("tab-chrome-1").classList.remove("active");
    document.getElementById("tab-chrome-2").classList.remove("active");
    document.getElementById("tab-chrome-3").classList.add("active");
  }
}

const openChrome = () => {
  if (!isChromeActive) {
    isChromeActive = true;
    isShopActive = false;
    isSupplierActive = false;
    isBankActive = false;
    isStocksActive = false;
    isLiderboardActive = false;
    isUpgradeActive = false;
    isSettingsActive = false;
    ChromeBottomNode.classList.add("bottom-opened-icon");
    ShopBottomNode.classList.remove("bottom-opened-icon");
    SupplierBottomNode.classList.remove("bottom-opened-icon");
    BankBottomNode.classList.remove("bottom-opened-icon");
    StocksBottomNode.classList.remove("bottom-opened-icon");
    LiderboardBottomNode.classList.remove("bottom-opened-icon");
    UpgradeBottomNode.classList.remove("bottom-opened-icon");
    SettingsBottomNode.classList.remove("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "none";
    SupplierNode.style.display = "none";
    BankNode.style.display = "none";
    StocksNode.style.display = "none";
    LiderboardNode.style.display = "none";
    UpgradeNode.style.display = "none";
    SettingsNode.style.display = "none";
    ChromeNode.style.display = "flex";
    if (lastOpenedChromeTab === 1) {
      document
        .querySelector(".chrome-screen-kitties")
        .classList.remove("d-none");
      document
        .querySelector(".chrome-screen-capybaras")
        .classList.add("d-none");
      document
        .querySelector(".chrome-screen-promocodes")
        .classList.add("d-none");
      document.getElementById("tab-chrome-1").classList.add("active");
      document.getElementById("tab-chrome-2").classList.remove("active");
      document.getElementById("tab-chrome-3").classList.remove("active");
    } else if (lastOpenedChromeTab === 2) {
      document.querySelector(".chrome-screen-kitties").classList.add("d-none");
      document
        .querySelector(".chrome-screen-capybaras")
        .classList.remove("d-none");
      document
        .querySelector(".chrome-screen-promocodes")
        .classList.add("d-none");
      document.getElementById("tab-chrome-1").classList.remove("active");
      document.getElementById("tab-chrome-2").classList.add("active");
      document.getElementById("tab-chrome-3").classList.remove("active");
    } else if (lastOpenedChromeTab === 3) {
      document.querySelector(".chrome-screen-kitties").classList.add("d-none");
      document
        .querySelector(".chrome-screen-capybaras")
        .classList.add("d-none");
      document
        .querySelector(".chrome-screen-promocodes")
        .classList.remove("d-none");
      document.getElementById("tab-chrome-1").classList.remove("active");
      document.getElementById("tab-chrome-2").classList.remove("active");
      document.getElementById("tab-chrome-3").classList.add("active");
    }
  } else {
    return;
  }
};

const closeChrome = () => {
  isChromeActive = false;
  ChromeBottomNode.classList.remove("bottom-opened-icon");
  mainNode.style.display = "flex";
  ChromeNode.style.display = "none";
};

function updatePromocodeTimer() {
  const timerElement = document.querySelector(".chrome-promocodes-update");

  const now = new Date();

  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);

  const diff = tomorrow - now;

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  timerElement.textContent = `Обновление через: ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

updatePromocodeTimer();
setInterval(updatePromocodeTimer, 1000);

window.openPromocodes = (promo) => {
  console.log(promo);
  if (promo.classList.contains("chrome-promocodes-column-standard")) {
    document.querySelector(".promo-open-standard").innerHTML =
      promoState.codes[0];
    document.querySelector(".closed-ad-promocode-1").classList.add("d-none");
    document.querySelector(".promocodes-img-ad-1").classList.add("d-none");
    promoState.isFirstAdWatched = true;
    saveState();
  } else if (promo.classList.contains("chrome-promocodes-column-epic")) {
    if (promoState.isFirstAdWatched === true) {
      document.querySelector(".promo-open-epic").innerHTML =
        promoState.codes[1];
      document.querySelector(".closed-ad-promocode-2").classList.add("d-none");
      document.querySelector(".promocodes-img-ad-2").classList.add("d-none");
      promoState.isSecondAdWatched = true;
      saveState();
    }
  } else if (promo.classList.contains("chrome-promocodes-column-legendary")) {
    if (promoState.isSecondAdWatched === true) {
      document.querySelector(".promo-open-legendary").innerHTML =
        promoState.codes[2];
      document.querySelector(".promocodes-img-ad-3").classList.add("d-none");
      saveState();
    }
  } else if (promo.classList.contains("chrome-promocodes-column-default")) {
    document.querySelector(".promo-open-default").innerHTML =
      promoState.codes[3];
    saveState();
  } else if (promo.classList.contains("chrome-promocodes-column-everyday")) {
    document.querySelector(".promo-open-everyday").innerHTML =
      promoState.codes[4];
    saveState();
  }
};

setInterval(() => {
  localStorage.setItem("chromeTab", lastOpenedChromeTab);
}, 1000);


// начало магазина

const openShop = () => {
  if (!isShopActive) {
    isChromeActive = false;
    isShopActive = true;
    isSupplierActive = false;
    isBankActive = false;
    isStocksActive = false;
    isLiderboardActive = false;
    isUpgradeActive = false;
    isSettingsActive = false;
    ChromeBottomNode.classList.remove("bottom-opened-icon");
    ShopBottomNode.classList.add("bottom-opened-icon");
    SupplierBottomNode.classList.remove("bottom-opened-icon");
    BankBottomNode.classList.remove("bottom-opened-icon");
    StocksBottomNode.classList.remove("bottom-opened-icon");
    LiderboardBottomNode.classList.remove("bottom-opened-icon");
    UpgradeBottomNode.classList.remove("bottom-opened-icon");
    SettingsBottomNode.classList.remove("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "flex";
    ChromeNode.style.display = "none";
    SupplierNode.style.display = "none";
    BankNode.style.display = "none";
    StocksNode.style.display = "none";
    LiderboardNode.style.display = "none";
    UpgradeNode.style.display = "none";
    SettingsNode.style.display = "none";
  } else {
    return;
  }
};

// конец магазина

// начало поставщика

const openSupplier = () => {
  if (!isSupplierActive) {
    isChromeActive = false;
    isShopActive = false;
    isSupplierActive = true;
    isBankActive = false;
    isStocksActive = false;
    isLiderboardActive = false;
    isUpgradeActive = false;
    isSettingsActive = false;
    ChromeBottomNode.classList.remove("bottom-opened-icon");
    ShopBottomNode.classList.remove("bottom-opened-icon");
    SupplierBottomNode.classList.add("bottom-opened-icon");
    BankBottomNode.classList.remove("bottom-opened-icon");
    StocksBottomNode.classList.remove("bottom-opened-icon");
    LiderboardBottomNode.classList.remove("bottom-opened-icon");
    UpgradeBottomNode.classList.remove("bottom-opened-icon");
    SettingsBottomNode.classList.remove("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "none";
    ChromeNode.style.display = "none";
    SupplierNode.style.display = "flex";
    BankNode.style.display = "none";
    StocksNode.style.display = "none";
    LiderboardNode.style.display = "none";
    UpgradeNode.style.display = "none";
    SettingsNode.style.display = "none";
  } else {
    return;
  }
};

// конец поставщика

// начало банка

const openBank = () => {
  if (!isBankActive) {
    isChromeActive = false;
    isShopActive = false;
    isSupplierActive = false;
    isBankActive = true;
    isStocksActive = false;
    isLiderboardActive = false;
    isUpgradeActive = false;
    isSettingsActive = false;
    ChromeBottomNode.classList.remove("bottom-opened-icon");
    ShopBottomNode.classList.remove("bottom-opened-icon");
    SupplierBottomNode.classList.remove("bottom-opened-icon");
    BankBottomNode.classList.add("bottom-opened-icon");
    StocksBottomNode.classList.remove("bottom-opened-icon");
    LiderboardBottomNode.classList.remove("bottom-opened-icon");
    UpgradeBottomNode.classList.remove("bottom-opened-icon");
    SettingsBottomNode.classList.remove("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "none";
    ChromeNode.style.display = "none";
    SupplierNode.style.display = "none";
    BankNode.style.display = "flex";
    StocksNode.style.display = "none";
    LiderboardNode.style.display = "none";
    UpgradeNode.style.display = "none";
    SettingsNode.style.display = "none";
  } else {
    return;
  }
};

// конец банка

// начало акций

const openStocks = () => {
  if (!isStocksActive) {
    isChromeActive = false;
    isShopActive = false;
    isSupplierActive = false;
    isBankActive = false;
    isStocksActive = true;
    isLiderboardActive = false;
    isUpgradeActive = false;
    isSettingsActive = false;
    ChromeBottomNode.classList.remove("bottom-opened-icon");
    ShopBottomNode.classList.remove("bottom-opened-icon");
    SupplierBottomNode.classList.remove("bottom-opened-icon");
    BankBottomNode.classList.remove("bottom-opened-icon");
    StocksBottomNode.classList.add("bottom-opened-icon");
    LiderboardBottomNode.classList.remove("bottom-opened-icon");
    UpgradeBottomNode.classList.remove("bottom-opened-icon");
    SettingsBottomNode.classList.remove("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "none";
    ChromeNode.style.display = "none";
    SupplierNode.style.display = "none";
    BankNode.style.display = "none";
    StocksNode.style.display = "flex";
    LiderboardNode.style.display = "none";
    UpgradeNode.style.display = "none";
    SettingsNode.style.display = "none";
  } else {
    return;
  }
};

// конец акций

// начало лидерборда

const openLiderboard = () => {
  if (!isLiderboardActive) {
    isChromeActive = false;
    isShopActive = false;
    isSupplierActive = false;
    isBankActive = false;
    isStocksActive = false;
    isLiderboardActive = true;
    isUpgradeActive = false;
    isSettingsActive = false;
    ChromeBottomNode.classList.remove("bottom-opened-icon");
    ShopBottomNode.classList.remove("bottom-opened-icon");
    SupplierBottomNode.classList.remove("bottom-opened-icon");
    BankBottomNode.classList.remove("bottom-opened-icon");
    StocksBottomNode.classList.remove("bottom-opened-icon");
    LiderboardBottomNode.classList.add("bottom-opened-icon");
    UpgradeBottomNode.classList.remove("bottom-opened-icon");
    SettingsBottomNode.classList.remove("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "none";
    ChromeNode.style.display = "none";
    SupplierNode.style.display = "none";
    BankNode.style.display = "none";
    StocksNode.style.display = "none";
    LiderboardNode.style.display = "flex";
    UpgradeNode.style.display = "none";
    SettingsNode.style.display = "none";
  } else {
    return;
  }
}

// конец лидерборда

// начало улучшений

const openUpgrade = () => {
  if (!isUpgradeActive) {
    isChromeActive = false;
    isShopActive = false;
    isSupplierActive = false;
    isBankActive = false;
    isStocksActive = false;
    isLiderboardActive = false;
    isUpgradeActive = true;
    isSettingsActive = false;
    ChromeBottomNode.classList.remove("bottom-opened-icon");
    ShopBottomNode.classList.remove("bottom-opened-icon");
    SupplierBottomNode.classList.remove("bottom-opened-icon");
    BankBottomNode.classList.remove("bottom-opened-icon");
    StocksBottomNode.classList.remove("bottom-opened-icon");
    LiderboardBottomNode.classList.remove("bottom-opened-icon");
    UpgradeBottomNode.classList.add("bottom-opened-icon");
    SettingsBottomNode.classList.remove("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "none";
    ChromeNode.style.display = "none";
    SupplierNode.style.display = "none";
    BankNode.style.display = "none";
    StocksNode.style.display = "none";
    LiderboardNode.style.display = "none";
    UpgradeNode.style.display = "flex";
    SettingsNode.style.display = "none";
  } else {
    return;
  }
}

// конец улучшений

// начало настроек

const openSettings = () => {
  if (!isSettingsActive) {
    isChromeActive = false;
    isShopActive = false;
    isSupplierActive = false;
    isBankActive = false;
    isStocksActive = false;
    isLiderboardActive = false;
    isUpgradeActive = false;
    isSettingsActive = true;
    ChromeBottomNode.classList.remove("bottom-opened-icon");
    ShopBottomNode.classList.remove("bottom-opened-icon");
    SupplierBottomNode.classList.remove("bottom-opened-icon");
    BankBottomNode.classList.remove("bottom-opened-icon");
    StocksBottomNode.classList.remove("bottom-opened-icon");
    LiderboardBottomNode.classList.remove("bottom-opened-icon");
    UpgradeBottomNode.classList.remove("bottom-opened-icon");
    SettingsBottomNode.classList.add("bottom-opened-icon");
    mainNode.style.display = "none";
    ShopNode.style.display = "none";
    ChromeNode.style.display = "none";
    SupplierNode.style.display = "none";
    BankNode.style.display = "none";
    StocksNode.style.display = "none";
    LiderboardNode.style.display = "none";
    UpgradeNode.style.display = "none";
    SettingsNode.style.display = "flex";
  } else {
    return;
  }
}

// конец настроек