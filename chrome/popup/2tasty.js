

document.body.onclick = function(e){

    if (e.target.id == 'btn_import_from_link') {
        e.preventDefault();

        var currentUrl = '';
        var currentBaseUrl = '';
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
            currentUrl = tabs[0].url;
            chrome.storage.sync.get('basic_link', function(data) {
                currentBaseUrl = data.basic_link || "https://example.com/de";
                var link = currentBaseUrl + '/recipes/import_from_link?recipe_import_from_link[link]='+encodeURIComponent(currentUrl);
                chrome.tabs.create({'url' : link});
                console.log(link);
            });
        });




        //chrome.tabs.create({'url' : link});
    } else if (e.target.id == 'configure_button') {
        e.preventDefault();
        browser.runtime.openOptionsPage()
    }
}