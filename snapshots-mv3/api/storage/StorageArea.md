The `StorageArea` interface is used by the [`browser.storage`](https://developer.chrome.com/docs/extensions/reference/api/storage) API.

<br />

## Methods

### clear()

```typescript
chrome.storage.StorageArea.clear(): Promise<void>
```

Removes all items from storage.

#### Returns

- Promise\<void\>
  Chrome 95+

  Promise that resolves on success, or rejects on failure.

### get()

```typescript
chrome.storage.StorageArea.get(
  keys?: string | string[] | object,
): Promise<object>
```

Gets one or more items from storage.

#### Parameters

- keys string \| string\[\] \| object optional

  A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.

#### Returns

- Promise\<object\>
  Chrome 95+

  Promise that resolves with an object containing a key-value map for the requested items, or rejects on failure.

### getBytesInUse()

```typescript
chrome.storage.StorageArea.getBytesInUse(
  keys?: string | string[],
): Promise<number>
```

Gets the amount of space (in bytes) being used by one or more items.

#### Parameters

- keys string \| string\[\] optional

  A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.

#### Returns

- Promise\<number\>
  Chrome 95+

  Promise that resolves with the amount of space being used by storage, or rejects on failure.

### getKeys()

Chrome 130+

```typescript
chrome.storage.StorageArea.getKeys(): Promise<string[]>
```

Gets all keys from storage.

#### Returns

- Promise\<string\[\]\>

  Promise that resolves with storage keys, or rejects on failure.

### remove()

```typescript
chrome.storage.StorageArea.remove(
  keys: string | string[],
): Promise<void>
```

Removes one or more items from storage.

#### Parameters

- keys string \| string\[\]

  A single key or a list of keys for items to remove.

#### Returns

- Promise\<void\>
  Chrome 95+

  Promise that resolves on success, or rejects on failure.

### set()

```typescript
chrome.storage.StorageArea.set(
  items: object,
): Promise<void>
```

Sets multiple items.

#### Parameters

- items object

  An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.

  Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).

#### Returns

- Promise\<void\>
  Chrome 95+

  Promise that resolves on success, or rejects on failure.

### setAccessLevel()

Chrome 102+

```typescript
chrome.storage.StorageArea.setAccessLevel(
  accessOptions: object,
): Promise<void>
```

Sets the desired access level for the storage area. By default, `session` storage is restricted to trusted contexts (extension pages and service workers), while `managed`, `local`, and `sync` storage allow access from both trusted and untrusted contexts.

#### Parameters

- accessOptions object
  - accessLevel [AccessLevel](https://developer.chrome.com/docs/extensions/reference/api/storage/#type-AccessLevel)

    The access level of the storage area.

#### Returns

- Promise\<void\>

  Promise that resolves on success, or rejects on failure.

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