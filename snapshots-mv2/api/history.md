refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.history` API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see [Override Pages](https://developer.chrome.com/extensions/develop/ui/override-chrome-pages).

<br />

<br />

## Permissions

`history`  

<br />

> [!CAUTION]
> This permission [triggers a warning](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings#permissions_with_warnings).

<br />

## Manifest

You must declare the "history" permission in the [extension manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use the history API. For
example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "history"
      ],
      ...
    }

## Transition types

The history API uses a *transition type* to describe how the browser navigated to a particular URL
on a particular visit. For example, if a user visits a page by clicking a link on another page, the
transition type is "link".

The following table describes each transition type.

| Transition type | Description |
|---|---|
| "link" | The user got to this page by clicking a link on another page. |
| "typed" | The user got this page by typing the URL in the address bar. Also used for other explicit navigation actions. See also [generated](https://developer.chrome.com/docs/extensions/mv2/reference/history#tt_generated), which is used for cases where the user selected a choice that didn't look at all like a URL. |
| "auto_bookmark" | The user got to this page through a suggestion in the UI---for example, through a menu item. |
| "auto_subframe" | Subframe navigation. This is any content that is automatically loaded in a non-top-level frame. For example, if a page consists of several frames containing ads, those ad URLs have this transition type. The user may not even realize the content in these pages is a separate frame, and so may not care about the URL (see also [manual_subframe](https://developer.chrome.com/docs/extensions/mv2/reference/history#tt_manual_subframe)). |
| "manual_subframe" | For subframe navigations that are explicitly requested by the user and generate new navigation entries in the back/forward list. An explicitly requested frame is probably more important than an automatically loaded frame because the user probably cares about the fact that the requested frame was loaded. |
| "generated" | The user got to this page by typing in the address bar and selecting an entry that did not look like a URL. For example, a match might have the URL of a Google search result page, but it might appear to the user as "Search Google for ...". These are not quite the same as [typed](https://developer.chrome.com/docs/extensions/mv2/reference/history#tt_typed) navigations because the user didn't type or see the destination URL. See also [keyword](https://developer.chrome.com/docs/extensions/mv2/reference/history#tt_keyword). |
| "auto_toplevel" | The page was specified in the command line or is the start page. |
| "form_submit" | The user filled out values in a form and submitted it. Note that in some situations---such as when a form uses script to submit contents---submitting a form does not result in this transition type. |
| "reload" | The user reloaded the page, either by clicking the reload button or by pressing Enter in the address bar. Session restore and Reopen closed tab use this transition type, too. |
| "keyword" | The URL was generated from a replaceable keyword other than the default search provider. See also [keyword_generated](https://developer.chrome.com/docs/extensions/mv2/reference/history#tt_keyword_generated). |
| "keyword_generated" | Corresponds to a visit generated for a keyword. See also [keyword](https://developer.chrome.com/docs/extensions/mv2/reference/history#tt_keyword). |

## Examples

To try this API, install the [history API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/history) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### HistoryItem

An object encapsulating one result of a history query.

#### Properties

- id string

  The unique identifier for the item.
- lastVisitTime number optional

  When this page was last loaded, represented in milliseconds since the epoch.
- title string optional

  The title of the page when it was last loaded.
- typedCount number optional

  The number of times the user has navigated to this page by typing in the address.
- url string optional

  The URL navigated to by a user.
- visitCount number optional

  The number of times the user has navigated to this page.

### TransitionType

Chrome 44+

The [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) for this visit from its referrer.

#### Enum

"link"   
The user arrived at this page by clicking a link on another page.
"typed"   
The user arrived at this page by typing the URL in the address bar. This is also used for other explicit navigation actions.
"auto_bookmark"   
The user arrived at this page through a suggestion in the UI, for example, through a menu item.
"auto_subframe"   
The user arrived at this page through subframe navigation that they didn't request, such as through an ad loading in a frame on the previous page. These don't always generate new navigation entries in the back and forward menus.
"manual_subframe"   
The user arrived at this page by selecting something in a subframe.
"generated"   
The user arrived at this page by typing in the address bar and selecting an entry that didn't look like a URL, such as a Google Search suggestion. For example, a match might have the URL of a Google Search result page, but it might appear to the user as "Search Google for ...". These are different from typed navigations because the user didn't type or see the destination URL. They're also related to keyword navigations.
"auto_toplevel"   
The page was specified in the command line or is the start page.
"form_submit"   
The user arrived at this page by filling out values in a form and submitting the form. Not all form submissions use this transition type.
"reload"   
The user reloaded the page, either by clicking the reload button or by pressing Enter in the address bar. Session restore and Reopen closed tab also use this transition type.
"keyword"   
The URL for this page was generated from a replaceable keyword other than the default search provider.
"keyword_generated"   
Corresponds to a visit generated for a keyword.

<br />

### UrlDetails

Chrome 88+

#### Properties

- url string

  The URL for the operation. It must be in the format as returned from a call to `history.search()`.

### VisitItem

An object encapsulating one visit to a URL.

#### Properties

- id string

  The unique identifier for the corresponding [`history.HistoryItem`](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-HistoryItem).
- isLocal boolean
  Chrome 115+

  True if the visit originated on this device. False if it was synced from a different device.
- referringVisitId string

  The visit ID of the referrer.
- transition [TransitionType](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-TransitionType)

  The [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) for this visit from its referrer.
- visitId string

  The unique identifier for this visit.
- visitTime number optional

  When this visit occurred, represented in milliseconds since the epoch.

## Methods

### addUrl()

Promise

```typescript
chrome.history.addUrl(
  details: UrlDetails,
  callback?: function,
): Promise<void>
```

Adds a URL to the history at the current time with a [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) of "link".

#### Parameters

- details [UrlDetails](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-UrlDetails)
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

### deleteAll()

Promise

```typescript
chrome.history.deleteAll(
  callback?: function,
): Promise<void>
```

Deletes all items from the history.

#### Parameters

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

### deleteRange()

Promise

```typescript
chrome.history.deleteRange(
  range: object,
  callback?: function,
): Promise<void>
```

Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.

#### Parameters

- range object
  - endTime number

    Items added to history before this date, represented in milliseconds since the epoch.
  - startTime number

    Items added to history after this date, represented in milliseconds since the epoch.
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

### deleteUrl()

Promise

```typescript
chrome.history.deleteUrl(
  details: UrlDetails,
  callback?: function,
): Promise<void>
```

Removes all occurrences of the given URL from the history.

#### Parameters

- details [UrlDetails](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-UrlDetails)
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

### getVisits()

Promise

```typescript
chrome.history.getVisits(
  details: UrlDetails,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/history#type-VisitItem[]>
```

Retrieves information about visits to a URL.

#### Parameters

- details [UrlDetails](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-UrlDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (results: VisitItem[]) => void
  ```

  <br />

  - results [VisitItem](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-VisitItem)\[\]

#### Returns

- Promise\<[VisitItem](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-VisitItem)\[\]\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### search()

Promise

```typescript
chrome.history.search(
  query: object,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/history#type-HistoryItem[]>
```

Searches the history for the last visit time of each page matching the query.

#### Parameters

- query object
  - endTime number optional

    Limit results to those visited before this date, represented in milliseconds since the epoch.
  - maxResults number optional

    The maximum number of results to retrieve. Defaults to 100.
  - startTime number optional

    Limit results to those visited after this date, represented in milliseconds since the epoch. If property is not specified, it will default to 24 hours.
  - text string

    A free-text query to the history service. Leave this empty to retrieve all pages.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (results: HistoryItem[]) => void
  ```

  <br />

  - results [HistoryItem](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-HistoryItem)\[\]

#### Returns

- Promise\<[HistoryItem](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-HistoryItem)\[\]\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onVisited

```typescript
chrome.history.onVisited.addListener(
  callback: function,
)
```

Fired when a URL is visited, providing the `HistoryItem` data for that URL. This event fires before the page has loaded.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (result: HistoryItem) => void
  ```

  <br />

  - result [HistoryItem](https://developer.chrome.com/docs/extensions/mv2/reference/history#type-HistoryItem)

### onVisitRemoved

```typescript
chrome.history.onVisitRemoved.addListener(
  callback: function,
)
```

Fired when one or more URLs are removed from history. When all visits have been removed the URL is purged from history.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (removed: object) => void
  ```

  <br />

  - removed object
    - allHistory boolean

      True if all history was removed. If true, then urls will be empty.
    - urls string\[\] optional

<br />