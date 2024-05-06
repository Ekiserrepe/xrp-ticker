let originalBadgeColor = '';

function updateBadge(price) {
    chrome.action.setBadgeText({ text: price.toString() });

    if (originalBadgeColor === '') {
        chrome.action.getBadgeBackgroundColor({}, result => {
            originalBadgeColor = result;
        });
    }

    chrome.action.setBadgeBackgroundColor({ color: [255, 215, 0, 255] });

    
    setTimeout(() => {
        chrome.action.setBadgeBackgroundColor({ color: originalBadgeColor });
    }, 1000); // (1 second)
}

function fetchXrpPrice() {
    fetch('https://api.kraken.com/0/public/Ticker?pair=XRPUSD')
        .then(response => response.json())
        .then(data => {
            const xrpPrice = parseFloat(data.result.XXRPZUSD.c[0]);
            const formattedPrice = `${xrpPrice.toFixed(3)}`;
            updateBadge(formattedPrice);
        })
        .catch(error => {
            console.error('Error fetching XRP price:', error);
            updateBadge('Error');
        });
}

chrome.runtime.onInstalled.addListener(() => {
    fetchXrpPrice();
});

chrome.runtime.onStartup.addListener(() => {
    fetchXrpPrice();
});

chrome.action.onClicked.addListener(() => {
    fetchXrpPrice();
});

chrome.idle.onStateChanged.addListener(state => {
    if (state === 'active') {
        fetchXrpPrice();
    }
});

setInterval(fetchXrpPrice, 300000); //5 Minutes
