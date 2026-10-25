refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

The `chrome.extension` API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in [Message Passing](https://developer.chrome.com/docs/extensions/messaging).

<br />

<br />

<br />

<br />

<br />

## Types

### ViewType

Chrome 44+

The type of extension view.

#### Enum

"tab"   
"popup"   

<br />

## Properties

### inIncognitoContext

True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior.

#### Type

boolean

### lastError

≤ MV2 Deprecated since Chrome 58

Please use [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError).

<br />

Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occured lastError will be `undefined`.

#### Type

object

#### Properties

- message string

  Description of the error that has taken place.

## Methods

### getBackgroundPage()

Foreground only

```typescript
chrome.extension.getBackgroundPage(): Window | undefined
```

Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page.

#### Returns

- Window \| undefined

### getExtensionTabs()

≤ MV2 Foreground only Deprecated

```typescript
chrome.extension.getExtensionTabs(
  windowId?: number,
): Window[]
```

Please use [`extension.getViews`](https://developer.chrome.com/docs/extensions/mv2/reference/extension#method-getViews) `{type: "tab"}`.

<br />

Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If `windowId` is specified, returns only the 'window' objects of tabs attached to the specified window.

#### Parameters

- windowId number optional

#### Returns

- Window\[\]

  Array of global window objects

### getURL()

≤ MV2 Deprecated since Chrome 58

```typescript
chrome.extension.getURL(
  path: string,
): string
```

Please use [`runtime.getURL`](https://developer.chrome.com/docs/extensions/mv2/runtime/#method-getURL).

<br />

Converts a relative path within an extension install directory to a fully-qualified URL.

#### Parameters

- path string

  A path to a resource within an extension expressed relative to its install directory.

#### Returns

- string

  The fully-qualified URL to the resource.

### getViews()

Foreground only

```typescript
chrome.extension.getViews(
  fetchProperties?: object,
): Window[]
```

Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension.

#### Parameters

- fetchProperties object optional
  - tabId number optional
    Chrome 54+

    Find a view according to a tab id. If this field is omitted, returns all views.
  - type [ViewType](https://developer.chrome.com/docs/extensions/mv2/reference/extension#type-ViewType) optional

    The type of view to get. If omitted, returns all views (including background pages and tabs).
  - windowId number optional

    The window to restrict the search to. If omitted, returns all views.

#### Returns

- Window\[\]

  Array of global objects

### isAllowedFileSchemeAccess()

Promise

```typescript
chrome.extension.isAllowedFileSchemeAccess(
  callback?: function,
): Promise<boolean>
```

Retrieves the state of the extension's access to the 'file://' scheme. This corresponds to the user-controlled per-extension 'Allow access to File URLs' setting accessible via the chrome://extensions page.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (isAllowedAccess: boolean) => void
  ```

  <br />

  - isAllowedAccess boolean

    True if the extension can access the 'file://' scheme, false otherwise.

#### Returns

- Promise\<boolean\>
  Chrome 99+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### isAllowedIncognitoAccess()

Promise

```typescript
chrome.extension.isAllowedIncognitoAccess(
  callback?: function,
): Promise<boolean>
```

Retrieves the state of the extension's access to Incognito-mode. This corresponds to the user-controlled per-extension 'Allowed in Incognito' setting accessible via the chrome://extensions page.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (isAllowedAccess: boolean) => void
  ```

  <br />

  - isAllowedAccess boolean

    True if the extension has access to Incognito mode, false otherwise.

#### Returns

- Promise\<boolean\>
  Chrome 99+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### sendRequest()

Promise ≤ MV2 Deprecated

```typescript
chrome.extension.sendRequest(
  extensionId?: string,
  request: any,
  callback?: function,
): Promise<any>
```

Please use [`runtime.sendMessage`](https://developer.chrome.com/docs/extensions/mv2/runtime/#method-sendMessage).

<br />

Sends a single request to other listeners within the extension. Similar to [`runtime.connect`](https://developer.chrome.com/docs/extensions/mv2/runtime/#method-connect), but only sends a single request with an optional response. The [`extension.onRequest`](https://developer.chrome.com/docs/extensions/mv2/reference/extension#event-onRequest) event is fired in each page of the extension.

#### Parameters

- extensionId string optional

  The extension ID of the extension you want to connect to. If omitted, default is your own extension.
- request any
- callback function optional
  Chrome 99+


  The `callback` parameter looks like:

  ```typescript
  (response: any) => void
  ```

  <br />

  - response any

    The JSON response object sent by the handler of the request. If an error occurs while connecting to the extension, the promise will be rejected.

#### Returns

- Promise\<any\>
  Chrome 99+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setUpdateUrlData()

```typescript
chrome.extension.setUpdateUrlData(
  data: string,
): void
```

Sets the value of the ap CGI parameter used in the extension's update URL. This value is ignored for extensions that are hosted in the Chrome Extension Gallery.

#### Parameters

- data string

## Events

### onRequest

≤ MV2 Deprecated

```typescript
chrome.extension.onRequest.addListener(
  callback: function,
)
```

Please use [`runtime.onMessage`](https://developer.chrome.com/docs/extensions/mv2/runtime/#event-onMessage).

<br />

Fired when a request is sent from either an extension process or a content script.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (request: any, sender: runtime.MessageSender, sendResponse: function) => void
  ```

  <br />

  - request any
  - sender [runtime.MessageSender](https://developer.chrome.com/docs/extensions/mv2/runtime/#type-MessageSender)
  - sendResponse function


    The `sendResponse` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

### onRequestExternal

≤ MV2 Deprecated

```typescript
chrome.extension.onRequestExternal.addListener(
  callback: function,
)
```

Please use [`runtime.onMessageExternal`](https://developer.chrome.com/docs/extensions/mv2/runtime/#event-onMessageExternal).

<br />

Fired when a request is sent from another extension.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (request: any, sender: runtime.MessageSender, sendResponse: function) => void
  ```

  <br />

  - request any
  - sender [runtime.MessageSender](https://developer.chrome.com/docs/extensions/mv2/runtime/#type-MessageSender)
  - sendResponse function


    The `sendResponse` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

<br />