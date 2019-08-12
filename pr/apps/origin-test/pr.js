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
        supportedMethods: window.location.origin,
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
            .then(function(instrumentResponse) {
                instrumentResponse.complete('success')
                    .then(function() {
                        done('This is a demo website. No payment will be processed.', instrumentResponse);
                    })
                    .catch(function(err) {
                        error(err);
                        request = buildPaymentRequest();
                    });
            })
            .catch(function(err) {
                error(err);
                request = buildPaymentRequest();
            });
    } catch (e) {
        error('Developer mistake: \'' + e + '\'');
        request = buildPaymentRequest();
    }
}
