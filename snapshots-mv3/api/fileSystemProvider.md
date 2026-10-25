<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.fileSystemProvider` API to create file systems, that can be accessible from the file manager on Chrome OS.

<br />

<br />

## Permissions

`fileSystemProvider`  

<br />

<br />

## Availability

ChromeOS only

<br />

<br />

You must declare the "fileSystemProvider" permission and section in the [extension manifest](https://developer.chrome.com/extensions/manifest) to use the File System Provider API. For example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "fileSystemProvider"
      ],
      ...
      "file_system_provider_capabilities": {
        "configurable": true,
        "watchable": false,
        "multiple_mounts": true,
        "source": "network"
      },
      ...
    }

The file_system_provider section must be declared as follows:

**`configurable` (boolean)** - optional
:   Whether configuring via onConfigureRequested is supported. By default: false.

**`multiple_mounts` (boolean)** - optional
:   Whether multiple (more than one) mounted file systems are supported. By default: false.

**`watchable` (boolean)** - optional
:   Whether setting watchers and notifying about changes is supported. By default: false.

**`source` (enum of "file", "device", or "network")** - required
:   Source of data for mounted file systems.

Files app uses above information in order to render related UI elements appropriately. For example, if `configurable` is set to true, then a menu item for configuring volumes will be rendered. Similarly, if `multiple_mounts` is set to `true`, then Files app will allow to add more than one mount points from the UI. If `watchable` is `false`, then a refresh button will be rendered. Note, that if possible you should add support for watchers, so changes on the file system can be reflected immediately and automatically.

## Overview

File System Provider API allows extensions to support virtual file systems, which are available in the file manager on ChromeOS. Use cases include decompressing archives and accessing files in a cloud service other than Drive.

## Mounting file systems

Providing extensions can either provide file system contents from an external source (such as a remote server or a USB device), or using a local file (such as an archive) as its input.

In order to write file systems which are file handlers (source is `"file"`) the provider must be a packaged app, as the `onLaunched` event is not available to extensions.

If the source is network or a device, then the file system should be mounted when [onMountRequested](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onMountRequested) event is called.

| [Source](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#manifest-source) of the file system data | Entry point |
|---|---|
| `"file"` | Available to packaged apps only. |
| `"device"` or `"network"` | [onMountRequested](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onMountRequested) |

## Configuring file systems

Provided file systems once mounted can be configured via the [onConfigureRequested](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onConfigureRequested) event. It's especially useful for file systems which provide contents via network in order to set proper credentials. Handling this event is optional.

## Life cycle

Provided file systems once mounted are remembered by Chrome and remounted automatically after reboot or restart. Hence, once a file system is [mounted](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#method-mount) by a providing extension, it will stay until either the extension is unloaded, or the extension calls the [unmount](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#method-unmount) method.

<br />

## Types

### AbortRequestedOptions

#### Properties

- fileSystemId string

  The identifier of the file system related to this operation.
- operationRequestId number

  An ID of the request to be aborted.
- requestId number

  The unique identifier of this request.

### Action

Chrome 45+

#### Properties

- id string

  The identifier of the action. Any string or [`CommonActionId`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CommonActionId) for common actions.
- title string optional

  The title of the action. It may be ignored for common actions.

### AddWatcherRequestedOptions

#### Properties

- entryPath string

  The path of the entry to be observed.
- fileSystemId string

  The identifier of the file system related to this operation.
- recursive boolean

  Whether observing should include all child entries recursively. It can be true for directories only.
- requestId number

  The unique identifier of this request.

### Change

#### Properties

- changeType [ChangeType](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ChangeType)

  The type of the change which happened to the entry.
- cloudFileInfo [CloudFileInfo](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CloudFileInfo) optional
  Chrome 125+

  Information relating to the file if backed by a cloud file system.
- entryPath string

  The path of the changed entry.

### ChangeType

Type of a change detected on the observed directory.

#### Enum

"CHANGED"   
"DELETED"   

<br />

### CloseFileRequestedOptions

#### Properties

- fileSystemId string

  The identifier of the file system related to this operation.
- openRequestId number

  A request ID used to open the file.
- requestId number

  The unique identifier of this request.

### CloudFileInfo

Chrome 125+

#### Properties

- versionTag string optional

  A tag that represents the version of the file.

### CloudIdentifier

Chrome 117+

#### Properties

- id string

  The provider's identifier for the given file/directory.
- providerName string

  Identifier for the cloud storage provider (e.g. 'drive.google.com').

### CommonActionId

Chrome 45+

List of common actions. `"SHARE"` is for sharing files with others. `"SAVE_FOR_OFFLINE"` for pinning (saving for offline access). `"OFFLINE_NOT_NECESSARY"` for notifying that the file doesn't need to be stored for offline access anymore. Used by [`onGetActionsRequested`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onGetActionsRequested) and [`onExecuteActionRequested`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onExecuteActionRequested).

#### Enum

"SAVE_FOR_OFFLINE"   
"OFFLINE_NOT_NECESSARY"   
"SHARE"   

<br />

### ConfigureRequestedOptions

Chrome 44+

#### Properties

- fileSystemId string

  The identifier of the file system to be configured.
- requestId number

  The unique identifier of this request.

### CopyEntryRequestedOptions

#### Properties

- fileSystemId string

  The identifier of the file system related to this operation.
- requestId number

  The unique identifier of this request.
- sourcePath string

  The source path of the entry to be copied.
- targetPath string

  The destination path for the copy operation.

### CreateDirectoryRequestedOptions

#### Properties

- directoryPath string

  The path of the directory to be created.
- fileSystemId string

  The identifier of the file system related to this operation.
- recursive boolean

  Whether the operation is recursive (for directories only).
- requestId number

  The unique identifier of this request.

### CreateFileRequestedOptions

#### Properties

- filePath string

  The path of the file to be created.
- fileSystemId string

  The identifier of the file system related to this operation.
- requestId number

  The unique identifier of this request.

### DeleteEntryRequestedOptions

#### Properties

- entryPath string

  The path of the entry to be deleted.
- fileSystemId string

  The identifier of the file system related to this operation.
- recursive boolean

  Whether the operation is recursive (for directories only).
- requestId number

  The unique identifier of this request.

### EntryMetadata

#### Properties

- cloudFileInfo [CloudFileInfo](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CloudFileInfo) optional
  Chrome 125+

  Information that identifies a specific file in the underlying cloud file system. Must be provided if requested in `options` and the file is backed by cloud storage.
- cloudIdentifier [CloudIdentifier](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CloudIdentifier) optional
  Chrome 117+

  Cloud storage representation of this entry. Must be provided if requested in `options` and the file is backed by cloud storage. For local files not backed by cloud storage, it should be undefined when requested.
- isDirectory boolean optional

  True if it is a directory. Must be provided if requested in `options`.
- mimeType string optional

  Mime type for the entry. Always optional, but should be provided if requested in `options`.
- modificationTime Date optional

  The last modified time of this entry. Must be provided if requested in `options`.
- name string optional

  Name of this entry (not full path name). Must not contain '/'. For root it must be empty. Must be provided if requested in `options`.
- size number optional

  File size in bytes. Must be provided if requested in `options`.
- thumbnail string optional

  Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32 KB in size. Optional, but can be provided only when explicitly requested by the [`onGetMetadataRequested`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onGetMetadataRequested) event.

### ExecuteActionRequestedOptions

Chrome 45+

#### Properties

- actionId string

  The identifier of the action to be executed.
- entryPaths string\[\]
  Chrome 47+

  The set of paths of the entries to be used for the action.
- fileSystemId string

  The identifier of the file system related to this operation.
- requestId number

  The unique identifier of this request.

### FileSystemInfo

#### Properties

- displayName string

  A human-readable name for the file system.
- fileSystemId string

  The identifier of the file system.
- openedFiles [OpenedFile](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-OpenedFile)\[\]

  List of currently opened files.
- openedFilesLimit number

  The maximum number of files that can be opened at once. If 0, then not limited.
- supportsNotifyTag boolean optional
  Chrome 45+

  Whether the file system supports the `tag` field for observing directories.
- watchers [Watcher](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-Watcher)\[\]
  Chrome 45+

  List of watchers.
- writable boolean

  Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).

### GetActionsRequestedOptions

Chrome 45+

#### Properties

- entryPaths string\[\]
  Chrome 47+

  List of paths of entries for the list of actions.
- fileSystemId string

  The identifier of the file system related to this operation.
- requestId number

  The unique identifier of this request.

### GetMetadataRequestedOptions

#### Properties

- cloudFileInfo boolean
  Chrome 125+

  Set to `true` if `cloudFileInfo` value is requested.
- cloudIdentifier boolean
  Chrome 117+

  Set to `true` if `cloudIdentifier` value is requested.
- entryPath string

  The path of the entry to fetch metadata about.
- fileSystemId string

  The identifier of the file system related to this operation.
- isDirectory boolean
  Chrome 49+

  Set to `true` if `is_directory` value is requested.
- mimeType boolean
  Chrome 49+

  Set to `true` if `mimeType` value is requested.
- modificationTime boolean
  Chrome 49+

  Set to `true` if `modificationTime` value is requested.
- name boolean
  Chrome 49+

  Set to `true` if `name` value is requested.
- requestId number

  The unique identifier of this request.
- size boolean
  Chrome 49+

  Set to `true` if `size` value is requested.
- thumbnail boolean

  Set to `true` if `thumbnail` value is requested.

### MountOptions

#### Properties

- displayName string

  A human-readable name for the file system.
- fileSystemId string

  The string indentifier of the file system. Must be unique per each extension.
- openedFilesLimit number optional

  The maximum number of files that can be opened at once. If not specified, or 0, then not limited.
- persistent boolean optional
  Chrome 64+

  Whether the framework should resume the file system at the next sign-in session. True by default.
- supportsNotifyTag boolean optional
  Chrome 45+

  Whether the file system supports the `tag` field for observed directories.
- writable boolean optional

  Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).

### MoveEntryRequestedOptions

#### Properties

- fileSystemId string

  The identifier of the file system related to this operation.
- requestId number

  The unique identifier of this request.
- sourcePath string

  The source path of the entry to be moved into a new place.
- targetPath string

  The destination path for the copy operation.

### NotifyOptions

#### Properties

- changeType [ChangeType](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ChangeType)

  The type of the change which happened to the observed entry. If it is DELETED, then the observed entry will be automatically removed from the list of observed entries.
- changes [Change](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-Change)\[\] optional

  List of changes to entries within the observed directory (including the entry itself)
- fileSystemId string

  The identifier of the file system related to this change.
- observedPath string

  The path of the observed entry.
- recursive boolean

  Mode of the observed entry.
- tag string optional

  Tag for the notification. Required if the file system was mounted with the `supportsNotifyTag` option. Note, that this flag is necessary to provide notifications about changes which changed even when the system was shutdown.

### OpenedFile

#### Properties

- filePath string

  The path of the opened file.
- mode [OpenFileMode](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-OpenFileMode)

  Whether the file was opened for reading or writing.
- openRequestId number

  A request ID to be be used by consecutive read/write and close requests.

### OpenFileMode

Mode of opening a file. Used by [`onOpenFileRequested`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onOpenFileRequested).

#### Enum

"READ"   
"WRITE"   

<br />

### OpenFileRequestedOptions

#### Properties

- filePath string

  The path of the file to be opened.
- fileSystemId string

  The identifier of the file system related to this operation.
- mode [OpenFileMode](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-OpenFileMode)

  Whether the file will be used for reading or writing.
- requestId number

  A request ID which will be used by consecutive read/write and close requests.

### ProviderError

Error codes used by providing extensions in response to requests as well as in case of errors when calling methods of the API. For success, `"OK"` must be used.

#### Enum

"OK"   
"FAILED"   
"IN_USE"   
"EXISTS"   
"NOT_FOUND"   
"ACCESS_DENIED"   
"TOO_MANY_OPENED"   
"NO_MEMORY"   
"NO_SPACE"   
"NOT_A_DIRECTORY"   
"INVALID_OPERATION"   
"SECURITY"   
"ABORT"   
"NOT_A_FILE"   
"NOT_EMPTY"   
"INVALID_URL"   
"IO"   

<br />

### ReadDirectoryRequestedOptions

#### Properties

- directoryPath string

  The path of the directory which contents are requested.
- fileSystemId string

  The identifier of the file system related to this operation.
- isDirectory boolean
  Chrome 49+

  Set to `true` if `is_directory` value is requested.
- mimeType boolean
  Chrome 49+

  Set to `true` if `mimeType` value is requested.
- modificationTime boolean
  Chrome 49+

  Set to `true` if `modificationTime` value is requested.
- name boolean
  Chrome 49+

  Set to `true` if `name` value is requested.
- requestId number

  The unique identifier of this request.
- size boolean
  Chrome 49+

  Set to `true` if `size` value is requested.
- thumbnail boolean
  Chrome 49+

  Set to `true` if `thumbnail` value is requested.

### ReadFileRequestedOptions

#### Properties

- fileSystemId string

  The identifier of the file system related to this operation.
- length number

  Number of bytes to be returned.
- offset number

  Position in the file (in bytes) to start reading from.
- openRequestId number

  A request ID used to open the file.
- requestId number

  The unique identifier of this request.

### RemoveWatcherRequestedOptions

#### Properties

- entryPath string

  The path of the watched entry.
- fileSystemId string

  The identifier of the file system related to this operation.
- recursive boolean

  Mode of the watcher.
- requestId number

  The unique identifier of this request.

### TruncateRequestedOptions

#### Properties

- filePath string

  The path of the file to be truncated.
- fileSystemId string

  The identifier of the file system related to this operation.
- length number

  Number of bytes to be retained after the operation completes.
- requestId number

  The unique identifier of this request.

### UnmountOptions

#### Properties

- fileSystemId string

  The identifier of the file system to be unmounted.

### UnmountRequestedOptions

#### Properties

- fileSystemId string

  The identifier of the file system to be unmounted.
- requestId number

  The unique identifier of this request.

### Watcher

#### Properties

- entryPath string

  The path of the entry being observed.
- lastTag string optional

  Tag used by the last notification for the watcher.
- recursive boolean

  Whether watching should include all child entries recursively. It can be true for directories only.

### WriteFileRequestedOptions

#### Properties

- data ArrayBuffer

  Buffer of bytes to be written to the file.
- fileSystemId string

  The identifier of the file system related to this operation.
- offset number

  Position in the file (in bytes) to start writing the bytes from.
- openRequestId number

  A request ID used to open the file.
- requestId number

  The unique identifier of this request.

## Methods

### get()

```typescript
chrome.fileSystemProvider.get(
  fileSystemId: string,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-FileSystemInfo>
```

Returns information about a file system with the passed `fileSystemId`.

#### Parameters

- fileSystemId string

#### Returns

- Promise\<[FileSystemInfo](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-FileSystemInfo)\>
  Chrome 96+

  Callback to receive the result of [`get`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#method-get) function.

### getAll()

```typescript
chrome.fileSystemProvider.getAll(): Promise<https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-FileSystemInfo[]>
```

Returns all file systems mounted by the extension.

#### Returns

- Promise\<[FileSystemInfo](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-FileSystemInfo)\[\]\>
  Chrome 96+

  Callback to receive the result of [`getAll`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#method-getAll) function.

### mount()

```typescript
chrome.fileSystemProvider.mount(
  options: MountOptions,
): Promise<void>
```

Mounts a file system with the given `fileSystemId` and `displayName`. `displayName` will be shown in the left panel of the Files app. `displayName` can contain any characters including '/', but cannot be an empty string. `displayName` must be descriptive but doesn't have to be unique. The `fileSystemId` must not be an empty string.

Depending on the type of the file system being mounted, the `source` option must be set appropriately.

In case of an error, [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError) will be set with a corresponding error code.

#### Parameters

- options [MountOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-MountOptions)

#### Returns

- Promise\<void\>
  Chrome 96+

  A generic result callback to indicate success or failure.

### notify()

Chrome 45+

```typescript
chrome.fileSystemProvider.notify(
  options: NotifyOptions,
): Promise<void>
```

Notifies about changes in the watched directory at `observedPath` in `recursive` mode. If the file system is mounted with `supportsNotifyTag`, then `tag` must be provided, and all changes since the last notification always reported, even if the system was shutdown. The last tag can be obtained with [`getAll`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#method-getAll).

To use, the `file_system_provider.notify` manifest option must be set to true.

Value of `tag` can be any string which is unique per call, so it's possible to identify the last registered notification. Eg. if the providing extension starts after a reboot, and the last registered notification's tag is equal to "123", then it should call [`notify`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#method-notify) for all changes which happened since the change tagged as "123". It cannot be an empty string.

Not all providers are able to provide a tag, but if the file system has a changelog, then the tag can be eg. a change number, or a revision number.

Note that if a parent directory is removed, then all descendant entries are also removed, and if they are watched, then the API must be notified about the fact. Also, if a directory is renamed, then all descendant entries are in fact removed, as there is no entry under their original paths anymore.

In case of an error, [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError) will be set will a corresponding error code.

#### Parameters

- options [NotifyOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-NotifyOptions)

#### Returns

- Promise\<void\>
  Chrome 96+

  A generic result callback to indicate success or failure.

### unmount()

```typescript
chrome.fileSystemProvider.unmount(
  options: UnmountOptions,
): Promise<void>
```

Unmounts a file system with the given `fileSystemId`. It must be called after [`onUnmountRequested`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#event-onUnmountRequested) is invoked. Also, the providing extension can decide to perform unmounting if not requested (eg. in case of lost connection, or a file error).

In case of an error, [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError) will be set with a corresponding error code.

#### Parameters

- options [UnmountOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-UnmountOptions)

#### Returns

- Promise\<void\>
  Chrome 96+

  A generic result callback to indicate success or failure.

## Events

### onAbortRequested

```typescript
chrome.fileSystemProvider.onAbortRequested.addListener(
  callback: function,
)
```

Raised when aborting an operation with `operationRequestId` is requested. The operation executed with `operationRequestId` must be immediately stopped and `successCallback` of this abort request executed. If aborting fails, then `errorCallback` must be called. Note, that callbacks of the aborted operation must not be called, as they will be ignored. Despite calling `errorCallback`, the request may be forcibly aborted.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: AbortRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [AbortRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-AbortRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onAddWatcherRequested

Chrome 45+

```typescript
chrome.fileSystemProvider.onAddWatcherRequested.addListener(
  callback: function,
)
```

Raised when setting a new directory watcher is requested. If an error occurs, then `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: AddWatcherRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [AddWatcherRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-AddWatcherRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onCloseFileRequested

```typescript
chrome.fileSystemProvider.onCloseFileRequested.addListener(
  callback: function,
)
```

Raised when opening a file previously opened with `openRequestId` is requested to be closed.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: CloseFileRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [CloseFileRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CloseFileRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onConfigureRequested

Chrome 44+

```typescript
chrome.fileSystemProvider.onConfigureRequested.addListener(
  callback: function,
)
```

Raised when showing a configuration dialog for `fileSystemId` is requested. If it's handled, the `file_system_provider.configurable` manfiest option must be set to true.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: ConfigureRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [ConfigureRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ConfigureRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onCopyEntryRequested

```typescript
chrome.fileSystemProvider.onCopyEntryRequested.addListener(
  callback: function,
)
```

Raised when copying an entry (recursively if a directory) is requested. If an error occurs, then `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: CopyEntryRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [CopyEntryRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CopyEntryRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onCreateDirectoryRequested

```typescript
chrome.fileSystemProvider.onCreateDirectoryRequested.addListener(
  callback: function,
)
```

Raised when creating a directory is requested. The operation must fail with the EXISTS error if the target directory already exists. If `recursive` is true, then all of the missing directories on the directory path must be created.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: CreateDirectoryRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [CreateDirectoryRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CreateDirectoryRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onCreateFileRequested

```typescript
chrome.fileSystemProvider.onCreateFileRequested.addListener(
  callback: function,
)
```

Raised when creating a file is requested. If the file already exists, then `errorCallback` must be called with the `"EXISTS"` error code.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: CreateFileRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [CreateFileRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-CreateFileRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onDeleteEntryRequested

```typescript
chrome.fileSystemProvider.onDeleteEntryRequested.addListener(
  callback: function,
)
```

Raised when deleting an entry is requested. If `recursive` is true, and the entry is a directory, then all of the entries inside must be recursively deleted as well.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: DeleteEntryRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [DeleteEntryRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-DeleteEntryRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onExecuteActionRequested

Chrome 48+

```typescript
chrome.fileSystemProvider.onExecuteActionRequested.addListener(
  callback: function,
)
```

Raised when executing an action for a set of files or directories is\\ requested. After the action is completed, `successCallback` must be called. On error, `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: ExecuteActionRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [ExecuteActionRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ExecuteActionRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onGetActionsRequested

Chrome 48+

```typescript
chrome.fileSystemProvider.onGetActionsRequested.addListener(
  callback: function,
)
```

Raised when a list of actions for a set of files or directories at `entryPaths` is requested. All of the returned actions must be applicable to each entry. If there are no such actions, an empty array should be returned. The actions must be returned with the `successCallback` call. In case of an error, `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: GetActionsRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [GetActionsRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-GetActionsRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    (actions: Action[]) => void
    ```

    <br />

    - actions [Action](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-Action)\[\]
  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onGetMetadataRequested

```typescript
chrome.fileSystemProvider.onGetMetadataRequested.addListener(
  callback: function,
)
```

Raised when metadata of a file or a directory at `entryPath` is requested. The metadata must be returned with the `successCallback` call. In case of an error, `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: GetMetadataRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [GetMetadataRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-GetMetadataRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    (metadata: EntryMetadata) => void
    ```

    <br />

    - metadata [EntryMetadata](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-EntryMetadata)
  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onMountRequested

Chrome 44+

```typescript
chrome.fileSystemProvider.onMountRequested.addListener(
  callback: function,
)
```

Raised when showing a dialog for mounting a new file system is requested. If the extension/app is a file handler, then this event shouldn't be handled. Instead `app.runtime.onLaunched` should be handled in order to mount new file systems when a file is opened. For multiple mounts, the `file_system_provider.multiple_mounts` manifest option must be set to true.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (successCallback: function, errorCallback: function) => void
  ```

  <br />

  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onMoveEntryRequested

```typescript
chrome.fileSystemProvider.onMoveEntryRequested.addListener(
  callback: function,
)
```

Raised when moving an entry (recursively if a directory) is requested. If an error occurs, then `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: MoveEntryRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [MoveEntryRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-MoveEntryRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onOpenFileRequested

```typescript
chrome.fileSystemProvider.onOpenFileRequested.addListener(
  callback: function,
)
```

Raised when opening a file at `filePath` is requested. If the file does not exist, then the operation must fail. Maximum number of files opened at once can be specified with `MountOptions`.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: OpenFileRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [OpenFileRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-OpenFileRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    (metadata?: EntryMetadata) => void
    ```

    <br />

    - metadata [EntryMetadata](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-EntryMetadata) optional
  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onReadDirectoryRequested

```typescript
chrome.fileSystemProvider.onReadDirectoryRequested.addListener(
  callback: function,
)
```

Raised when contents of a directory at `directoryPath` are requested. The results must be returned in chunks by calling the `successCallback` several times. In case of an error, `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: ReadDirectoryRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [ReadDirectoryRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ReadDirectoryRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    (entries: EntryMetadata[], hasMore: boolean) => void
    ```

    <br />

    - entries [EntryMetadata](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-EntryMetadata)\[\]
    - hasMore boolean
  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onReadFileRequested

```typescript
chrome.fileSystemProvider.onReadFileRequested.addListener(
  callback: function,
)
```

Raised when reading contents of a file opened previously with `openRequestId` is requested. The results must be returned in chunks by calling `successCallback` several times. In case of an error, `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: ReadFileRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [ReadFileRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ReadFileRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    (data: ArrayBuffer, hasMore: boolean) => void
    ```

    <br />

    - data ArrayBuffer
    - hasMore boolean
  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onRemoveWatcherRequested

Chrome 45+

```typescript
chrome.fileSystemProvider.onRemoveWatcherRequested.addListener(
  callback: function,
)
```

Raised when the watcher should be removed. If an error occurs, then `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: RemoveWatcherRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [RemoveWatcherRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-RemoveWatcherRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onTruncateRequested

```typescript
chrome.fileSystemProvider.onTruncateRequested.addListener(
  callback: function,
)
```

Raised when truncating a file to a desired length is requested. If an error occurs, then `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: TruncateRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [TruncateRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-TruncateRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onUnmountRequested

```typescript
chrome.fileSystemProvider.onUnmountRequested.addListener(
  callback: function,
)
```

Raised when unmounting for the file system with the `fileSystemId` identifier is requested. In the response, the [`unmount`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#method-unmount) API method must be called together with `successCallback`. If unmounting is not possible (eg. due to a pending operation), then `errorCallback` must be called.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: UnmountRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [UnmountRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-UnmountRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

### onWriteFileRequested

```typescript
chrome.fileSystemProvider.onWriteFileRequested.addListener(
  callback: function,
)
```

Raised when writing contents to a file opened previously with `openRequestId` is requested.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (options: WriteFileRequestedOptions, successCallback: function, errorCallback: function) => void
  ```

  <br />

  - options [WriteFileRequestedOptions](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-WriteFileRequestedOptions)
  - successCallback function


    The `successCallback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - errorCallback function


    The `errorCallback` parameter looks like:

    ```typescript
    (error: ProviderError) => void
    ```

    <br />

    - error [ProviderError](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider#type-ProviderError)

<br />