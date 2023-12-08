chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('source') === 'extension') {


                waitForElementAndClick('._aabd > a');

            }

        }
    }, 10);
});
function waitForElementAndClick(selector) {
    var attempts = 0;
    var maxAttempts = 10;

    function attemptClick() {
        var elements = document.querySelectorAll(selector);
        console.log("elements");
        console.log(elements);
        if (elements.length) {
            elements[0].click();

            let counter = 0;

            const intervalId = setInterval(() => {
                const heart = document.querySelector(
                    "body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe.x1qjc9v5.xjbqb8w.x1lcm9me.x1yr5g0i.xrt01vj.x10y3i5r.xr1yuqi.xkrivgy.x4ii5y1.x1gryazu.x15h9jz8.x47corl.xh8yej3.xir0mxb.x1juhsu6 > div > article > div > div._ae65 > div > div > div._ae2s._ae3v._ae3w > section._aamu._ae3_._ae47._ae48 > span._aamw > div"
                );

                const svgElement = heart.querySelector("svg");

                const titleElement = svgElement.querySelector("title");
                const textContent = titleElement.textContent;
                if (elements.length < 3) {
                    if (heart) {
                        counter++;
                        if (textContent === "Like") {
                            heart.click();
                        } else if (counter < elements.length) {
                            const buttons = document.querySelectorAll(
                                "body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div:nth-child(1) > div > div > div > button"
                            );
                            if (buttons.length === 2) {
                                buttons[1].click();
                            } else if (buttons.length === 1) {
                                buttons[0].click();
                            }
                        }

                        if (counter === elements.length) {
                            goToNextPerson();
                            clearInterval(intervalId);
                        }
                    }
                } else if (elements.length >= 3) {
                    if (heart) {
                        if (textContent === "Like") {
                            heart.click();
                            counter++;
                        }

                        if (counter < 3) {
                            const buttons = document.querySelectorAll(
                                "body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div:nth-child(1) > div > div > div > button"
                            );

                            if (buttons.length === 2) {
                                buttons[1].click();
                            } else if (buttons.length === 1) {
                                buttons[0].click();
                            }
                        }

                        if (counter === 3) {
                            goToNextPerson();
                            clearInterval(intervalId);
                        }
                    }
                }
            }, 3000);
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(attemptClick, 1000); // Wait 1 second and try again
        } else {
            goToNextPerson();
            console.error("Element not found after multiple attempts");
        }
    }

    attemptClick();
}

function goToNextPerson() {
    setTimeout(() => {
        chrome.storage.local.get(["usernames"], function (result) {
            const receivedUsernames = result.usernames;
            console.log("Received hashtag in inject.js:", receivedUsernames[0]);
            receivedUsernames.shift();
            if (receivedUsernames.length) {
                console.log("usrname length :", receivedUsernames.length);

                chrome.storage.local.set({ usernames: receivedUsernames });

                chrome.runtime.sendMessage({
                    type: "updateTab",
                    usernames: receivedUsernames,
                });
            }
        });
    }, 5000);
}