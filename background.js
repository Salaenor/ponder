chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });
  
  const youtube = 'https://www.youtube.com/'
//create a document fragment
let htmlFragment = document.createDocumentFragment();

//create a div element to hold the response
let tempNode = document.createElement('div');

//add response to the div
tempNode.innerHTML = response;

//append the <script> tag from the div to the fragment
htmlFragment.appendChild(tempNode.firstChild);

//select script tag from the fragment now
let scriptTag = htmlFragment.querySelector('script');

//add class to the <script> tag
scriptTag.setAttribute('class', 'removeables');

//append the tag to the document body
$(document.body).append(fragment);
  
  // When the user clicks on the extension action
  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(youtube)) {
      // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });
  
      if (nextState === "ON") {
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ["ponder.css"],
          target: { tabId: tab.id },
        })
        $('.removeables').remove();
        ;
      } else if (nextState === "OFF") {
        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
          files: ["ponder.css"],
          target: { tabId: tab.id },
        });
      }
    }
  });
