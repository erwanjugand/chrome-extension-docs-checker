refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `system.cpu` API to query CPU metadata.

<br />

<br />

## Permissions

`system.cpu`  

<br />

<br />

<br />

<br />

## Types

### CpuInfo

#### Properties

- archName string

  The architecture name of the processors.
- features string\[\]

  A set of feature codes indicating some of the processor's capabilities. The currently supported codes are "mmx", "sse", "sse2", "sse3", "ssse3", "sse4_1", "sse4_2", and "avx".
- modelName string

  The model name of the processors.
- numOfProcessors number

  The number of logical processors.
- processors [ProcessorInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/cpu#type-ProcessorInfo)\[\]

  Information about each logical processor.
- temperatures number\[\]
  Chrome 60+

  List of CPU temperature readings from each thermal zone of the CPU. Temperatures are in degrees Celsius.

  **Currently supported on Chrome OS only.**

### CpuTime

#### Properties

- idle number

  The cumulative time spent idle by this processor.
- kernel number

  The cumulative time used by kernel programs on this processor.
- total number

  The total cumulative time for this processor. This value is equal to user + kernel + idle.
- user number

  The cumulative time used by userspace programs on this processor.

### ProcessorInfo

#### Properties

- usage [CpuTime](https://developer.chrome.com/docs/extensions/mv2/reference/system/cpu#type-CpuTime)

  Cumulative usage info for this logical processor.

## Methods

### getInfo()

Promise

```typescript
chrome.system.cpu.getInfo(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/system/cpu#type-CpuInfo>
```

Queries basic CPU information of the system.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (info: CpuInfo) => void
  ```

  <br />

  - info [CpuInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/cpu#type-CpuInfo)

#### Returns

- Promise\<[CpuInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/cpu#type-CpuInfo)\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />