const link = document.querySelector("a");
const image = document.querySelector("img");

// `document.querySelector` may return null if the selector doesn't match anything.
if (link) {
  await chrome.scripting.insertCSS({
    files: ["ponder.css"],
    target: { tabId: tab.id },
  });
}

if (image) {
  await chrome.scripting.insertCSS({
    files: ["ponder.css"],
    target: { tabId: tab.id },
  });
}
      
