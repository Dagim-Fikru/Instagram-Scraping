document.getElementById('automate-form').onsubmit = event => {
    event.preventDefault();
    const usernames = document.getElementById('usernames').value;
    const userNamesArray = usernames.split(',').map(username => username.trim())
    console.log(userNamesArray)
    // Save the hashtag value in chrome.storage
    chrome.storage.local.set({ 'usernames': userNamesArray }, function () {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            // Open the Instagram page
            chrome.tabs.create({ url: `${userNamesArray}liked_by?source=extension` });
        }
    });
};

// https://www.instagram.com/p/C0jxyeooWcO/liked_by/