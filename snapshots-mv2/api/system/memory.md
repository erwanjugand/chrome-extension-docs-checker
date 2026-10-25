refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

The `chrome.system.memory` API.

<br />

<br />

## Permissions

`system.memory`  

<br />

<br />

<br />

<br />

## Types

### MemoryInfo

#### Properties

- availableCapacity number

  The amount of available capacity, in bytes.
- capacity number

  The total amount of physical memory capacity, in bytes.

## Methods

### getInfo()

Promise

```typescript
chrome.system.memory.getInfo(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/system/memory#type-MemoryInfo>
```

Get physical memory information.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (info: MemoryInfo) => void
  ```

  <br />

  - info [MemoryInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/memory#type-MemoryInfo)

#### Returns

- Promise\<[MemoryInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/memory#type-MemoryInfo)\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />