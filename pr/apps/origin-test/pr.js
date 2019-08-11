function buildPaymentRequest() {
    if (!window.PaymentRequest) {
        return null;
    }

    let supportedInstruments = [{
        supportedMethods: 
            'https://gpidemo.github.io',
    data: {
			supportedNetworks: ['GPI'],
			UETR: '972a99ab-46e8-4fbd-ae6e-77cf56909dc2'
			creditorAccount: 'CREDITACC1234',
			creditorName: 'Merchant',
			creditorBankCode: 'SWHQBEBB',
			debtorName: 'Customer A',
			debtorAccount: 'DEBITACC1234',
        
    }];

    let details = {
        total: {
            label: 'Donation',
            amount: {
                currency: 'USD',
                value: '1.00'
            }
        }
    };

    let request = null;

    try {
        request = new PaymentRequest(supportedInstruments, details);
        if (request.canMakePayment) {
            request.canMakePayment().then(function(result) {
                info(result ? "Can make payment" : "Cannot make payment");
            }).catch(function(err) {
                error(err);
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
                window.setTimeout(function() {
                    instrumentResponse.complete('success')
                        .then(function() {
                            done('This is a demo website. No payment will be processed.', instrumentResponse);
                        })
                        .catch(function(err) {
                            error(err);
                            request = buildPaymentRequest();
                        });
                }, 2000);
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
