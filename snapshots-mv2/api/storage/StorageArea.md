refresh date: 2026-09-25
robots: noindex

The `StorageArea` interface is used by the [`chrome.storage`](https://developer.chrome.com/docs/extensions/mv2/reference/storage) API.

<br />

## Methods

### clear()

Promise

```typescript
chrome.storage.StorageArea.clear(
  callback?: function,
): Promise<void>
```

Removes all items from storage.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 95+

  Promise that resolves on success, or rejects on failure.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### get()

Promise

```typescript
chrome.storage.StorageArea.get(
  keys?: string | string[] | object,
  callback?: function,
): Promise<object>
```

Gets one or more items from storage.

#### Parameters

- keys string \| string\[\] \| object optional

  A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (items: object) => void
  ```

  <br />

  - items object

    Object with items in their key-value mappings.

#### Returns

- Promise\<object\>
  Chrome 95+

  Promise that resolves with an object containing a key-value map for the requested items, or rejects on failure.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getBytesInUse()

Promise

```typescript
chrome.storage.StorageArea.getBytesInUse(
  keys?: string | string[],
  callback?: function,
): Promise<number>
```

Gets the amount of space (in bytes) being used by one or more items.

#### Parameters

- keys string \| string\[\] optional

  A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (bytesInUse: number) => void
  ```

  <br />

  - bytesInUse number

    Amount of space being used in storage, in bytes.

#### Returns

- Promise\<number\>
  Chrome 95+

  Promise that resolves with the amount of space being used by storage, or rejects on failure.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getKeys()

Promise Chrome 130+

```typescript
chrome.storage.StorageArea.getKeys(
  callback?: function,
): Promise<string[]>
```

Gets all keys from storage.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (keys: string[]) => void
  ```

  <br />

  - keys string\[\]

    Array with keys read from storage.

#### Returns

- Promise\<string\[\]\>

  Promise that resolves with storage keys, or rejects on failure.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### remove()

Promise

```typescript
chrome.storage.StorageArea.remove(
  keys: string | string[],
  callback?: function,
): Promise<void>
```

Removes one or more items from storage.

#### Parameters

- keys string \| string\[\]

  A single key or a list of keys for items to remove.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 95+

  Promise that resolves on success, or rejects on failure.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### set()

Promise

```typescript
chrome.storage.StorageArea.set(
  items: object,
  callback?: function,
): Promise<void>
```

Sets multiple items.

#### Parameters

- items object

  An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.

  Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 95+

  Promise that resolves on success, or rejects on failure.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setAccessLevel()

Promise Chrome 102+

```typescript
chrome.storage.StorageArea.setAccessLevel(
  accessOptions: object,
  callback?: function,
): Promise<void>
```

Sets the desired access level for the storage area. By default, `session` storage is restricted to trusted contexts (extension pages and service workers), while `managed`, `local`, and `sync` storage allow access from both trusted and untrusted contexts.

#### Parameters

- accessOptions object
  - accessLevel [AccessLevel](https://developer.chrome.com/docs/extensions/mv2/reference/storage/#type-AccessLevel)

    The access level of the storage area.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>

  Promise that resolves on success, or rejects on failure.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onChanged

Chrome 73+

```typescript
chrome.storage.StorageArea.onChanged.addListener(
  callback: function,
)
```

Fired when one or more items change.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (changes: object) => void
  ```

  <br />

  - changes object

<br />