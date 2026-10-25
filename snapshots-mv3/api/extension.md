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

## Methods

### getBackgroundPage()

Foreground only

```typescript
chrome.extension.getBackgroundPage(): Window | undefined
```

Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page.

#### Returns

- Window \| undefined

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
  - type [ViewType](https://developer.chrome.com/docs/extensions/reference/api/extension#type-ViewType) optional

    The type of view to get. If omitted, returns all views (including background pages and tabs).
  - windowId number optional

    The window to restrict the search to. If omitted, returns all views.

#### Returns

- Window\[\]

  Array of global objects

### isAllowedFileSchemeAccess()

```typescript
chrome.extension.isAllowedFileSchemeAccess(): Promise<boolean>
```

Retrieves the state of the extension's access to the 'file://' scheme. This corresponds to the user-controlled per-extension 'Allow access to File URLs' setting accessible via the chrome://extensions page.

#### Returns

- Promise\<boolean\>
  Chrome 99+

### isAllowedIncognitoAccess()

```typescript
chrome.extension.isAllowedIncognitoAccess(): Promise<boolean>
```

Retrieves the state of the extension's access to Incognito-mode. This corresponds to the user-controlled per-extension 'Allowed in Incognito' setting accessible via the chrome://extensions page.

#### Returns

- Promise\<boolean\>
  Chrome 99+

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

<br />