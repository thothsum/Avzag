let currentTab;
let currentTabNav;

function switchTab(nav, tab) {
    if (currentTab != null) {
        currentTab.style.display = "none";
        currentTabNav.className = "tab-nav";
    }
    currentTab = tab;
    currentTabNav = nav;

    currentTab.style.display = "block";
    currentTabNav.className = "tab-nav current";

    window.localStorage.setItem("tab", currentTabNav.innerText);
}

let currentSavedTab = window.localStorage.getItem("tab");
let tabNavs = document.querySelectorAll("#header .tab-nav");
for (const tabNav of tabNavs) {
    let tabTarget = document.querySelector(`#${tabNav.innerText.toLowerCase()}`);
    tabTarget.style.display = "none";
    tabNav.onclick = () => switchTab(tabNav, tabTarget);

    if (tabNav.innerText == currentSavedTab)
        currentTabNav = tabNav;
}
currentTabNav.click();
