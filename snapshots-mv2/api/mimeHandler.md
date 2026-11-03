refresh date: 2026-09-25
robots: noindex

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

## Types

### MimeHandlerOptions

#### Properties

- canEmbed boolean optional
  Chrome 157+

  Whether this handler may be used for embedded loads (iframe, embed, object). Defaults to the manifest entry's `can_embed` value. Has no effect while `enabled` is false.
- enabled boolean optional

  Whether this handler is enabled. Defaults to the manifest entry's `enabled` value.

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

Promise

```typescript
chrome.mimeHandler.abortAndFallbackToNativeHandler(
  callback?: function,
): Promise<void>
```

Aborts current stream handling and hands the content off to the user agent's native handler. After this call the extension frame will be torn down; callers should not expect further execution.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getMimeHandlerOptions()

Promise

```typescript
chrome.mimeHandler.getMimeHandlerOptions(
  mimeType: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-MimeHandlerOptions>
```

Reads the options for a MIME type. Each member is the value the extension set, or the manifest entry's value if the extension has not set it.

#### Parameters

- mimeType string

  The MIME type whose options to read. It must be a MIME type the extension handles through mime_types_handler.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (options: MimeHandlerOptions) => void
  ```

  <br />

  - options [MimeHandlerOptions](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-MimeHandlerOptions)

#### Returns

- Promise\<[MimeHandlerOptions](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-MimeHandlerOptions)\>

  Promise resolved with the options for the MIME type.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getStreamInfo()

Promise

```typescript
chrome.mimeHandler.getStreamInfo(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-StreamInfo>
```

Retrieves stream information for the current MIME handler context. Must be called from within a MIME handler extension page.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (info: StreamInfo) => void
  ```

  <br />

  - info [StreamInfo](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-StreamInfo)

#### Returns

- Promise\<[StreamInfo](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-StreamInfo)\>


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setMimeHandlerOptions()

Promise

```typescript
chrome.mimeHandler.setMimeHandlerOptions(
  mimeType: string,
  options: MimeHandlerOptions,
  callback?: function,
): Promise<void>
```

Sets the configuration options for a specified MIME type. If the extension runs in split incognito mode, options set from incognito apply only to incognito and last until the incognito session ends. Options not set from incognito follow the values set outside incognito.

#### Parameters

- mimeType string

  The MIME type to configure. It must be a MIME type the extension handles through mime_types_handler.
- options [MimeHandlerOptions](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-MimeHandlerOptions)

  The options to change.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>

  Promise resolved when the configuration has been set.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />