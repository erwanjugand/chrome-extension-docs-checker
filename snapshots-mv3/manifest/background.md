An optional manifest key used to specify a javascript file as the extension service worker. A service worker is a background script that acts as the extension's main event handler. For more information, visit the [more comprehensive introduction to service workers](https://developer.chrome.com/docs/extensions/mv3/service_workers#manifest).

    {
      ...
       "background": {
          "service_worker": "service-worker.js",
          "type": "module"
        },
      ...
    }