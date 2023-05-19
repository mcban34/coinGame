let tutarlar = [
    {
        fiyat: 1,
        resim: "https://i.ucoin.net/coin/45/237/45237016-2/turkey-1-lira-2016.jpg"
    },
    {
        fiyat: 0.50,
        resim: "https://i.ucoin.net/coin/55/131/55131143-2/turkey-50-kurus-2009.jpg"
    },
    {
        fiyat: 0.25,
        resim: "https://i.ucoin.net/coin/41/805/41805892-2/turkey-25-kurus-2020.jpg"
    },
];

let sayac = 3;

function soruOlustur() {
    sayac++;
    document.querySelector(".coinsImgs").innerHTML = "";
    let x = [];
    for (let i = 0; i < sayac; i++) {
        let rstTutar = tutarlar[Math.floor(Math.random() * tutarlar.length)];
        x.push(rstTutar);
    }

    let fiyatlar = x.map(value => value.fiyat);
    let resimler = x.map(value => value.resim);
    let coinsImgs = document.querySelector(".coinsImgs")

    for (let i = 0; i < resimler.length; i++) {
        let imgCoin = document.createElement("img");
        let rstGeleX = Math.floor(Math.random() * (coinsImgs.offsetWidth - 50))
        let rstGeleY = Math.floor(Math.random() * (coinsImgs.offsetHeight - 50))
        imgCoin.className = "imgCoin";
        imgCoin.style.left = `${rstGeleX}px`
        imgCoin.style.top = `${rstGeleY}px`
        imgCoin.width = 50;
        imgCoin.height = 50;
        imgCoin.src = resimler[i];
        imgCoin.id = `coin-${i}`;
        imgCoin.addEventListener('mousedown', dragStart);
        imgCoin.addEventListener('dragstart', (event) => event.preventDefault());
        document.querySelector(".coinsImgs").appendChild(imgCoin);
    }

    toplam = fiyatlar.reduce((acc, current) => acc + current, 0);
    console.log(toplam);
}

document.addEventListener("DOMContentLoaded", () => {
    soruOlustur();
});


for (let i = 9; i >= 1; i--) {
    let btn = document.createElement("button");
    btn.className = "myButton";
    btn.innerHTML = i;
    document.querySelector(".buttons").prepend(btn);
}
let btns = document.querySelectorAll(".myButton")
for (const i of btns) {
    i.addEventListener("click", playBipSound);
    i.addEventListener("click", function () {
        coinValue.value += i.innerHTML;
    })
}

function playBipSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

let coinValue = document.querySelector(".coinValue");

document.querySelector(".ok").addEventListener("click", function () {
    if (toplam == coinValue.value) {
        soruOlustur();
    } else {
        console.log("false");
    }
    coinValue.value = "";
});

document.querySelector(".clear").addEventListener("click", function () {
    coinValue.value = "";
});

let currentElement = null;
let offsetX = 0;
let offsetY = 0;

function dragStart(event) {
    currentElement = this;
    offsetX = event.clientX - currentElement.getBoundingClientRect().left;
    offsetY = event.clientY - currentElement.getBoundingClientRect().top;
    currentElement.style.opacity = '0.5';
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

function drag(event) {
    currentElement.style.left = (event.clientX - offsetX) + 'px';
    currentElement.style.top = (event.clientY - offsetY) + 'px';
}

function dragEnd() {
    currentElement.style.opacity = '1';
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
}