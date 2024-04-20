// from mdn's webextension samples
function openPage() {
	chrome.tabs.create({
		"url": "index.html"
	});
}
chrome.action.onClicked.addListener(openPage);