chrome.runtime.onInstalled.addListener(() => {
  let originalBadgeColor = '';
   function updateBadge(price) {
    chrome.action.setBadgeText({ text: price.toString() });


     if (originalBadgeColor === '') {
      chrome.action.getBadgeBackgroundColor({}, result => {
        originalBadgeColor = result;
      });
    }


    chrome.action.setBadgeBackgroundColor({ color: [255, 215, 0, 255] }); 

    // Después de un breve período de tiempo, restaura el color original de la badge
    setTimeout(() => {
      chrome.action.setBadgeBackgroundColor({ color: originalBadgeColor });
    }, 1000); // 1000 milisegundos (1 segundo)
  }

  function fetchXrpPrice() {
    fetch('https://api.kraken.com/0/public/Ticker?pair=XRPUSD')
      .then(response => response.json())
      .then(data => {
         const xrpPrice = parseFloat(data.result.XXRPZUSD.c[0]);
         const formattedPrice = `${xrpPrice.toFixed(3)}`;
        //chrome.action.setBadgeText({ text: `${formattedPrice}` });
        console.log(`Llamo a la función con precio ${formattedPrice}`);
        updateBadge(formattedPrice);
      })
      .catch(error => {
        console.error('Error fetching XRP price:', error);
        updateBadge('Error');
      });
  }

  fetchXrpPrice(); 


  setInterval(fetchXrpPrice, 60000); 
});
