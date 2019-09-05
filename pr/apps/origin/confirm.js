const button = document.getElementById('confirm');
const pleasewait = document.getElementById('pleasewait');

const radio1 = document.getElementById('account1');
const radio2 = document.getElementById('account2');

var selectedAccount = 0;

radio1.addEventListener('click', (evt) => {
  selectedAccount = 0;
});

radio2.addEventListener('click', (evt) => {
  selectedAccount = 1;
});


button.addEventListener('click', (evt) => {
  console.log(evt);
  button.style.display = 'none';
  pleasewait.style.display = 'block';
  console.log ({command : 'confirm', account: selectedAccount });
  navigator.serviceWorker.controller.postMessage({command : 'confirm', account: selectedAccount });
});

const urlParts = window.location.href.split('#');
if (urlParts.length === 5) {


//  console.log (window.location.href); 
//  console.log (urlParts);
  document.getElementById('currency').innerHTML = urlParts[1];
  document.getElementById('value').innerHTML = urlParts[2];
  document.getElementById('creditorName').innerHTML = urlParts[3];
  document.getElementById('creditorAccount').innerHTML = urlParts[4];

 
/*
  document.getElementById('debtor1Name').innerHTML = debtorAccountString[0].accountNumber
  document.getElementById('debtor1Account').innerHTML = debtorAccountString[0].accountNumber;
  document.getElementById('debtor1PartyId').innerHTML = debtorAccountString[0].accountOwnerId;
  document.getElementById('debtor1BIC').innerHTML = debtorAccountString[0].bankIdentifier;

  document.getElementById('debtor2Name').innerHTML = debtorAccountString[1].accountOwner;
  document.getElementById('debtor2Account').innerHTML = debtorAccountString[1].accountNumber;
  document.getElementById('debtor2PartyId').innerHTML = debtorAccountString[1].accountOwnerId;
  document.getElementById('debtor2BIC').innerHTML = debtorAccountString[1].bankIdentifier;
*/
};


function completeAccount () {
//  console.log (debtorAccountString);
  document.getElementById('debtor1Name').innerHTML = debtorAccountString[0].accountOwner;
  document.getElementById('debtor1Account').innerHTML = debtorAccountString[0].accountNumber;
  document.getElementById('debtor1PartyId').innerHTML = debtorAccountString[0].accountOwnerId;
  document.getElementById('debtor1BIC').innerHTML = debtorAccountString[0].bankIdentifier;

//console.log ( 'debtor1Name', document.getElementById('debtor1Name').innerHTML );
//console.log ( 'debtor1Account', document.getElementById('debtor1Account').innerHTML);
//console.log ( 'debtor1PartyId', document.getElementById('debtor1PartyId').innerHTML);
//console.log ( 'debtor1BIC', document.getElementById('debtor1BIC').innerHTML);

  document.getElementById('debtor2Name').innerHTML = debtorAccountString[1].accountOwner;
  document.getElementById('debtor2Account').innerHTML = debtorAccountString[1].accountNumber;
  document.getElementById('debtor2PartyId').innerHTML = debtorAccountString[1].accountOwnerId;
  document.getElementById('debtor2BIC').innerHTML = debtorAccountString[1].bankIdentifier;

//console.log ( 'debtor2Name', document.getElementById('debtor2Name').innerHTML );
//console.log ( 'debtor2Account', document.getElementById('debtor2Account').innerHTML);
//console.log ( 'debtor2PartyId', document.getElementById('debtor2PartyId').innerHTML);
//console.log ( 'debtor2BIC', document.getElementById('debtor2BIC').innerHTML);

};

 completeAccount();
