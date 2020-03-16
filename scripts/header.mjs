let currentTab;


function switchTab(tab) {
    if (currentTab != null)
        currentTab.style.display = "none";
    currentTab = tab;
    currentTab.style.display = "block";
}


let tabNavs = document.querySelectorAll("#header .tab-nav");
for (const tabNav of tabNavs) {
    let tabTarget = document.querySelector(`#${tabNav.innerText.toLowerCase()}`);
    tabTarget.style.display = "none";
    tabNav.onclick = () => switchTab(tabTarget);
}
tabNavs[0].click();
