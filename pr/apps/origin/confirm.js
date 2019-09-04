const button = document.getElementById('confirm');
const pleasewait = document.getElementById('pleasewait');

button.addEventListener('click', (evt) => {
  console.log(evt);
  button.style.display = 'none';
  pleasewait.style.display = 'block';
  navigator.serviceWorker.controller.postMessage({command : 'confirm', details: debitAccount[0] });
});

const urlParts = window.location.href.split('#');
if (urlParts.length === 5) {
  document.getElementById('currency').innerHTML = urlParts[1];
  document.getElementById('value').innerHTML = urlParts[2];
  document.getElementById('creditorName').innerHTML = urlParts[3];
  document.getElementById('creditorAccount').innerHTML = urlParts[4];

  console.log (debtorAccountString);
 
  document.getElementById('debtor1Name').innerHTML = debtorAccountString[0].accountNumber
  document.getElementById('debtor1Account').innerHTML = debtorAccountString[0].accountNumber;
  document.getElementById('debtor1PartyID').innerHTML = debtorAccountString[0].accountOwnerId;
  document.getElementById('debtor1BIC').innerHTML = debtorAccountString[0].bankIdentifier;

  document.getElementById('debtor2Name').innerHTML = debtorAccountString[1].accountOwner;
  document.getElementById('debtor2Account').innerHTML = debtorAccountString[1].accountNumber;
  document.getElementById('debtor2PartyID').innerHTML = debtorAccountString[1].accountOwnerId;
  document.getElementById('debtor2BIC').innerHTML = debtorAccountString[1].bankIdentifier;
};

function completeAccount () {
  document.getElementById('debtor1Name').innerHTML = debtorAccountString[0].accountOwner;
  document.getElementById('debtor1Account').innerHTML = debtorAccountString[0].accountNumber;
  document.getElementById('debtor1PartyID').innerHTML = debtorAccountString[0].accountOwnerId;
  document.getElementById('debtor1BIC').innerHTML = debtorAccountString[0].bankIdentifier;

  document.getElementById('debtor2Name').innerHTML = debtorAccountString[1].accountOwner;
  document.getElementById('debtor2Account').innerHTML = debtorAccountString[1].accountNumber;
  document.getElementById('debtor2PartyID').innerHTML = debtorAccountString[1].accountOwnerId;
  document.getElementById('debtor2BIC').innerHTML = debtorAccountString[1].bankIdentifier;
};

 completeAccount();
