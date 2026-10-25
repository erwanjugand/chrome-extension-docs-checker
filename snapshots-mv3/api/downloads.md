<br />

<br />

## Description

Use the `chrome.downloads` API to programmatically initiate, monitor, manipulate, and search for downloads.

<br />

<br />

## Permissions

`downloads`  

<br />

You must declare the `"downloads"` permission in the [extension manifest](https://developer.chrome.com/docs/extensions/reference/manifest) to use this API.

    {
      "name": "My extension",
      ...
      "permissions": [
        "downloads"
      ],
    }

<br />

<br />

## Examples

You can find simple examples of using the `browser.downloads` API in the [examples/api/downloads](https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/_archive/mv2/api/downloads/)
directory. For other examples and for help in viewing the source code, see [Samples](https://developer.chrome.com/docs/extensions/mv2/samples).

<br />

## Types

### BooleanDelta

#### Properties

- current boolean optional
- previous boolean optional

### DangerType

#### Enum

"file"   
The download's filename is suspicious.
"url"   
The download's URL is known to be malicious.
"content"   
The downloaded file is known to be malicious.
"uncommon"   
The download's URL is not commonly downloaded and could be dangerous.
"host"   
The download came from a host known to distribute malicious binaries and is likely dangerous.
"unwanted"   
The download is potentially unwanted or unsafe. E.g. it could make changes to browser or computer settings.
"safe"   
The download presents no known danger to the user's computer.
"accepted"   
The user has accepted the dangerous download.
"allowlistedByPolicy"   
Enterprise-related values.
"asyncScanning"   
"asyncLocalPasswordScanning"   
"passwordProtected"   
"blockedTooLarge"   
"sensitiveContentWarning"   
"sensitiveContentBlock"   
"deepScannedFailed"   
"deepScannedSafe"   
"deepScannedOpenedDangerous"   
"promptForScanning"   
"promptForLocalPasswordScanning"   
"accountCompromise"   
"blockedScanFailed"   
"forceSaveToGdrive"   
For use by the Secure Enterprise Browser extension. When required, Chrome will block the download to disc and download the file directly to Google Drive.
"forceSaveToOnedrive"   
For use by the Secure Enterprise Browser extension. When required, Chrome will block the download to disc and download the file directly to OneDrive.

<br />

### DoubleDelta

#### Properties

- current number optional
- previous number optional

### DownloadDelta

#### Properties

- canResume [BooleanDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-BooleanDelta) optional

  The change in `canResume`, if any.
- danger [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `danger`, if any.
- endTime [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `endTime`, if any.
- error [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `error`, if any.
- exists [BooleanDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-BooleanDelta) optional

  The change in `exists`, if any.
- fileSize [DoubleDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DoubleDelta) optional

  The change in `fileSize`, if any.
- filename [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `filename`, if any.
- finalUrl [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional
  Chrome 54+

  The change in `finalUrl`, if any.
- id number

  The `id` of the [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) that changed.
- mime [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `mime`, if any.
- paused [BooleanDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-BooleanDelta) optional

  The change in `paused`, if any.
- startTime [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `startTime`, if any.
- state [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `state`, if any.
- totalBytes [DoubleDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DoubleDelta) optional

  The change in `totalBytes`, if any.
- url [StringDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-StringDelta) optional

  The change in `url`, if any.

### DownloadItem

#### Properties

- byExtensionId string optional

  The identifier for the extension that initiated this download if this download was initiated by an extension. Does not change once it is set.
- byExtensionName string optional

  The localized name of the extension that initiated this download if this download was initiated by an extension. May change if the extension changes its name or if the user changes their locale.
- bytesReceived number

  Number of bytes received so far from the host, without considering file compression.
- canResume boolean

  True if the download is in progress and paused, or else if it is interrupted and can be resumed starting from where it was interrupted.
- danger [DangerType](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DangerType)

  Indication of whether this download is thought to be safe or known to be suspicious.
- endTime string optional

  The time when the download ended in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.endTime) console.log(new Date(item.endTime))})})`
- error [InterruptReason](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-InterruptReason) optional

  Why the download was interrupted. Several kinds of HTTP errors may be grouped under one of the errors beginning with `SERVER_`. Errors relating to the network begin with `NETWORK_`, errors relating to the process of writing the file to the file system begin with `FILE_`, and interruptions initiated by the user begin with `USER_`.
- estimatedEndTime string optional

  Estimated time when the download will complete in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.estimatedEndTime) console.log(new Date(item.estimatedEndTime))})})`
- exists boolean

  Whether the downloaded file still exists. This information may be out of date because Chrome does not automatically watch for file removal. Call [`search`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-search)() in order to trigger the check for file existence. When the existence check completes, if the file has been deleted, then an [`onChanged`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onChanged) event will fire. Note that [`search`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-search)() does not wait for the existence check to finish before returning, so results from [`search`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-search)() may not accurately reflect the file system. Also, [`search`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-search)() may be called as often as necessary, but will not check for file existence any more frequently than once every 10 seconds.
- fileSize number

  Number of bytes in the whole file post-decompression, or -1 if unknown.
- filename string

  Absolute local path.
- finalUrl string
  Chrome 54+

  The absolute URL that this download is being made from, after all redirects.
- id number

  An identifier that is persistent across browser sessions.
- incognito boolean

  False if this download is recorded in the history, true if it is not recorded.
- mime string

  The file's MIME type.
- paused boolean

  True if the download has stopped reading data from the host, but kept the connection open.
- referrer string

  Absolute URL.
- startTime string

  The time when the download began in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){console.log(new Date(item.startTime))})})`
- state [State](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-State)

  Indicates whether the download is progressing, interrupted, or complete.
- totalBytes number

  Number of bytes in the whole file, without considering file compression, or -1 if unknown.
- url string

  The absolute URL that this download initiated from, before any redirects.

### DownloadOptions

#### Properties

- body string optional

  Post body.
- conflictAction [FilenameConflictAction](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-FilenameConflictAction) optional

  The action to take if `filename` already exists.
- filename string optional

  A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will cause an error. [`onDeterminingFilename`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onDeterminingFilename) allows suggesting a filename after the file's MIME type and a tentative filename have been determined.
- headers [HeaderNameValuePair](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-HeaderNameValuePair)\[\] optional

  Extra HTTP headers to send with the request if the URL uses the HTTP\[s\] protocol. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`, restricted to those allowed by XMLHttpRequest.
- method [HttpMethod](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-HttpMethod) optional

  The HTTP method to use if the URL uses the HTTP\[S\] protocol.
- saveAs boolean optional

  Use a file-chooser to allow the user to select a filename regardless of whether `filename` is set or already exists.
- url string

  The URL to download.

### DownloadQuery

#### Properties

- bytesReceived number optional

  Number of bytes received so far from the host, without considering file compression.
- danger [DangerType](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DangerType) optional

  Indication of whether this download is thought to be safe or known to be suspicious.
- endTime string optional

  The time when the download ended in ISO 8601 format.
- endedAfter string optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) that ended after the given ms in ISO 8601 format
- endedBefore string optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) that ended before the given ms in ISO 8601 format.
- error [InterruptReason](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-InterruptReason) optional

  Why a download was interrupted.
- exists boolean optional

  Whether the downloaded file exists;
- fileSize number optional

  Number of bytes in the whole file post-decompression, or -1 if unknown.
- filename string optional

  Absolute local path.
- filenameRegex string optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) whose `filename` matches the given regular expression.
- finalUrl string optional
  Chrome 54+

  The absolute URL that this download is being made from, after all redirects.
- finalUrlRegex string optional
  Chrome 54+

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) whose `finalUrl` matches the given regular expression.
- id number optional

  The `id` of the [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) to query.
- limit number optional

  The maximum number of matching [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) returned. Defaults to 1000. Set to 0 in order to return all matching [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem). See [`search`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-search) for how to page through results.
- mime string optional

  The file's MIME type.
- orderBy string\[\] optional

  Set elements of this array to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) properties in order to sort search results. For example, setting `orderBy=['startTime']` sorts the [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) by their start time in ascending order. To specify descending order, prefix with a hyphen: '-startTime'.
- paused boolean optional

  True if the download has stopped reading data from the host, but kept the connection open.
- query string\[\] optional

  This array of search terms limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) whose `filename` or `url` or `finalUrl` contain all of the search terms that do not begin with a dash '-' and none of the search terms that do begin with a dash.
- startTime string optional

  The time when the download began in ISO 8601 format.
- startedAfter string optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) that started after the given ms in ISO 8601 format.
- startedBefore string optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) that started before the given ms in ISO 8601 format.
- state [State](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-State) optional

  Indicates whether the download is progressing, interrupted, or complete.
- totalBytes number optional

  Number of bytes in the whole file, without considering file compression, or -1 if unknown.
- totalBytesGreater number optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) whose `totalBytes` is greater than the given integer.
- totalBytesLess number optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) whose `totalBytes` is less than the given integer.
- url string optional

  The absolute URL that this download initiated from, before any redirects.
- urlRegex string optional

  Limits results to [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) whose `url` matches the given regular expression.

### FilenameConflictAction

uniquify

To avoid duplication, the `filename` is changed to include a counter before the filename extension.

overwrite

The existing file will be overwritten with the new file.

prompt

The user will be prompted with a file chooser dialog.

#### Enum

"uniquify"   
"overwrite"   
"prompt"   

<br />

### FilenameSuggestion

#### Properties

- conflictAction [FilenameConflictAction](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-FilenameConflictAction) optional

  The action to take if `filename` already exists.
- filename string

  The [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem)'s new target [`DownloadItem.filename`](https://developer.chrome.com/docs/extensions/reference/api/downloads#property-DownloadItem-filename), as a path relative to the user's default Downloads directory, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will be ignored. `filename` is ignored if there are any [`onDeterminingFilename`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onDeterminingFilename) listeners registered by any extensions.

### GetFileIconOptions

#### Properties

- size number optional

  The size of the returned icon in density-independent pixels (DIPs). Must be either 16 or 32 (defaults to 32). On high-DPI displays, the returned image scales with the device scale factor (e.g., 64x64 px for size 32 on a 2x display). Calls from background service workers default to 1x scale.

### HeaderNameValuePair

#### Properties

- name string

  Name of the HTTP header.
- value string

  Value of the HTTP header.

### HttpMethod

#### Enum

"GET"   
"POST"   

<br />

### InterruptReason

#### Enum

"FILE_FAILED"   
"FILE_ACCESS_DENIED"   
"FILE_NO_SPACE"   
"FILE_NAME_TOO_LONG"   
"FILE_TOO_LARGE"   
"FILE_VIRUS_INFECTED"   
"FILE_TRANSIENT_ERROR"   
"FILE_BLOCKED"   
"FILE_SECURITY_CHECK_FAILED"   
"FILE_TOO_SHORT"   
"FILE_HASH_MISMATCH"   
"FILE_SAME_AS_SOURCE"   
"NETWORK_FAILED"   
"NETWORK_TIMEOUT"   
"NETWORK_DISCONNECTED"   
"NETWORK_SERVER_DOWN"   
"NETWORK_INVALID_REQUEST"   
"SERVER_FAILED"   
"SERVER_NO_RANGE"   
"SERVER_BAD_CONTENT"   
"SERVER_UNAUTHORIZED"   
"SERVER_CERT_PROBLEM"   
"SERVER_FORBIDDEN"   
"SERVER_UNREACHABLE"   
"SERVER_CONTENT_LENGTH_MISMATCH"   
"SERVER_CROSS_ORIGIN_REDIRECT"   
"USER_CANCELED"   
"USER_SHUTDOWN"   
"CRASH"   

<br />

### State

in_progress

The download is currently receiving data from the server.

interrupted

An error broke the connection with the file host.

complete

The download completed successfully.

#### Enum

"in_progress"   
"interrupted"   
"complete"   

<br />

### StringDelta

#### Properties

- current string optional
- previous string optional

### UiOptions

Chrome 105+

#### Properties

- enabled boolean

  Enable or disable the download UI.

## Methods

### acceptDanger()

```typescript
chrome.downloads.acceptDanger(
  downloadId: number,
): Promise<void>
```

Prompt the user to accept a dangerous download. Can only be called from a visible context (tab, window, or page/browser action popup). Does not automatically accept dangerous downloads. If the download is accepted, then an [`onChanged`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onChanged) event will fire, otherwise nothing will happen. When all the data is fetched into a temporary file and either the download is not dangerous or the danger has been accepted, then the temporary file is renamed to the target filename, the `state` changes to 'complete', and [`onChanged`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onChanged) fires.

#### Parameters

- downloadId number

  The identifier for the [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem).

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the danger prompt dialog closes.

### cancel()

```typescript
chrome.downloads.cancel(
  downloadId: number,
): Promise<void>
```

Cancel a download. When `callback` is run, the download is cancelled, completed, interrupted or doesn't exist anymore.

#### Parameters

- downloadId number

  The id of the download to cancel.

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the cancel request is completed.

### download()

```typescript
chrome.downloads.download(
  options: DownloadOptions,
): Promise<number>
```

Download a URL. If the URL uses the HTTP\[S\] protocol, then the request will include all cookies currently set for its hostname. If both `filename` and `saveAs` are specified, then the Save As dialog will be displayed, pre-populated with the specified `filename`. If the download started successfully, `callback` will be called with the new [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem)'s `downloadId`. If there was an error starting the download, then `callback` will be called with `downloadId=undefined` and [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError) will contain a descriptive string. The error strings are not guaranteed to remain backwards compatible between releases. Extensions must not parse it.

#### Parameters

- options [DownloadOptions](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadOptions)

  What to download and how.

#### Returns

- Promise\<number\>
  Chrome 96+

  Returns a Promise which resolves with the id of the new [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem).

### erase()

```typescript
chrome.downloads.erase(
  query: DownloadQuery,
): Promise<number[]>
```

Erase matching [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) from history without deleting the downloaded file. An [`onErased`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onErased) event will fire for each [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) that matches `query`, then `callback` will be called.

#### Parameters

- query [DownloadQuery](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadQuery)

#### Returns

- Promise\<number\[\]\>
  Chrome 96+

### getFileIcon()

```typescript
chrome.downloads.getFileIcon(
  downloadId: number,
  options?: GetFileIconOptions,
): Promise<string | undefined>
```

Retrieve an icon for the specified download. For new downloads, file icons are available after the download's target filename has been determined (for example, when [`onChanged`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onChanged) fires with a `filename` change). Attempting to retrieve the icon before the filename is determined will result in an error through [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError). The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError) will contain an error message.

#### Parameters

- downloadId number

  The identifier for the download.
- options [GetFileIconOptions](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-GetFileIconOptions) optional

#### Returns

- Promise\<string \| undefined\>
  Chrome 96+

  Returns a Promise which resolves with a URL to an image that represents the download.

### open()

```typescript
chrome.downloads.open(
  downloadId: number,
): Promise<void>
```

Opens the downloaded file now if the [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) is complete; otherwise returns an error through [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError). This method requires the `"downloads.open"` permission in addition to the `"downloads"` permission. An [`onChanged`](https://developer.chrome.com/docs/extensions/reference/api/downloads#event-onChanged) event fires when the item is opened for the first time. This method can only be called in response to a user gesture.

#### Parameters

- downloadId number

  The identifier for the downloaded file.

#### Returns

- Promise\<void\>
  Chrome 123+

### pause()

```typescript
chrome.downloads.pause(
  downloadId: number,
): Promise<void>
```

Pause the download. If the request was successful the download is in a paused state. Otherwise [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError) contains an error message. The request will fail if the download is not active.

#### Parameters

- downloadId number

  The id of the download to pause.

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the pause request is completed.

### removeFile()

```typescript
chrome.downloads.removeFile(
  downloadId: number,
): Promise<void>
```

Remove the downloaded file if it exists and the [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) is complete; otherwise return an error through [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError).

#### Parameters

- downloadId number

#### Returns

- Promise\<void\>
  Chrome 96+

### resume()

```typescript
chrome.downloads.resume(
  downloadId: number,
): Promise<void>
```

Resume a paused download. If the request was successful the download is in progress and unpaused. Otherwise [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError) contains an error message. The request will fail if the download is not active.

#### Parameters

- downloadId number

  The id of the download to resume.

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the resume request is completed.

### search()

```typescript
chrome.downloads.search(
  query: DownloadQuery,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem[]>
```

Find [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem). Set `query` to the empty object to get all [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem). To get a specific [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem), set only the `id` field. To page through a large number of items, set `orderBy: ['-startTime']`, set `limit` to the number of items per page, and set `startedAfter` to the `startTime` of the last item from the last page.

#### Parameters

- query [DownloadQuery](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadQuery)

#### Returns

- Promise\<[DownloadItem](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem)\[\]\>
  Chrome 96+

### setShelfEnabled()

Deprecated since Chrome 117

```typescript
chrome.downloads.setShelfEnabled(
  enabled: boolean,
): void
```

Use [`setUiOptions`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-setUiOptions) instead.

<br />

Enable or disable the gray shelf at the bottom of every window associated with the current browser profile. The shelf will be disabled as long as at least one extension has disabled it. Enabling the shelf while at least one other extension has disabled it will return an error through [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError). Requires the `"downloads.shelf"` permission in addition to the `"downloads"` permission.

#### Parameters

- enabled boolean

### setUiOptions()

Chrome 105+

```typescript
chrome.downloads.setUiOptions(
  options: UiOptions,
): Promise<void>
```

Change the download UI of every window associated with the current browser profile. As long as at least one extension has set [`UiOptions.enabled`](https://developer.chrome.com/docs/extensions/reference/api/downloads#property-UiOptions-enabled) to false, the download UI will be hidden. Setting [`UiOptions.enabled`](https://developer.chrome.com/docs/extensions/reference/api/downloads#property-UiOptions-enabled) to true while at least one other extension has disabled it will return an error through [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError). Requires the `"downloads.ui"` permission in addition to the `"downloads"` permission.

#### Parameters

- options [UiOptions](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-UiOptions)

  Encapsulate a change to the download UI.

#### Returns

- Promise\<void\>

  Returns a Promise which resolves when the UI update is completed.

### show()

```typescript
chrome.downloads.show(
  downloadId: number,
): void
```

Show the downloaded file in its folder in a file manager.

#### Parameters

- downloadId number

  The identifier for the downloaded file.

### showDefaultFolder()

```typescript
chrome.downloads.showDefaultFolder(): void
```

Show the default Downloads folder in a file manager.

## Events

### onChanged

```typescript
chrome.downloads.onChanged.addListener(
  callback: function,
)
```

When any of a [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem)'s properties except `bytesReceived` and `estimatedEndTime` changes, this event fires with the `downloadId` and an object containing the properties that changed.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (downloadDelta: DownloadDelta) => void
  ```

  <br />

  - downloadDelta [DownloadDelta](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadDelta)

### onCreated

```typescript
chrome.downloads.onCreated.addListener(
  callback: function,
)
```

This event fires with the [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) object when a download begins.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (downloadItem: DownloadItem) => void
  ```

  <br />

  - downloadItem [DownloadItem](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem)

### onDeterminingFilename

```typescript
chrome.downloads.onDeterminingFilename.addListener(
  callback: function,
)
```

During the filename determination process, extensions will be given the opportunity to override the target [`DownloadItem.filename`](https://developer.chrome.com/docs/extensions/reference/api/downloads#property-DownloadItem-filename). Each extension may not register more than one listener for this event. Each listener must call `suggest` exactly once, either synchronously or asynchronously. If the listener calls `suggest` asynchronously, then it must return `true`. If the listener neither calls `suggest` synchronously nor returns `true`, then `suggest` will be called automatically. The [`DownloadItem`](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem) will not complete until all listeners have called `suggest`. Listeners may call `suggest` without any arguments in order to allow the download to use `downloadItem.filename` for its filename, or pass a `suggestion` object to `suggest` in order to override the target filename. If more than one extension overrides the filename, then the last extension installed whose listener passes a `suggestion` object to `suggest` wins. In order to avoid confusion regarding which extension will win, users should not install extensions that may conflict. If the download is initiated by [`download`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-download) and the target filename is known before the MIME type and tentative filename have been determined, pass `filename` to [`download`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-download) instead.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (downloadItem: DownloadItem, suggest: function) => void
  ```

  <br />

  - downloadItem [DownloadItem](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-DownloadItem)
  - suggest function


    The `suggest` parameter looks like:

    ```typescript
    (suggestion?: FilenameSuggestion) => void
    ```

    <br />

    - suggestion [FilenameSuggestion](https://developer.chrome.com/docs/extensions/reference/api/downloads#type-FilenameSuggestion) optional

### onErased

```typescript
chrome.downloads.onErased.addListener(
  callback: function,
)
```

Fires with the `downloadId` when a download is erased from history.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (downloadId: number) => void
  ```

  <br />

  - downloadId number

<br />