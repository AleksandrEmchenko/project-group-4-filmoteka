const btnThemeHeader = document.querySelector("#switch1");
const bodyTheme = document.querySelector("body");
const checked = document.querySelector(".switch");
let theme = localStorage.getItem("ui-theme");


window.addEventListener("load", saveTheme);

if (btnThemeHeader !== null) {
	btnThemeHeader.addEventListener('click', onTheme);
}


function saveTheme() {
 if (theme === "dark") {
  bodyTheme.classList.add("body-theme");
  checked.setAttribute("checked", true);
	};
}

function onTheme() {
 theme = localStorage.getItem("ui-theme");

	if (theme === "dark") {
		bodyTheme.classList.remove("body-theme");
		localStorage.setItem("ui-theme", "light");
		return;
	} 

 	bodyTheme.classList.add("body-theme");
	localStorage.setItem("ui-theme", "dark");	
}
