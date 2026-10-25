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

Reads the persisted options for a MIME type. Returns defaults (enabled=true) if none have been stored.

#### Parameters

- mimeType string

  The MIME type whose options to read.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (options: MimeHandlerOptions) => void
  ```

  <br />

  - options [MimeHandlerOptions](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-MimeHandlerOptions)

#### Returns

- Promise\<[MimeHandlerOptions](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-MimeHandlerOptions)\>

  Promise resolved with the persisted options for the MIME type.


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

Sets the configuration options for a specified MIME type.

#### Parameters

- mimeType string

  The MIME type to configure.
- options [MimeHandlerOptions](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler#type-MimeHandlerOptions)

  The new options to use.
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