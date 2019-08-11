self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('paymentrequest', (evt) => {
    evt.respondWith({
        methodName: 'https://gpidemo.github.io',
        details: {
            uetr: '972a99ab-46e8-4fbd-ae6e-77cf56909dc2',
        },
    });
});
