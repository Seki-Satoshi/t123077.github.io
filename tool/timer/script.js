"use strict";

setInterval(() => {
    document.getElementById("time").innerText = ('0' + (new Date()).getHours()).slice(-2) + ':' + ('0' + (new Date()).getMinutes()).slice(-2) + ':' + ('0' + (new Date()).getSeconds()).slice(-2);
}, 0);

document.getElementById("settimer").value = `${new Date().getHours() + 1}:00:00`;

let left = 0;
document.getElementById("ok").addEventListener('click', () => {
    const timeInput = document.getElementById("settimer");
    if (timeInput.validity.badInput) { return; }
    let hours = timeInput.valueAsDate.getUTCHours();
    let minutes = timeInput.valueAsDate.getUTCMinutes();
    let seconds = timeInput.valueAsDate.getUTCSeconds();
    let time1 = new Date();
    let time2 = new Date(time1.getFullYear(), time1.getMonth(), time1.getDate(), hours, minutes, seconds);
    if (time1 > time2) { time2.setDate(time2.getDate() + 1); }
    left = time2.getTime() - time1.getTime();
    restart(time2);
});

let before = -1;
function FixToJPTime(time) { // time = number (seconds)
    if (time > 3600) {
        return Math.floor(time / 3600) + "時間" + ('00' + Math.floor((time % 3600) / 60)).slice(-2) + "分" + ('00' + (time % 60).toFixed(3)).slice(-6) + "秒";
    } else if (time > 60) {
        return Math.floor((time % 3600) / 60) + "分" + ('00' + (time % 60).toFixed(3)).slice(-6) + "秒";
    } else {
        return (time % 60).toFixed(3) + " 秒";
    }
}
function restart(date) {
    clearInterval(before);
    before = setInterval(() => {
        let lefttime = (date.getTime() - (new Date()).getTime()) / 1000;
        document.getElementById("longer").innerHTML = "" + ((lefttime < 0) ? ("0.000") : (lefttime.toFixed(3))) + " 秒";
        document.getElementById("longest").innerHTML = "" + ((lefttime < 0) ? ("0.000 秒") : (FixToJPTime(lefttime)));
    }, 0);
}

restart(new Date());

const small = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
function repTosmall(string) {
    let strs = string.split('');
    for (let i = 0; i < strs.length; i++) {
        if (!isNaN(strs[i])) {
            strs[i] = small[strs[i]];
        }
    }
    return strs.join("");
}
setInterval(() => {
    document.getElementById("note").innerHTML = repTosmall(('0' + (new Date()).getHours()).slice(-2) + ':' + ('0' + (new Date()).getMinutes()).slice(-2) + ':' + ('0' + (new Date()).getSeconds()).slice(-2));
}, 50);

document.getElementById("font-selector").addEventListener('change', (event) => {
    document.getElementById("time").className = event.target.value;
});