refresh date: 2026-09-25
robots: noindex

<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.documentScan` API to discover and retrieve images from attached document scanners.

<br />

<br />

## Permissions

`documentScan`  

<br />

<br />

## Availability

Chrome 44+ ChromeOS only

<br />

<br />

## Document Scan API

The Document Scan API is designed to allow apps and extensions to view the
content of paper documents on an attached document scanner.

> [!NOTE]
> **Note:** This API depends on OS features that may not be available depending on the underlying operating system. As of this writing only ChromeOS for certain USB-attached devices is known to successfully work.

<br />

## Types

### CancelScanResponse

Chrome 125+

#### Properties

- job string

  Provides the same job handle that was passed to `cancelScan()`.
- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  The backend's cancel scan result. If the result is `OperationResult.SUCCESS` or `OperationResult.CANCELLED`, the scan has been cancelled and the scanner is ready to start a new scan. If the result is `OperationResult.DEVICE_BUSY` , the scanner is still processing the requested cancellation; the caller should wait a short time and try the request again. Other result values indicate a permanent error that should not be retried.

### CloseScannerResponse

Chrome 125+

#### Properties

- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  The result of closing the scanner. Even if this value is not `SUCCESS`, the handle will be invalid and should not be used for any further operations.
- scannerHandle string

  The same scanner handle as was passed to [`closeScanner`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-closeScanner).

### Configurability

Chrome 125+

How an option can be changed.

#### Enum

"NOT_CONFIGURABLE"   
The option is read-only.
"SOFTWARE_CONFIGURABLE"   
The option can be set in software.
"HARDWARE_CONFIGURABLE"   
The option can be set by the user toggling or pushing a button on the scanner.

<br />

### ConnectionType

Chrome 125+

Indicates how the scanner is connected to the computer.

#### Enum

"UNSPECIFIED"   
"USB"   
"NETWORK"   

<br />

### ConstraintType

Chrome 125+

The data type of constraint represented by an [`OptionConstraint`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionConstraint).

#### Enum

"INT_RANGE"   
The constraint on a range of `OptionType.INT` values. The `min`, `max`, and `quant` properties of `OptionConstraint` will be `long`, and its `list` propety will be unset.
"FIXED_RANGE"   
The constraint on a range of `OptionType.FIXED` values. The `min`, `max`, and `quant` properties of `OptionConstraint` will be `double`, and its `list` property will be unset.
"INT_LIST"   
The constraint on a specific list of `OptionType.INT` values. The `OptionConstraint.list` property will contain `long` values, and the other properties will be unset.
"FIXED_LIST"   
The constraint on a specific list of `OptionType.FIXED` values. The `OptionConstraint.list` property will contain `double` values, and the other properties will be unset.
"STRING_LIST"   
The constraint on a specific list of `OptionType.STRING` values. The `OptionConstraint.list` property will contain `DOMString` values, and the other properties will be unset.

<br />

### DeviceFilter

Chrome 125+

#### Properties

- local boolean optional

  Only return scanners that are directly attached to the computer.
- secure boolean optional

  Only return scanners that use a secure transport, such as USB or TLS.

### GetOptionGroupsResponse

Chrome 125+

#### Properties

- groups [OptionGroup](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionGroup)\[\] optional

  If `result` is `SUCCESS`, provides a list of option groups in the order supplied by the scanner driver.
- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  The result of getting the option groups. If the value of this is `SUCCESS`, the `groups` property will be populated.
- scannerHandle string

  The same scanner handle as was passed to [`getOptionGroups`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-getOptionGroups).

### GetScannerListResponse

Chrome 125+

#### Properties

- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  The enumeration result. Note that partial results could be returned even if this indicates an error.
- scanners [ScannerInfo](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScannerInfo)\[\]

  A possibly-empty list of scanners that match the provided [`DeviceFilter`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-DeviceFilter).

### OpenScannerResponse

Chrome 125+

#### Properties

- options object optional

  If `result` is `SUCCESS`, provides a key-value mapping where the key is a device-specific option and the value is an instance of [`ScannerOption`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScannerOption).
- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  The result of opening the scanner. If the value of this is `SUCCESS`, the `scannerHandle` and `options` properties will be populated.
- scannerHandle string optional

  If `result` is `SUCCESS`, a handle to the scanner that can be used for further operations.
- scannerId string

  The scanner ID passed to `openScanner()`.

### OperationResult

Chrome 125+

An enum that indicates the result of each operation.

#### Enum

"UNKNOWN"   
An unknown or generic failure occurred.
"SUCCESS"   
The operation succeeded.
"UNSUPPORTED"   
The operation is not supported.
"CANCELLED"   
The operation was cancelled.
"DEVICE_BUSY"   
The device is busy.
"INVALID"   
Either the data or an argument passed to the method is not valid.
"WRONG_TYPE"   
The supplied value is the wrong data type for the underlying option.
"EOF"   
No more data is available.
"ADF_JAMMED"   
The document feeder is jammed.
"ADF_EMPTY"   
The document feeder is empty.
"COVER_OPEN"   
The flatbed cover is open.
"IO_ERROR"   
An error occurred while communicating with the device.
"ACCESS_DENIED"   
The device requires authentication.
"NO_MEMORY"   
Not enough memory is available on the Chromebook to complete the operation.
"UNREACHABLE"   
The device is not reachable.
"MISSING"   
The device is disconnected.
"INTERNAL_ERROR"   
An error has occurred somewhere other than the calling application.

<br />

### OptionConstraint

Chrome 125+

#### Properties

- list string\[\] \| number\[\] optional
- max number optional
- min number optional
- quant number optional
- type [ConstraintType](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ConstraintType)

### OptionGroup

Chrome 125+

#### Properties

- members string\[\]

  An array of option names in driver-provided order.
- title string

  Provides a printable title, for example "Geometry options".

### OptionSetting

Chrome 125+

#### Properties

- name string

  Indicates the name of the option to set.
- type [OptionType](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionType)

  Indicates the data type of the option. The requested data type must match the real data type of the underlying option.
- value string \| number \| boolean \| number\[\] optional

  Indicates the value to set. Leave unset to request automatic setting for options that have `autoSettable` enabled. The data type supplied for `value` must match `type`.

### OptionType

Chrome 125+

The data type of an option.

#### Enum

"UNKNOWN"   
The option's data type is unknown. The `value` property will be unset.
"BOOL"   
The `value` property will be one of `true`false.
"INT"   
A signed 32-bit integer. The `value` property will be long or long\[\], depending on whether the option takes more than one value.
"FIXED"   
A double in the range -32768-32767.9999 with a resolution of 1/65535. The `value` property will be double or double\[\] depending on whether the option takes more than one value. Double values that can't be exactly represented will be rounded to the available range and precision.
"STRING"   
A sequence of any bytes except NUL ('\\0'). The `value` property will be a DOMString.
"BUTTON"   
An option of this type has no value. Instead, setting an option of this type causes an option-specific side effect in the scanner driver. For example, a button-typed option could be used by a scanner driver to provide a means to select default values or to tell an automatic document feeder to advance to the next sheet of paper.
"GROUP"   
Grouping option. No value. This is included for compatibility, but will not normally be returned in `ScannerOption` values. Use `getOptionGroups()` to retrieve the list of groups with their member options.

<br />

### OptionUnit

Chrome 125+

Indicates the data type for [`ScannerOption.unit`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#property-ScannerOption-unit).

#### Enum

"UNITLESS"   
The value is a unitless number. For example, it can be a threshold.
"PIXEL"   
The value is a number of pixels, for example, scan dimensions.
"BIT"   
The value is the number of bits, for example, color depth.
"MM"   
The value is measured in millimeters, for example, scan dimensions.
"DPI"   
The value is measured in dots per inch, for example, resolution.
"PERCENT"   
The value is a percent, for example, brightness.
"MICROSECOND"   
The value is measured in microseconds, for example, exposure time.

<br />

### ReadScanDataResponse

Chrome 125+

#### Properties

- data ArrayBuffer optional

  If `result` is `SUCCESS`, contains the *next* chunk of scanned image data. If `result` is `EOF`, contains the *last* chunk of scanned image data.
- estimatedCompletion number optional

  If `result` is `SUCCESS`, an estimate of how much of the total scan data has been delivered so far, in the range 0 to 100.
- job string

  Provides the job handle passed to `readScanData()`.
- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  The result of reading data. If its value is `SUCCESS`, then `data` contains the *next* (possibly zero-length) chunk of image data that is ready for reading. If its value is `EOF`, the `data` contains the *last* chunk of image data.

### ScannerInfo

Chrome 125+

#### Properties

- connectionType [ConnectionType](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ConnectionType)

  Indicates how the scanner is connected to the computer.
- deviceUuid string

  For matching against other `ScannerInfo` entries that point to the same physical device.
- imageFormats string\[\]

  An array of MIME types that can be requested for returned scans.
- manufacturer string

  The scanner manufacturer.
- model string

  The scanner model if it is available, or a generic description.
- name string

  A human-readable name for the scanner to display in the UI.
- protocolType string

  A human-readable description of the protocol or driver used to access the scanner, such as Mopria, WSD, or epsonds. This is primarily useful for allowing a user to choose between protocols if a device supports multiple protocols.
- scannerId string

  The ID of a specific scanner.
- secure boolean

  If true, the scanner connection's transport cannot be intercepted by a passive listener, such as TLS or USB.

### ScannerOption

Chrome 125+

#### Properties

- configurability [Configurability](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-Configurability)

  Indicates whether and how the option can be changed.
- constraint [OptionConstraint](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionConstraint) optional

  Defines [`OptionConstraint`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionConstraint) on the current scanner option.
- description string

  A longer description of the option.
- isActive boolean

  Indicates the option is active and can be set or retrieved. If false, the `value` property will not be set.
- isAdvanced boolean

  Indicates that the UI should not display this option by default.
- isAutoSettable boolean

  Can be automatically set by the scanner driver.
- isDetectable boolean

  Indicates that this option can be detected from software.
- isEmulated boolean

  Emulated by the scanner driver if true.
- name string

  The option name using lowercase ASCII letters, numbers, and dashes. Diacritics are not allowed.
- title string

  A printable one-line title.
- type [OptionType](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionType)

  The data type contained in the `value` property, which is needed for setting this option.
- unit [OptionUnit](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionUnit)

  The unit of measurement for this option.
- value string \| number \| boolean \| number\[\] optional

  The current value of the option, if relevant. Note that the data type of this property must match the data type specified in `type`.

### ScanOptions

#### Properties

- maxImages number optional

  The number of scanned images allowed. The default is 1.
- mimeTypes string\[\] optional

  The MIME types that are accepted by the caller.

### ScanResults

#### Properties

- dataUrls string\[\]

  An array of data image URLs in a form that can be passed as the "src" value to an image tag.
- mimeType string

  The MIME type of the `dataUrls`.

### SetOptionResult

Chrome 125+

#### Properties

- name string

  Indicates the name of the option that was set.
- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  Indicates the result of setting the option.

### SetOptionsResponse

Chrome 125+

#### Properties

- options object optional

  An updated key-value mapping from option names to [`ScannerOption`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScannerOption) values containing the new configuration after attempting to set all supplied options. This has the same structure as the `options` property in [`OpenScannerResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OpenScannerResponse).

  This property will be set even if some options were not set successfully, but will be unset if retrieving the updated configuration fails (for example, if the scanner is disconnected in the middle of scanning).
- results [SetOptionResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-SetOptionResult)\[\]

  An array of results, one each for every passed-in `OptionSetting`.
- scannerHandle string

  Provides the scanner handle passed to `setOptions()`.

### StartScanOptions

Chrome 125+

#### Properties

- format string

  Specifies the MIME type to return scanned data in.
- maxReadSize number optional

  If a non-zero value is specified, limits the maximum scanned bytes returned in a single [`readScanData`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-readScanData) response to that value. The smallest allowed value is 32768 (32 KB). If this property is not specified, the size of a returned chunk may be as large as the entire scanned image.

### StartScanResponse

Chrome 125+

#### Properties

- job string optional

  If `result` is `SUCCESS`, provides a handle that can be used to read scan data or cancel the job.
- result [OperationResult](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OperationResult)

  The result of starting a scan. If the value of this is `SUCCESS`, the `job` property will be populated.
- scannerHandle string

  Provides the same scanner handle that was passed to `startScan()`.

## Methods

### cancelScan()

Promise Chrome 125+

```typescript
chrome.documentScan.cancelScan(
  job: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CancelScanResponse>
```

Cancels a started scan and returns a Promise that resolves with a [`CancelScanResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CancelScanResponse) object. If a callback is used, the object is passed to it instead.

#### Parameters

- job string

  The handle of an active scan job previously returned from a call to [`startScan`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-startScan).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: CancelScanResponse) => void
  ```

  <br />

  - response [CancelScanResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CancelScanResponse)

#### Returns

- Promise\<[CancelScanResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CancelScanResponse)\>

  Returns a Promise which resolves with the result.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### closeScanner()

Promise Chrome 125+

```typescript
chrome.documentScan.closeScanner(
  scannerHandle: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CloseScannerResponse>
```

Closes the scanner with the passed in handle and returns a Promise that resolves with a [`CloseScannerResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CloseScannerResponse) object. If a callback is used, the object is passed to it instead. Even if the response is not a success, the supplied handle becomes invalid and should not be used for further operations.

#### Parameters

- scannerHandle string

  Specifies the handle of an open scanner that was previously returned from a call to [`openScanner`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-openScanner).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: CloseScannerResponse) => void
  ```

  <br />

  - response [CloseScannerResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CloseScannerResponse)

#### Returns

- Promise\<[CloseScannerResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-CloseScannerResponse)\>

  Returns a Promise which resolves with the result.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getOptionGroups()

Promise Chrome 125+

```typescript
chrome.documentScan.getOptionGroups(
  scannerHandle: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetOptionGroupsResponse>
```

Gets the group names and member options from a scanner previously opened by [`openScanner`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-openScanner). This method returns a Promise that resolves with a [`GetOptionGroupsResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetOptionGroupsResponse) object. If a callback is passed to this function, returned data is passed to it instead.

#### Parameters

- scannerHandle string

  The handle of an open scanner returned from a call to [`openScanner`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-openScanner).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: GetOptionGroupsResponse) => void
  ```

  <br />

  - response [GetOptionGroupsResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetOptionGroupsResponse)

#### Returns

- Promise\<[GetOptionGroupsResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetOptionGroupsResponse)\>

  Returns a Promise which resolves with the result.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getScannerList()

Promise Chrome 125+

```typescript
chrome.documentScan.getScannerList(
  filter: DeviceFilter,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetScannerListResponse>
```

Gets the list of available scanners and returns a Promise that resolves with a [`GetScannerListResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetScannerListResponse) object. If a callback is passed to this function, returned data is passed to it instead.

#### Parameters

- filter [DeviceFilter](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-DeviceFilter)

  A [`DeviceFilter`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-DeviceFilter) indicating which types of scanners should be returned.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: GetScannerListResponse) => void
  ```

  <br />

  - response [GetScannerListResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetScannerListResponse)

#### Returns

- Promise\<[GetScannerListResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-GetScannerListResponse)\>

  Returns a Promise which resolves with the result and list of scanners.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### openScanner()

Promise Chrome 125+

```typescript
chrome.documentScan.openScanner(
  scannerId: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OpenScannerResponse>
```

Opens a scanner for exclusive access and returns a Promise that resolves with an [`OpenScannerResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OpenScannerResponse) object. If a callback is passed to this function, returned data is passed to it instead.

#### Parameters

- scannerId string

  The ID of a scanner to be opened. This value is one returned from a previous call to [`getScannerList`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-getScannerList).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: OpenScannerResponse) => void
  ```

  <br />

  - response [OpenScannerResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OpenScannerResponse)

#### Returns

- Promise\<[OpenScannerResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OpenScannerResponse)\>

  Returns a Promise which resolves with the result.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### readScanData()

Promise Chrome 125+

```typescript
chrome.documentScan.readScanData(
  job: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ReadScanDataResponse>
```

Reads the next chunk of available image data from an active job handle, and returns a Promise that resolves with a [`ReadScanDataResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ReadScanDataResponse) object. If a callback is used, the object is passed to it instead.

\*\*Note:\*\*It is valid for a response result to be `SUCCESS` with a zero-length `data` member. This means the scanner is still working but does not yet have additional data ready. The caller should wait a short time and try again.

When the scan job completes, the response will have the result value of `EOF`. This response may contain a final non-zero `data` member.

#### Parameters

- job string

  Active job handle previously returned from [`startScan`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-startScan).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: ReadScanDataResponse) => void
  ```

  <br />

  - response [ReadScanDataResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ReadScanDataResponse)

#### Returns

- Promise\<[ReadScanDataResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ReadScanDataResponse)\>

  Returns a Promise which resolves with the result.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### scan()

Promise

```typescript
chrome.documentScan.scan(
  options: ScanOptions,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScanResults>
```

Performs a document scan and returns a Promise that resolves with a [`ScanResults`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScanResults) object. If a callback is passed to this function, the returned data is passed to it instead.

#### Parameters

- options [ScanOptions](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScanOptions)

  An object containing scan parameters.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: ScanResults) => void
  ```

  <br />

  - result [ScanResults](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScanResults)

#### Returns

- Promise\<[ScanResults](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-ScanResults)\>
  Chrome 96+

  Returns a Promise which resolves with the scan results.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setOptions()

Promise Chrome 125+

```typescript
chrome.documentScan.setOptions(
  scannerHandle: string,
  options: OptionSetting[],
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-SetOptionsResponse>
```

Sets options on the specified scanner and returns a Promise that resolves with a [`SetOptionsResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-SetOptionsResponse) object containing the result of trying to set every value in the order of the passed-in [`OptionSetting`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionSetting) object. If a callback is used, the object is passed to it instead.

#### Parameters

- scannerHandle string

  The handle of the scanner to set options on. This should be a value previously returned from a call to [`openScanner`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-openScanner).
- options [OptionSetting](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-OptionSetting)\[\]

  A list of `OptionSetting` objects to be applied to the scanner.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: SetOptionsResponse) => void
  ```

  <br />

  - response [SetOptionsResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-SetOptionsResponse)

#### Returns

- Promise\<[SetOptionsResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-SetOptionsResponse)\>

  Returns a Promise which resolves with the result.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### startScan()

Promise Chrome 125+

```typescript
chrome.documentScan.startScan(
  scannerHandle: string,
  options: StartScanOptions,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-StartScanResponse>
```

Starts a scan on the specified scanner and returns a Promise that resolves with a [`StartScanResponse`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-StartScanResponse). If a callback is used, the object is passed to it instead. If the call was successful, the response includes a job handle that can be used in subsequent calls to read scan data or cancel a scan.

#### Parameters

- scannerHandle string

  The handle of an open scanner. This should be a value previously returned from a call to [`openScanner`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#method-openScanner).
- options [StartScanOptions](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-StartScanOptions)

  A [`StartScanOptions`](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-StartScanOptions) object indicating the options to be used for the scan. The `StartScanOptions.format` property must match one of the entries returned in the scanner's `ScannerInfo`.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (response: StartScanResponse) => void
  ```

  <br />

  - response [StartScanResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-StartScanResponse)

#### Returns

- Promise\<[StartScanResponse](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan#type-StartScanResponse)\>

  Returns a Promise which resolves with the result.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />