var debtorAccountData = [{
  accountOwner: 'Polaris Inc - Treasury',
  accountOwnerId: '213800ND2KZLU8AJEP05',
  accountNumber: 'DE27100777770209299700',
  bankIdentifier: 'SWHQBEBB',
},
{
  accountOwner: 'Polaris Inc - Logistics',
  accountOwnerId: '213800ND2KZLU8AJEP05',
  accountNumber: 'BE68844010370034',
  bankIdentifier: 'SWHQBEBB',
}];


/* exported onBuyClicked */

/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest() {
    if (!window.PaymentRequest) {
        return null;
    }


    let initiation_uetr = uuid();
    let apikeyString = window.localStorage.getItem("apikey"); 
    // console.log(initiation_uetr);

    let supportedInstruments = [{
        supportedMethods: 'basic-card',
	}, {
        supportedMethods: 
        	'https://gpidemo.github.io',
        data: {
          supportedNetworks: ['GPI'],
          uetr: initiation_uetr,
          apiKey :  apikeyString,
          creditTransferData: [{
            requested_execution_date: {
              date : "2019-01-02",
            },
            amount: {
              instructed_amount : {
                currency: "EUR",
                amount: "1391.50",
              }
            },
            debtor: {
              name: "PayingCorporate",
              organisation_identification: {
                lei: "5299000J2N45DDNE4Y28"
              }
            },
            debtor_agent: {
              bicfi: "KREDBEBB",
            },
            creditor_agent: {
              bicfi: "BNKMBEBB",
            },
            debtor_account: {
              iban: "BE0473244135",
            },
            creditor: {
              name: "MerchantA",
              organisation_identification : {
                lei: "6299300D2N76ADNE4Y55",
              }
            },
            creditor_account: {
              iban: "BE68539007547034",
            },
            remittance_information: 'arn:aws:acm-pca:eu-west-1:522843637103:certificate-authority\/e2a9c0fd-b62e-44a9-bcc2-02e46a1f61c2',
            payment_identification: {
              end_to_end_identification: 'MyInVoice2You',
            },
          },{
            requested_execution_date: {
              date : "2019-01-02",
            },
            amount: {
              instructed_amount : {
                currency: "EUR",
                amount: "1391.50",
              }
            },
            debtor: {
              name: debtorAccountData[1].accountOwner,
              organisation_identification: {
                lei: debtorAccountData[1].accountOwnerId
              }
            },
            debtor_agent: {
              bicfi: debtorAccountData[1].bankIdentifier,
            },
            creditor_agent: {
              bicfi: "BNKMBEBB",
            },
            debtor_account: {
              iban: debtorAccountData[1].accountNumber,
            },
            creditor: {
              name: "MerchantA",
              organisation_identification : {
                lei: "6299300D2N76ADNE4Y55",
              }
            },
            creditor_account: {
              iban: "BE68539007547034",
            },
            remittance_information: 'arn:aws:acm-pca:eu-west-1:522843637103:certificate-authority\/e2a9c0fd-b62e-44a9-bcc2-02e46a1f61c2',
            payment_identification: {
              end_to_end_identification: 'MyInVoice2You',
            },
          }],
        }, 
    }];

	let allDisplayItems = [
  	{
 	   label: 'Total (excl. taxes)',
 	   amount: {
  	    currency: 'EUR',
	      value: 1150,
    	},
  	}, {
  	  label: 'VAT (21%)',
	    amount: {
      	currency: 'EUR',
      	value: 241.50,
    	},
  	},
	];

    let details = {
	  	total: {
    		label: 'Total',
    		amount: {
      		currency: 'EUR',
      		value: 1391.50,
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
        if (request.hasEnrolledInstrument) {
          request.hasEnrolledInstrument().then(function(result) {
              info(result ? 'Has enrolled instrument' : 'No instrument enrolled');
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
                       if (instrumentResponse.methodName !== "basic-card") {
                        basicPopup ('https://gpidemo.github.io/pr/apps/origin/getstatus.html#' + instrumentResponse.details.uetr + '#Initiation in process');
                        sendMessage({command : 'getstatus', details : instrumentResponse.details.uetr});
                        console.log(instrumentResponse);
                        done('Payment Request has been processed by gLink with uetr: ' + instrumentResponse.details.uetr, instrumentResponse);
                       } else {
                        done('Payment Request has been processed by basic-card', instrumentResponse);
                       };
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


// Popup window function
function basicPopup(url) {
  popupWindow = window.open(url,'popUpWindow','height=300,width=500,left=100,top=100,resizable=no,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no, status=yes');
}

function uuid()
{
    var seed = Date.now();
    if (window.performance && typeof window.performance.now === "function") {
        seed += performance.now();
    }

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (seed + Math.random() * 16) % 16 | 0;
        seed = Math.floor(seed/16);

        return (c === 'x' ? r : r & (0x3|0x8)).toString(16);
    });

    return uuid;
}
