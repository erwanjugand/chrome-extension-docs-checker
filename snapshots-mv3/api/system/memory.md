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

```typescript
chrome.system.memory.getInfo(): Promise<https://developer.chrome.com/docs/extensions/reference/api/system/memory#type-MemoryInfo>
```

Get physical memory information.

#### Returns

- Promise\<[MemoryInfo](https://developer.chrome.com/docs/extensions/reference/api/system/memory#type-MemoryInfo)\>
  Chrome 91+

<br />