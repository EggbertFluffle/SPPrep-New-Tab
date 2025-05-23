
const clockEl = document.querySelector("#clock");
const letterDayEl = document.querySelector("#letterDay")
const dateEl = document.querySelector("#date");
const homeShortcuts = []

updateTime();
setInterval(updateTime, 1000);
getDate();

function updateTime() {
	let d = new Date();
	clockEl.innerHTML = `${d.getHours() % 12 == 0 ? 12 : d.getHours() % 12}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')} `;
}

async function getDate() {
	let d = new Date();

	let response = await fetch("../schoolCalender.json");
	let dayData;
	let dateId;
	if (response.ok) {
		let data = await response.json();
		let dateId = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
		dayData = data.find((e) => e.date == dateId);
	}
	if (dayData != undefined) {
		letterDayEl.innerHTML = dayData.letter + " - DAY";
		document.querySelector("#bufferBar").style.display = "block";
	}
	dateEl.innerHTML = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}