/* exported onBuyClicked */

/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest() {
    if (!window.PaymentRequest) {
        return null;
    }

    let supportedInstruments = [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: networks, 
      supportedTypes: ['debit', 'credit', 'prepaid']
    }
	  }, 
      {  supportedMethods: 
            'https://gpidemo.github.io',
        data: {
			supportedNetworks: ['GPI'],
			UETR: '972a99ab-46e8-4fbd-ae6e-77cf56909dc2',
			creditorAccount: 'CREDITACC1234',
			creditorName: 'Merchant',
			creditorBankCode: 'SWHQBEBB',
			debtorName: 'Customer A',
			debtorAccount: 'DEBITACC1234',
			debtorLEI: '549300VBNQICP5TDO865',
			purpose: 'Webshop',
		}
    }];


	let allDisplayItems = [
  	{
 	   label: 'Subtotal',
 	   amount: {
  	    currency: 'EUR',
	      value: 50,
    	},
  	}, {
 	   label: 'Discount (10%)',
  	  amount: {
      	currency: 'EUR',
      	value: 5,
    	},
  	}, {
  	  label: 'VAT (21%)',
	    amount: {
      	currency: 'EUR',
      	value: 9.45,
    	},
  	},
	];

    let details = {
	  	total: {
    		label: 'Total',
    		amount: {
      		currency: 'EUR',
      		value: 54.45,
    		},
  		},
  		displayItems: allDisplayItems,
	};


    let request = null;

    try {
        request = new PaymentRequest(supportedInstruments, details);
          if (request.canMakePayment) {
            request.canMakePayment().then(function(result) {
               info(result ? 'Can make payment' : 'Cannot make payment');
            }).catch(function(err) {
                error(err);
            });
        }

    if (request.onpaymentmethodchange !== undefined) {
      info('Will print out payment method change event details here.');
      request.addEventListener('paymentmethodchange', (evt) => {
        info('Payment method change event: ' + JSON.stringify({'methodName': evt.methodName, 'methodDetails': evt.methodDetails}, undefined, 2));
      });
    }
       } catch (e) {
        error('Developer mistake: \'' + e + '\'');
    }

    return request;
}

let request = buildPaymentRequest();

function onBuyClicked() { // eslint-disable-line no-unused-vars
    if (!window.PaymentRequest || !request) {
        error('PaymentRequest API is not supported.');
        return;
    }

    try {
	  request.show()
    	.then(instrumentResponse => sendPaymentToServer(instrumentResponse))
    	.catch(err => document.getElementById('log').innerText = err);
    } catch (e) {
        error('Developer mistake: \'' + e + '\'');
        request = buildPaymentRequest();
    }
}



/**
 * Simulates processing the payment data on the server.
 */
function sendPaymentToServer(instrumentResponse) {
  // There's no server-side component of these samples. No transactions are
  // processed and no money exchanged hands. Instantaneous transactions are not
  // realistic. Add a 2 second delay to make it seem more real.
  
  window.setTimeout(function () {
    instrumentResponse.complete('success')
        .then(() => document.getElementById('log').innerHTML = resultToTable(instrumentResponse))
        .catch(err => document.getElementById('log').innerText = err);
  }, 2000);
}

/**
 * Converts the payment instrument into a JSON string.
 */
function resultToTable(result) {
  return '<table class="table table-striped">' +
    '<tr><td>Method name</td><td>' + result.methodName + '</td></tr>' +
    '<tr><td>Cardholder name</td><td>' + result.details.UETR + '</td></tr>' +
    '<tr><td>Cardholder name</td><td>' + result.details.status + '</td></tr>' +
    '</table>';
}
