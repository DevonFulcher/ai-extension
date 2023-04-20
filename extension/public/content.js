chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    const articles = document.getElementsByTagName("article")
    if (articles.length > 0) {
      sendResponse({article: articles[0].innerText})
      return
    }
    sendResponse({article: ""});
  }
);