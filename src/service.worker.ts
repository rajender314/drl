export default function serviceWorker() {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            let serviceWorkerURL: any = process.env.REACT_APP_SERVICE_WORKER
            navigator.serviceWorker.register(serviceWorkerURL).then(function (registration) {
                // Registration was successful
                //console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                //console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}
