chrome.runtime.onInstalled.addListener(() => {
  function updateBadge(price) {
    chrome.action.setBadgeText({ text: xrpPrice.toString() });
  }

  function fetchXrpPrice() {
    fetch('https://api.kraken.com/0/public/Ticker?pair=XRPUSD')
      .then(response => response.json())
      .then(data => {
         const xrpPrice = parseFloat(data.result.XXRPZUSD.c[0]);
         const formattedPrice = `${xrpPrice.toFixed(3)}`;
        chrome.action.setBadgeText({ text: `${formattedPrice}` });
      })
      .catch(error => {
        console.error('Error fetching XRP price:', error);
        updateBadge('Error');
      });
  }

  fetchXrpPrice(); 

  
  setInterval(fetchXrpPrice, 60000); 
});
