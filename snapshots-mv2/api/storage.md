refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.storage` API to store, retrieve, and track changes to user data.

<br />

<br />

## Permissions

`storage`  

<br />

<br />

<br />

## Overview

The Storage API provides an extension-specific way to persist user data and state. It's similar to the web platform's storage APIs ([IndexedDB](https://developer.mozilla.org/docs/Web/API/Window/indexeddb), and [Storage](https://developer.mozilla.org/docs/Web/API/Storage)), but was designed to meet the storage needs of extensions. The following are a few key features:

- All extension contexts, including the extension service worker and content scripts have access to the Storage API.
- The JSON serializable values are stored as object properties.
- The Storage API is asynchronous with bulk read and write operations.
- Even if the user clears the cache and browsing history, the data persists.
- Stored settings persist even when using [split incognito](https://developer.chrome.com/docs/extensions/mv3/manifest/incognito).
- Includes an exclusive read-only [managed storage area](https://developer.chrome.com/docs/extensions/mv3/manifest/storage) for enterprise policies.

Even though extensions can use the \[`Storage`\]\[mdn-storage\] interface (accessible from `window.localStorage`) in some contexts (popup and other HTML pages), it is not recommended for the following reasons:

- Extension's service worker cannot access `Storage`.
- Content scripts share storage with the host page.
- Data saved using the `Storage` interface is lost when the user clears their browsing history.

To move data from web storage APIs to extension storage APIs from a service worker:

1. Create an offscreen document with a conversion routine and an \[`onMessage`\]\[on-message\] handler.
2. Add a conversion routine to an offscreen document.
3. In the extension service worker check `chrome.storage` for your data.
4. If your data isn't found, \[create\]\[create-offscreen\] an offscreen document and call \[`sendMessage()`\]\[send-message\] to start the conversion routine.
5. Inside the offscreen document's `onMessage` handler, call the conversion routine.

There are also some nuances with how web storage APIs work in extensions. Learn more in the
\[Storage and Cookies\]\[storage-and-cookies\] article.

### Storage areas

The Storage API is divided into the following four buckets ("storage areas"):

[`storage.local`](https://developer.chrome.com/docs/extensions/mv2/reference/storage#property-local)
:   Data is stored locally, which is cleared when the extension is removed. The quota limitation is approximately 10 MB, but can be increased by requesting the `"unlimitedStorage"` permission. Consider using it to store larger amounts of data.

> [!CAUTION]
> **Caution:** Before Chrome 114, the quota was approximately 5 MB.

[`storage.sync`](https://developer.chrome.com/docs/extensions/mv2/reference/storage#property-sync)
:   If syncing is enabled, the data is synced to any Chrome browser that the user is logged into. If disabled, it behaves like `storage.local`. Chrome stores the data locally when the browser is offline and resumes syncing when it's back online. The quota limitation is approximately 100 KB, 8 KB per item. Consider using it to preserve user settings across synced browsers.

> [!WARNING]
> **Warning:** Local and sync storage areas should not store confidential user data because they are not encrypted. When working with sensitive data, consider using the `session` storage area to hold values in memory until the browser is shut down.

[storage.session](https://developer.chrome.com/docs/extensions/mv2/reference/storage#property-session)
:   Holds data in memory for the duration of a browser session. By default, it's not exposed to content scripts, but this behavior can be changed by setting [`chrome.storage.session.setAccessLevel()`](https://developer.chrome.com/docs/extensions/mv2/reference/storage#method-StorageArea-setAccessLevel). The quota limitation is approximately 10 MB. Consider using it to store global variables across service worker runs.

> [!WARNING]
> **Warning:** Before Chrome 112, the quota was approximately 1 MB.

[storage.managed](https://developer.chrome.com/docs/extensions/mv2/reference/storage#property-managed)
:   Administrators can use a [schema](https://developer.chrome.com/docs/extensions/mv3/manifest/storage) and enterprise policies to configure a supporting extension's settings in a managed environment. This storage area is read-only.

## Manifest

To use the storage API, declare the `"storage"` permission in the extension
[manifest](https://developer.chrome.com/docs/extensions/mv3/manifest). For example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "storage"
      ],
      ...
    }

## Usage

The following samples demonstrate the `local`, `sync`, and
`session` storage areas:

### storage.local

    chrome.storage.local.set({ key: value }).then(() => {
      console.log("Value is set");
    });

    chrome.storage.local.get(["key"]).then((result) => {
      console.log("Value currently is " + result.key);
    });

### storage.sync

    chrome.storage.sync.set({ key: value }).then(() => {
      console.log("Value is set");
    });

    chrome.storage.sync.get(["key"]).then((result) => {
      console.log("Value currently is " + result.key);
    });

### storage.session

    chrome.storage.session.set({ key: value }).then(() => {
      console.log("Value was set");
    });

    chrome.storage.session.get(["key"]).then((result) => {
      console.log("Value currently is " + result.key);
    });

To learn more about the `managed` storage area, see [Manifest for storage areas](https://developer.chrome.com/docs/extensions/mv3/manifest/storage).

## Storage and throttling limits

Don't think of adding to the Storage API as putting things in a big truck. Think of adding to
storage as being like putting something in a pipe. The pipe may have material in it already, and it
may even be filled. Always assume a delay between when you add to storage and when it is actually
recorded.

For details on storage area limitations and what happens when they are exceeded, see the quota information for [`sync`](https://developer.chrome.com/docs/extensions/mv2/reference/storage#property-sync), [`local`](https://developer.chrome.com/docs/extensions/mv2/reference/storage#property-local), and [`session`](https://developer.chrome.com/docs/extensions/mv2/reference/storage#property-session).

## Use cases

The following sections demonstrate common use cases for the Storage API.

### Synchronous response to storage updates

To track changes made to storage, you can add a listener to its `onChanged` event. When anything changes in storage, that event fires. The sample code listens for these changes:

background.js:

    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
      }
    });

We can take this idea even further. In this example, we have an [options page](https://developer.chrome.com/docs/extensions/mv3/options/) that
allows the user to toggle a "debug mode" (implementation not shown here). The options page immediately saves the new settings to `storage.sync`, and the service worker uses `storage.onChanged` to apply the setting as soon as possible.

options.html:

    <!-- type="module" allows you to use top level await -->
    <script defer src="options.js" type="module"></script>
    <form id="optionsForm">
      <label for="debug">
        <input type="checkbox" name="debug" id="debug">
        Enable debug mode
      </label>
    </form>

options.js:

    // In-page cache of the user's options
    const options = {};
    const optionsForm = document.getElementById("optionsForm");

    // Immediately persist options changes
    optionsForm.debug.addEventListener("change", (event) => {
      options.debug = event.target.checked;
      chrome.storage.sync.set({ options });
    });

    // Initialize the form with the user's option settings
    const data = await chrome.storage.sync.get("options");
    Object.assign(options, data.options);
    optionsForm.debug.checked = Boolean(options.debug);

background.js:

    function setDebugMode() { /* ... */ }

    // Watch for changes to the user's options & apply them
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.options?.newValue) {
        const debugMode = Boolean(changes.options.newValue.debug);
        console.log('enable debug mode?', debugMode);
        setDebugMode(debugMode);
      }
    });

### Asynchronous preload from storage

Since service workers are not always running, Manifest V3 extensions sometimes need to
asynchronously load data from storage before they execute their event handlers. To do this, the
following snippet uses an async `action.onClicked` event handler that waits for the `storageCache`
global to be populated before executing its logic.

background.js:

    // Where we will expose all the data we retrieve from storage.sync.
    const storageCache = { count: 0 };
    // Asynchronously retrieve data from storage.sync, then cache it.
    const initStorageCache = chrome.storage.sync.get().then((items) => {
      // Copy the data retrieved from storage into storageCache.
      Object.assign(storageCache, items);
    });

    chrome.action.onClicked.addListener(async (tab) => {
      try {
        await initStorageCache;
      } catch (e) {
        // Handle error that occurred during storage initialization.
      }

      // Normal action handler logic.
      storageCache.count++;
      storageCache.lastTabId = tab.id;
      chrome.storage.sync.set(storageCache);
    });

## Extension examples

To see other demos of the Storage API, explore any of the following examples:

- [Global search extension](https://github.com/GoogleChrome/chrome-extensions-samples/tree/17956f44b6f04d28407a4b7eee428611affd4fab/api/contextMenus/global_context_search).
- [Water alarm extension](https://github.com/GoogleChrome/chrome-extensions-samples/tree/17956f44b6f04d28407a4b7eee428611affd4fab/examples/water_alarm_notification).

<br />

## Types

### AccessLevel

Chrome 102+

The storage area's access level.

#### Enum

"TRUSTED_CONTEXTS"   
Specifies contexts originating from the extension itself.
"TRUSTED_AND_UNTRUSTED_CONTEXTS"   
Specifies contexts originating from outside the extension.

<br />

### StorageChange

#### Properties

- newValue any optional

  The new value of the item, if there is a new value.
- oldValue any optional

  The old value of the item, if there was an old value.

## Properties

### local

Items in the `local` storage area are local to each machine.

#### Type

[StorageArea](https://developer.chrome.com/docs/extensions/mv2/storage/StorageArea/#type-StorageArea) \& object

#### Properties

- QUOTA_BYTES 10485760   

  The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the `unlimitedStorage` permission. Updates that would cause this limit to be exceeded fail immediately and set [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError) when using a callback, or a rejected Promise if using async/await.

### managed

Items in the `managed` storage area are set by an enterprise policy configured by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error. For information on configuring a policy, see [Manifest for storage areas](https://developer.chrome.com/docs/extensions/reference/manifest/storage).

#### Type

[StorageArea](https://developer.chrome.com/docs/extensions/mv2/storage/StorageArea/#type-StorageArea)

### sync

Items in the `sync` storage area are synced using Chrome Sync.

#### Type

[StorageArea](https://developer.chrome.com/docs/extensions/mv2/storage/StorageArea/#type-StorageArea) \& object

#### Properties

- MAX_ITEMS 512   

  The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError) when using a callback, or when a Promise is rejected.
- MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE 1000000   
  Deprecated

  The storage.sync API no longer has a sustained write operation quota.

  <br />

- MAX_WRITE_OPERATIONS_PER_HOUR 1800   

  The maximum number of `set`, `remove`, or `clear` operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.

  Updates that would cause this limit to be exceeded fail immediately and set [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError) when using a callback, or when a Promise is rejected.
- MAX_WRITE_OPERATIONS_PER_MINUTE 120   

  The maximum number of `set`, `remove`, or `clear` operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.

  Updates that would cause this limit to be exceeded fail immediately and set [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError) when using a callback, or when a Promise is rejected.
- QUOTA_BYTES 102400   

  The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError) when using a callback, or when a Promise is rejected.
- QUOTA_BYTES_PER_ITEM 8192   

  The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError) when using a callback, or when a Promise is rejected.

## Events

### onChanged

```typescript
chrome.storage.onChanged.addListener(
  callback: function,
)
```

Fired when one or more items change.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (changes: object, areaName: string) => void
  ```

  <br />

  - changes object
  - areaName string

<br />