<br />

<br />

## Description

Use the `offscreen` API to create and manage offscreen documents.

<br />

<br />

## Permissions

`offscreen`  

<br />

To use the Offscreen API, declare the `"offscreen"` permission in the [extension manifest](https://developer.chrome.com/docs/extensions/reference/manifest). For example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "offscreen"
      ],
      ...
    }

<br />

## Availability

Chrome 109+ MV3+

<br />

<br />

## Concepts and usage

Service workers don't have DOM access, and many websites have content security policies that
limit the functionality of content scripts. The Offscreen API allows the extension to use DOM
APIs in a hidden document without interrupting the user experience by opening new windows or
tabs. The [`runtime`](https://developer.chrome.com/docs/extensions/reference/runtime) API is the only extensions API
supported by offscreen documents.

Pages loaded as offscreen documents are handled differently from other types of extension pages.
The extension's permissions carry over to offscreen documents, but with limits on extension API
access. For example, because the [`browser.runtime`](https://developer.chrome.com/docs/extensions/reference/api/runtime) API is the only
extensions API supported by offscreen documents, messaging must be handled
using members of that API.

The following are other ways offscreen documents behave differently from normal pages:

- An offscreen document's URL must be a static HTML file bundled with the extension.
- Offscreen documents can't be focused.
- An offscreen document is an instance of [`window`](https://developer.mozilla.org/docs/Web/API/Window), but the value of its `opener` property is always `null`.
- Though an extension package can contain multiple offscreen documents, an installed extension can only have one open at a time. If the extension is running in split mode with an active incognito profile, the normal and incognito profiles can each have one offscreen document.

Use [`browser.offscreen.createDocument()`](https://developer.chrome.com/docs/extensions/reference/api/offscreen#method-createDocument) and
[`browser.offscreen.closeDocument()`](https://developer.chrome.com/docs/extensions/reference/api/offscreen#method-closeDocument) to create and close an offscreen
document. `createDocument()` requires the document's `url`, a reason, and a justification:

    browser.offscreen.createDocument({
      url: 'off_screen.html',
      reasons: ['CLIPBOARD'],
      justification: 'reason for needing the document',
    });

### Reasons

For a list of valid reasons, see the [Reasons](https://developer.chrome.com/docs/extensions/reference/api/offscreen#type-Reason) section. Reasons are set during
document creation to determine the document's lifespan. The `AUDIO_PLAYBACK` reason sets the
document to close after 30 seconds without audio playing. All other reasons don't set lifetime limits.

## Examples

### Maintain the lifecycle of an offscreen document

The following example shows how to ensure that an offscreen document exists. The
`setupOffscreenDocument()` function calls [`runtime.getContexts()`](https://developer.chrome.com/docs/extensions/reference/api/runtime#method-getContexts) to find
an existing offscreen document, or creates the document if it doesn't already exist.

    let creating; // A global promise to avoid concurrency issues
    async function setupOffscreenDocument(path) {
      // Check all windows controlled by the service worker to see if one
      // of them is the offscreen document with the given path
      const offscreenUrl = browser.runtime.getURL(path);
      const existingContexts = await browser.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [offscreenUrl]
      });

      if (existingContexts.length > 0) {
        return;
      }

      // create offscreen document
      if (creating) {
        await creating;
      } else {
        creating = browser.offscreen.createDocument({
          url: path,
          reasons: ['CLIPBOARD'],
          justification: 'reason for needing the document',
        });
        await creating;
        creating = null;
      }
    }

Before sending a message to an offscreen document, call `setupOffscreenDocument()` to make sure
the document exists, as demonstrated in the following example.

    browser.action.onClicked.addListener(async () => {
      await setupOffscreenDocument('off_screen.html');

      // Send message to offscreen document
      browser.runtime.sendMessage({
        type: '...',
        target: 'offscreen',
        data: '...'
      });
    });

For complete examples, see the [offscreen-clipboard](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-clipboard-write) and
[offscreen-dom](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.offscreen-dom) demos on GitHub.

### Before Chrome 116: check if an offscreen document is open

[`runtime.getContexts()`](https://developer.chrome.com/docs/extensions/reference/api/runtime#method-getContexts) was added in Chrome 116. In earlier versions of
Chrome, use [`clients.matchAll()`](https://developer.mozilla.org/docs/Web/API/Clients/matchAll)
to check for an existing offscreen document:

    async function hasOffscreenDocument() {
      if ('getContexts' in browser.runtime) {
        const contexts = await browser.runtime.getContexts({
          contextTypes: ['OFFSCREEN_DOCUMENT'],
          documentUrls: [OFFSCREEN_DOCUMENT_PATH]
        });
        return Boolean(contexts.length);
      } else {
        const matchedClients = await clients.matchAll();
        return matchedClients.some(client => {
          return client.url.includes(browser.runtime.id);
        });
      }
    }

<br />

## Types

### CreateParameters

#### Properties

- justification string

  A developer-provided string that explains, in more detail, the need for the background context. The user agent _may_ use this in display to the user.
- reasons [Reason](https://developer.chrome.com/docs/extensions/reference/api/offscreen#type-Reason)\[\]

  The reason(s) the extension is creating the offscreen document.
- url string

  The (relative) URL to load in the document.

### Reason

#### Enum

"TESTING"   
A reason used for testing purposes only.
"AUDIO_PLAYBACK"   
Specifies that the offscreen document is responsible for playing audio.
"IFRAME_SCRIPTING"   
Specifies that the offscreen document needs to embed and script an iframe in order to modify the iframe's content.
"DOM_SCRAPING"   
Specifies that the offscreen document needs to embed an iframe and scrape its DOM to extract information.
"BLOBS"   
Specifies that the offscreen document needs to interact with Blob objects (including `URL.createObjectURL()`).
"DOM_PARSER"   
Specifies that the offscreen document needs to use the [DOMParser API](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).
"USER_MEDIA"   
Specifies that the offscreen document needs to interact with media streams from user media (e.g. `getUserMedia()`).
"DISPLAY_MEDIA"   
Specifies that the offscreen document needs to interact with media streams from display media (e.g. `getDisplayMedia()`).
"WEB_RTC"   
Specifies that the offscreen document needs to use [WebRTC APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API).
"CLIPBOARD"   
Specifies that the offscreen document needs to interact with the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
"LOCAL_STORAGE"   
Specifies that the offscreen document needs access to [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
"WORKERS"   
Specifies that the offscreen document needs to spawn workers.
"BATTERY_STATUS"   
Specifies that the offscreen document needs to use [navigator.getBattery](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API).
"MATCH_MEDIA"   
Specifies that the offscreen document needs to use [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
"GEOLOCATION"   
Specifies that the offscreen document needs to use [navigator.geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation).

<br />

## Methods

### closeDocument()

```typescript
chrome.offscreen.closeDocument(): Promise<void>
```

Closes the currently-open offscreen document for the extension.

#### Returns

- Promise\<void\>

  Promise that resolves when the offscreen document has been closed.

### createDocument()

```typescript
chrome.offscreen.createDocument(
  parameters: CreateParameters,
): Promise<void>
```

Creates a new offscreen document for the extension.

#### Parameters

- parameters [CreateParameters](https://developer.chrome.com/docs/extensions/reference/api/offscreen#type-CreateParameters)

  The parameters describing the offscreen document to create.

#### Returns

- Promise\<void\>

  Promise that resolves when the offscreen document is created and has completed its initial page load.

### hasDocument()

Chrome 150+

```typescript
chrome.offscreen.hasDocument(): Promise<boolean>
```

Determines whether the extension has an active document.

#### Returns

- Promise\<boolean\>

  Promise that resolves with the result of whether the extension has an active offscreen document.

<br />