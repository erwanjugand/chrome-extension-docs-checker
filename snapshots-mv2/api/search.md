refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.search` API to search via the default provider.

<br />

<br />

## Permissions

`search`  

<br />

<br />

## Availability

Chrome 87+

<br />

<br />

<br />

## Types

### Disposition

#### Enum

"CURRENT_TAB"   
Specifies that the search results display in the calling tab or the tab from the active browser.
"NEW_TAB"   
Specifies that the search results display in a new tab.
"NEW_WINDOW"   
Specifies that the search results display in a new window.

<br />

### QueryInfo

#### Properties

- disposition [Disposition](https://developer.chrome.com/docs/extensions/mv2/reference/search#type-Disposition) optional

  Location where search results should be displayed. `CURRENT_TAB` is the default.
- tabId number optional

  Location where search results should be displayed. `tabId` cannot be used with `disposition`.
- text string

  String to query with the default search provider.

## Methods

### query()

Promise

```typescript
chrome.search.query(
  queryInfo: QueryInfo,
  callback?: function,
): Promise<void>
```

Used to query the default search provider. In case of an error, [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError) will be set.

#### Parameters

- queryInfo [QueryInfo](https://developer.chrome.com/docs/extensions/mv2/reference/search#type-QueryInfo)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />