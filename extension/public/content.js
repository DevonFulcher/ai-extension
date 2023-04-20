chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    const articles = document.getElementsByTagName("article")
    if (articles.length > 0) {
      sendResponse({farewell: articles[0].innerText})
    }
    if (request.greeting === "hello")
      sendResponse({farewell: document.getElementsByTagName("article")});
  }
);