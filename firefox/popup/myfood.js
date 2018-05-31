var currentUrl = '';
var currentBaseUrl = '';

function importFromLinkOnTabs(tabs) {
    if (tabs[0]) {
        currentTab = tabs[0];
        currentUrl = currentTab.url;

        var getting = browser.storage.local.get("basic_link");
        getting.then(getCurrentBaseURL, null);
    }
}

function displayError() {
    document.getElementById('output').innerHTML = 'Extension not configured! <button id="configure_button">Configure</button>';
}

function getCurrentBaseURL(result) {
    console.log('getCurrentBaseURL ');
    console.log(result);
    if (result.basic_link) {
        currentBaseUrl = result.basic_link;
        importFromLink();
    } else {
        displayError()
    }
}

function importFromLink() {
    var link = currentBaseUrl + '/recipes/import_from_link?recipe_import_from_link[link]='+encodeURIComponent(currentUrl);
    console.log(link);
    var result = window.open(link,'_blank');

    var creating = browser.tabs.create({
        url:link
    });
    //creating.then(onCreated, onError);
}

function listenForClicks() {
    document.body.onclick = function(e){

        if (e.target.id == 'btn_import_from_link') {
            e.preventDefault();
            var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
            gettingActiveTab.then(importFromLinkOnTabs);
        } else if (e.target.id == 'configure_button') {
            e.preventDefault();
            browser.runtime.openOptionsPage()
        }
    }
}

listenForClicks();
