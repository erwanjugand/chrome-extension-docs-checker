<br />

<br />

## Description

Use the `chrome.readingList` API to read from and modify the items in the [Reading List](https://support.google.com/chrome/answer/7343019).

<br />

<br />

## Permissions

`readingList`  

<br />

To use the Reading List API, add the `"readingList"` permission in the extension [manifest](https://developer.chrome.com/docs/extensions/reference/manifest) file:

manifest.json:

    {
      "name": "My reading list extension",
      ...
      "permissions": [
        "readingList"
      ]
    }

<br />

## Availability

Chrome 120+ MV3+

<br />

Chrome features a reading list located on the side panel. It lets users save web pages to read later or when offline.
Use the Reading List API to retrieve existing items and add or remove items from the list.
![Reading list showing a number of articles](https://developer.chrome.com/static/docs/extensions/reference/api/readingList/image/reading-list-showing-num-a0718c5ab1fe5.png) Reading list showing a number of articles

<br />

## Concepts and usage

### Item ordering

Items in the reading list are not in any guaranteed order.

### Item uniqueness

Items are keyed by URL. This includes the hash and query string.

## Use cases

The following sections demonstrate some common use cases for the Reading List API. See [Extension samples](https://developer.chrome.com/docs/extensions/reference/api/readingList#examples) for complete extension examples.

### Add an item

To add an item to the reading list, use [`browser.readingList.addEntry()`](https://developer.chrome.com/docs/extensions/reference/api/readingList#method-addEntry):

    browser.readingList.addEntry({
      title: "New to the web platform in September | web.dev",
      url: "https://developer.chrome.com/",
      hasBeenRead: false
    });

### Display items

To display items from the reading list, use the [`browser.readingList.query()`](https://developer.chrome.com/docs/extensions/reference/api/readingList#method-query) method to retrieve them.
method.

    const items = await browser.readingList.query({});

    for (const item of items) {
      // Do something do display the item
    }

### Mark an item as read

You can use [`browser.readingList.updateEntry()`](https://developer.chrome.com/docs/extensions/reference/api/readingList#method-updateEntry) to update the title, URL, and read status. The following code marks an item as read:

    browser.readingList.updateEntry({
      url: "https://developer.chrome.com/",
      hasBeenRead: true
    });

### Remove an item

To remove an item, use [`browser.readingList.removeEntry()`](https://developer.chrome.com/docs/extensions/reference/api/readingList#method-removeEntry):

    browser.readingList.removeEntry({
      url: "https://developer.chrome.com/"
    });

## Extension samples

For more Reading List API extensions demos, see the [Reading List API sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/readingList).

<br />

## Types

### AddEntryOptions

#### Properties

- hasBeenRead boolean

  Will be `true` if the entry has been read.
- title string

  The title of the entry.
- url string

  The url of the entry.

### QueryInfo

#### Properties

- hasBeenRead boolean optional

  Indicates whether to search for read (`true`) or unread (`false`) items.
- title string optional

  A title to search for.
- url string optional

  A url to search for.

### ReadingListEntry

#### Properties

- creationTime number

  The time the entry was created. Recorded in milliseconds since Jan 1, 1970.
- hasBeenRead boolean

  Will be `true` if the entry has been read.
- lastUpdateTime number

  The last time the entry was updated. This value is in milliseconds since Jan 1, 1970.
- title string

  The title of the entry.
- url string

  The url of the entry.

### RemoveOptions

#### Properties

- url string

  The url to remove.

### UpdateEntryOptions

#### Properties

- hasBeenRead boolean optional

  The updated read status. The existing status remains if a value isn't provided.
- title string optional

  The new title. The existing tile remains if a value isn't provided.
- url string

  The url that will be updated.

## Methods

### addEntry()

```typescript
chrome.readingList.addEntry(
  entry: AddEntryOptions,
): Promise<void>
```

Adds an entry to the reading list if it does not exist.

#### Parameters

- entry [AddEntryOptions](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-AddEntryOptions)

  The entry to add to the reading list.

#### Returns

- Promise\<void\>

  Resolves once the entry has been added.

### query()

```typescript
chrome.readingList.query(
  info: QueryInfo,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/readingList#type-ReadingListEntry[]>
```

Retrieves all entries that match the `QueryInfo` properties. Properties that are not provided will not be matched.

#### Parameters

- info [QueryInfo](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-QueryInfo)

  The properties to search for.

#### Returns

- Promise\<[ReadingListEntry](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-ReadingListEntry)\[\]\>

  Resolves once the entries have been matched.

### removeEntry()

```typescript
chrome.readingList.removeEntry(
  info: RemoveOptions,
): Promise<void>
```

Removes an entry from the reading list if it exists.

#### Parameters

- info [RemoveOptions](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-RemoveOptions)

  The entry to remove from the reading list.

#### Returns

- Promise\<void\>

  Resolves once the entry has been removed.

### updateEntry()

```typescript
chrome.readingList.updateEntry(
  info: UpdateEntryOptions,
): Promise<void>
```

Updates a reading list entry if it exists.

#### Parameters

- info [UpdateEntryOptions](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-UpdateEntryOptions)

  The entry to update.

#### Returns

- Promise\<void\>

  Resolves once the matched entries have been updated.

## Events

### onEntryAdded

```typescript
chrome.readingList.onEntryAdded.addListener(
  callback: function,
)
```

Triggered when a `ReadingListEntry` is added to the reading list.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (entry: ReadingListEntry) => void
  ```

  <br />

  - entry [ReadingListEntry](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-ReadingListEntry)

### onEntryRemoved

```typescript
chrome.readingList.onEntryRemoved.addListener(
  callback: function,
)
```

Triggered when a `ReadingListEntry` is removed from the reading list.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (entry: ReadingListEntry) => void
  ```

  <br />

  - entry [ReadingListEntry](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-ReadingListEntry)

### onEntryUpdated

```typescript
chrome.readingList.onEntryUpdated.addListener(
  callback: function,
)
```

Triggered when a `ReadingListEntry` is updated in the reading list.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (entry: ReadingListEntry) => void
  ```

  <br />

  - entry [ReadingListEntry](https://developer.chrome.com/docs/extensions/reference/api/readingList#type-ReadingListEntry)

<br />