<br />

<br />

## Description

Use the `chrome.processes` API to interact with the browser's processes.

<br />

<br />

## Permissions

`processes`  

<br />

<br />

## Availability

Dev channel

<br />

<br />

<br />

## Types

### Cache

#### Properties

- liveSize number

  The part of the cache that is utilized, in bytes.
- size number

  The size of the cache, in bytes.

### Process

#### Properties

- cpu number optional

  The most recent measurement of the process's CPU usage, expressed as the percentage of a single CPU core used in total, by all of the process's threads. This gives a value from zero to CpuInfo.numOfProcessors\*100, which can exceed 100% in multi-threaded processes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- cssCache [Cache](https://developer.chrome.com/docs/extensions/reference/api/processes#type-Cache) optional

  The most recent information about the CSS cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- id number

  Unique ID of the process provided by the browser.
- imageCache [Cache](https://developer.chrome.com/docs/extensions/reference/api/processes#type-Cache) optional

  The most recent information about the image cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- jsMemoryAllocated number optional

  The most recent measurement of the process JavaScript allocated memory, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- jsMemoryUsed number optional

  The most recent measurement of the process JavaScript memory used, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- naclDebugPort number

  The debugging port for Native Client processes. Zero for other process types and for NaCl processes that do not have debugging enabled.
- network number optional

  The most recent measurement of the process network usage, in bytes per second. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- osProcessId number

  The ID of the process, as provided by the OS.
- privateMemory number optional

  The most recent measurement of the process private memory usage, in bytes. Only available when receiving the object as part of a callback from onUpdatedWithMemory or getProcessInfo with the includeMemory flag.
- profile string

  The profile which the process is associated with.
- scriptCache [Cache](https://developer.chrome.com/docs/extensions/reference/api/processes#type-Cache) optional

  The most recent information about the script cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- sqliteMemory number optional

  The most recent measurement of the process's SQLite memory usage, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
- tasks [TaskInfo](https://developer.chrome.com/docs/extensions/reference/api/processes#type-TaskInfo)\[\]

  Array of TaskInfos representing the tasks running on this process.
- type [ProcessType](https://developer.chrome.com/docs/extensions/reference/api/processes#type-ProcessType)

  The type of process.

### ProcessType

The types of the browser processes.

#### Enum

"browser"   
"renderer"   
"extension"   
"notification"   
"plugin"   
"worker"   
Obsolete, will never be returned.
"nacl"   
"service_worker"   
Obsolete, will never be returned.
"utility"   
"gpu"   
"other"   

<br />

### TaskInfo

#### Properties

- tabId number optional

  Optional tab ID, if this task represents a tab running on a renderer process.
- title string

  The title of the task.

## Methods

### getProcessIdForTab()

```typescript
chrome.processes.getProcessIdForTab(
  tabId: number,
): Promise<number>
```

Returns the ID of the renderer process for the specified tab.

#### Parameters

- tabId number

  The ID of the tab for which the renderer process ID is to be returned.

#### Returns

- Promise\<number\>

  A callback to return the ID of the renderer process of a tab.

### getProcessInfo()

```typescript
chrome.processes.getProcessInfo(
  processIds: number | number[],
  includeMemory: boolean,
): Promise<object>
```

Retrieves the process information for each process ID specified.

#### Parameters

- processIds number \| number\[\]

  The list of process IDs or single process ID for which to return the process information. An empty list indicates all processes are requested.
- includeMemory boolean

  True if detailed memory usage is required. Note, collecting memory usage information incurs extra CPU usage and should only be queried for when needed.

#### Returns

- Promise\<object\>

  A callback called when the processes information is collected.

### terminate()

```typescript
chrome.processes.terminate(
  processId: number,
): Promise<boolean>
```

Terminates the specified renderer process. Equivalent to visiting about:crash, but without changing the tab's URL.

#### Parameters

- processId number

  The ID of the process to be terminated.

#### Returns

- Promise\<boolean\>

  A callback to report the status of the termination.

## Events

### onCreated

```typescript
chrome.processes.onCreated.addListener(
  callback: function,
)
```

Fired each time a process is created, providing the corrseponding Process object.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (process: Process) => void
  ```

  <br />

  - process [Process](https://developer.chrome.com/docs/extensions/reference/api/processes#type-Process)

### onExited

```typescript
chrome.processes.onExited.addListener(
  callback: function,
)
```

Fired each time a process is terminated, providing the type of exit.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (processId: number, exitType: number, exitCode: number) => void
  ```

  <br />

  - processId number
  - exitType number
  - exitCode number

### onUnresponsive

```typescript
chrome.processes.onUnresponsive.addListener(
  callback: function,
)
```

Fired each time a process becomes unresponsive, providing the corrseponding Process object.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (process: Process) => void
  ```

  <br />

  - process [Process](https://developer.chrome.com/docs/extensions/reference/api/processes#type-Process)

### onUpdated

```typescript
chrome.processes.onUpdated.addListener(
  callback: function,
)
```

Fired each time the Task Manager updates its process statistics, providing the dictionary of updated Process objects, indexed by process ID.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (processes: object) => void
  ```

  <br />

  - processes object

### onUpdatedWithMemory

```typescript
chrome.processes.onUpdatedWithMemory.addListener(
  callback: function,
)
```

Fired each time the Task Manager updates its process statistics, providing the dictionary of updated Process objects, indexed by process ID. Identical to onUpdate, with the addition of memory usage details included in each Process object. Note, collecting memory usage information incurs extra CPU usage and should only be listened for when needed.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (processes: object) => void
  ```

  <br />

  - processes object

<br />