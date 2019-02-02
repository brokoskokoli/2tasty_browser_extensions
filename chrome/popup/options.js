function saveOptions(e) {
    e.preventDefault();

    chrome.storage.sync.set({ basic_link: document.querySelector("#basic_link").value });

    document.getElementById('output').innerHTML = 'Url saved!';
}

function restoreOptions() {
    chrome.storage.sync.get('basic_link', function(data) {
        document.querySelector("#basic_link").value = data.basic_link || "https://example.com/de";
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
