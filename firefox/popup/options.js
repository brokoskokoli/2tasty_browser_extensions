function saveOptions(e) {

    function onError() {
        document.getElementById('output').innerHTML = 'Cannot save url!';
    }
    function onSuccess() {
        document.getElementById('output').innerHTML = 'Url saved!';
    }

    console.log(`saveOptions`);
    e.preventDefault();
    var setting = browser.storage.local.set({
        basic_link: document.querySelector("#basic_link").value
    });

    setting.then(onSuccess, onError);
}

function restoreOptions() {
    console.log(`restoreOptions`);
    function setCurrentChoice(result) {
        document.querySelector("#basic_link").value = result.basic_link || "https://example.com/de";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("basic_link");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
