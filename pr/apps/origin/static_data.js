// The static data account information should be stored in the browser.

var debitAccount = [{
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

function redact(input) {
  return {
    accountOwner: input.details.accountOwner,
    accountOwnerId: input.details.accountOwnerId,
    accountNumber: input.details.accountNumber,
    bankIdentifier: input.details.bankIdentifier,
  };
}
