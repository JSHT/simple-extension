let tables = [];

function turnIntoDOM() {
  tables.forEach((table) => {
    let tableID = document.querySelector('#table');
    tableID.insertAdjacentHTML('beforeend', table);
    console.log(tableID);
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.tables) {
    // console.log(message.tables);
    tables = message.tables;
    turnIntoDOM();
    sendResponse({ status: "OK", message: "success" });
  }
});

const getCurrentTab = async () => {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

const injectContentScript = (tab) => {
  const { id, url } = tab;
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: ["inject.js"],
  });
  console.log(`Loading: ${url}`);
};

getCurrentTab().then((tab) => {
  injectContentScript(tab);
});
