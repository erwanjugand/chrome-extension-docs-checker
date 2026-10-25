<br />

<br />

## Description

Use the `chrome.mimeHandler` API to handle MIME type streams in third-party extensions.

<br />

<br />

<br />

## Availability

Chrome 151+

<br />

<br />

## Manifest

The following keys must be declared [in the manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use this API.
`"mime_types_handler"`  

<br />

## Concepts and usage

Historically, third-party extensions that handle specific document types (such as PDF viewers) relied on network request interception to catch navigations and redirect users to an extension page. Registering as a MIME handler avoids several limitations of that approach:

- The original URL stays in the address bar instead of being replaced by a `chrome-extension://` URL.
- Your extension fetches the response Chrome already received, instead of making a second network request. Documents delivered by POST requests or from single-use URLs work correctly.
- Your extension can render documents loaded within `<embed>`, `<object>`, or `<iframe>` elements.
- Local files (`file://` URLs) work without the user manually enabling "Allow access to file URLs" in the extension's settings.

MIME handlers apply only to documents that occupy an entire frame: top-level navigations and embedded documents. They never apply to inline subresources (e.g. `<audio>`, `<img>`, or `<video>` elements).

### Register a handler

To register your extension as a MIME handler, declare the [`"mime_types_handler"`](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#manifest) key in the [manifest](https://developer.chrome.com/docs/extensions/reference/manifest). Each entry maps a MIME type to the extension page that renders it:

manifest.json:

    {
      "name": "My PDF Viewer",
      ...
      "mime_types_handler": {
        "application/pdf": {
          "handler_url": "viewer.html",
          "can_embed": true
        }
      },
      ...
    }

Set `"can_embed"` to `true` to also handle documents embedded in `<embed>`, `<object>`, or `<iframe>` elements. If omitted, your handler only receives top-level navigations. As of Chrome 151, `application/pdf` is the only MIME type available to public handlers; declaring an unsupported MIME type causes an installation warning.

If more than one installed extension registers for the same MIME type, the most recently installed extension handles it. If that extension is uninstalled, the previously installed handler becomes active again.

### Retrieve stream information

When a user opens a document of a registered MIME type, Chrome loads your handler page in place of its built-in viewer. From the handler page, call [`getStreamInfo()`](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#method-getStreamInfo) to retrieve a [`StreamInfo`](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#type-StreamInfo) object. This includes the `originalUrl` the user navigated to, the HTTP `responseHeaders`, whether the document is loaded in an `embedded` context, and a `streamUrl` that can be used to fetch the document's content.

The `streamUrl` can be fetched exactly once, and only from your extension's origin. Read the response fully before processing it; a second fetch of the same `streamUrl` fails. Use `originalUrl` when displaying the document's location or title, not to fetch the content, because the original request may not be repeatable.

> [!NOTE]
> **Note:** `getStreamInfo()` only succeeds on a handler page that Chrome loaded for a document. Calling it from another extension context, like the service worker or an options page, fails because there is no associated stream.

### Fall back to the native handler

Your handler may encounter documents it cannot render, such as corrupted or password-protected files. Call [`abortAndFallbackToNativeHandler()`](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#method-abortAndFallbackToNativeHandler) to stop handling the document and hand it back to Chrome's built-in viewer, rather than leaving the user on a broken page. Chrome unloads your handler page as part of the fallback; no code runs after this call.

Chrome buffers the response while your handler runs. If the response has been fully received when you call this method, Chrome serves the built-in viewer from the buffered copy without a new network request. Otherwise, Chrome reloads the document from the network, which may fail for documents delivered by POST or from single-use URLs. Fetch the stream fully before deciding whether you can render it; once your fetch of `streamUrl` completes, Chrome has the full response.

### Handle API availability

In versions of Chrome before Chrome 151, an extension declaring `"mime_types_handler"` still installs and runs, but is not registered as a handler and `browser.mimeHandler` is undefined. Extensions migrating from network request interception can check for the API at startup and keep their existing approach as a fallback:

service-worker.js:

    if (browser.mimeHandler) {
      // Chrome routes registered MIME types to the handler page
      // declared in the manifest.
    } else {
      // Fall back to network request interception.
    }

## Examples

### Handle a stream

The following example runs in the handler page declared in the manifest. It fetches the document's content and falls back to Chrome's built-in viewer if rendering fails:

viewer.js:

    async function loadDocument() {
      const streamInfo = await browser.mimeHandler.getStreamInfo();

      // The `embedded` property is true if the document is loaded
      // within an <embed>, <object>, or <iframe> element.
      if (streamInfo.embedded) {
        // Adjust the UI (e.g., hide the top navigation bar).
        document.body.classList.add('embedded-view');
      }

      // Fetch the content using the provided streamUrl. The stream can
      // only be consumed once, so read it fully before continuing.
      const response = await fetch(streamInfo.streamUrl);
      const data = await response.arrayBuffer();

      try {
        // Render the document (e.g., using PDF.js).
        await renderDocument(data);
      } catch (e) {
        // Can't render this document. Fall back to Chrome's built-in
        // viewer; the page unloads and no code runs after this call.
        browser.mimeHandler.abortAndFallbackToNativeHandler();
      }
    }

    loadDocument();

### Let users toggle handling

Handler options are stored per MIME type. The following example uses [`getMimeHandlerOptions()`](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#method-getMimeHandlerOptions) and [`setMimeHandlerOptions()`](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#method-setMimeHandlerOptions) to let users turn handling off from the options page, without uninstalling the extension. While handling is disabled, documents of that type are no longer routed to your extension.

options.js:

    const checkbox = document.querySelector('#handle-pdfs');

    async function initOptions() {
      const options =
          await browser.mimeHandler.getMimeHandlerOptions('application/pdf');
      // Handling is enabled unless it has been explicitly disabled.
      checkbox.checked = options.enabled !== false;
    }

    checkbox.addEventListener('change', async () => {
      await browser.mimeHandler.setMimeHandlerOptions('application/pdf', {
        enabled: checkbox.checked
      });
    });

    initOptions();

<br />

## Types

### MimeHandlerOptions

#### Properties

- enabled boolean

  Whether this handler is active for the given MIME type.

### StreamInfo

#### Properties

- embedded boolean

  True if loaded in an embedded context (iframe/embed/object).
- mimeType string

  The MIME type of the intercepted content.
- originalUrl string

  The original URL the user navigated to.
- responseHeaders object

  HTTP response headers as key-value pairs.
- streamUrl string

  The URL to fetch the stream data from.
- tabId number

  The tab ID containing the document.

## Methods

### abortAndFallbackToNativeHandler()

```typescript
chrome.mimeHandler.abortAndFallbackToNativeHandler(): Promise<void>
```

Aborts current stream handling and hands the content off to the user agent's native handler. After this call the extension frame will be torn down; callers should not expect further execution.

#### Returns

- Promise\<void\>

### getMimeHandlerOptions()

```typescript
chrome.mimeHandler.getMimeHandlerOptions(
  mimeType: string,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#type-MimeHandlerOptions>
```

Reads the persisted options for a MIME type. Returns defaults (enabled=true) if none have been stored.

#### Parameters

- mimeType string

  The MIME type whose options to read.

#### Returns

- Promise\<[MimeHandlerOptions](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#type-MimeHandlerOptions)\>

  Promise resolved with the persisted options for the MIME type.

### getStreamInfo()

```typescript
chrome.mimeHandler.getStreamInfo(): Promise<https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#type-StreamInfo>
```

Retrieves stream information for the current MIME handler context. Must be called from within a MIME handler extension page.

#### Returns

- Promise\<[StreamInfo](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#type-StreamInfo)\>

### setMimeHandlerOptions()

```typescript
chrome.mimeHandler.setMimeHandlerOptions(
  mimeType: string,
  options: MimeHandlerOptions,
): Promise<void>
```

Sets the configuration options for a specified MIME type.

#### Parameters

- mimeType string

  The MIME type to configure.
- options [MimeHandlerOptions](https://developer.chrome.com/docs/extensions/reference/api/mimeHandler#type-MimeHandlerOptions)

  The new options to use.

#### Returns

- Promise\<void\>

  Promise resolved when the configuration has been set.

<br />