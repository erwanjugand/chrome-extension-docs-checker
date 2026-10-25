refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

The `chrome.printerProvider` API exposes events used by print manager to query printers controlled by extensions, to query their capabilities and to submit print jobs to these printers.

<br />

<br />

## Permissions

`printerProvider`  

<br />

<br />

## Availability

Chrome 44+

<br />

<br />

<br />

## Types

### PrinterInfo

#### Properties

- description string optional

  Printer's human readable description.
- id string

  Unique printer ID.
- name string

  Printer's human readable name.

### PrintError

Error codes returned in response to [`onPrintRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/printerProvider#event-onPrintRequested) event.

#### Enum

"OK"   
Specifies that the operation was completed successfully.
"FAILED"   
Specifies that a general failure occured.
"INVALID_TICKET"   
Specifies that the print ticket is invalid. For example, the ticket is inconsistent with some capabilities, or the extension is not able to handle all settings from the ticket.
"INVALID_DATA"   
Specifies that the document is invalid. For example, data may be corrupted or the format is incompatible with the extension.

<br />

### PrintJob

#### Properties

- contentType string

  The document content type. Supported formats are `"application/pdf"` and `"image/pwg-raster"`.
- document Blob

  Blob containing the document data to print. Format must match `contentType`.
- printerId string

  ID of the printer which should handle the job.
- ticket object

  Print ticket in [CJT format](https://developers.google.com/cloud-print/docs/cdd#cjt).

  The CJT reference is marked as deprecated. It is deprecated for Google Cloud Print only. is not deprecated for ChromeOS printing.
- title string

  The print job title.

## Events

### onGetCapabilityRequested

```typescript
chrome.printerProvider.onGetCapabilityRequested.addListener(
  callback: function,
)
```

Event fired when print manager requests printer capabilities.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (printerId: string, resultCallback: function) => void
  ```

  <br />

  - printerId string
  - resultCallback function


    The `resultCallback` parameter looks like:

    ```typescript
    (capabilities: object) => void
    ```

    <br />

    - capabilities object

      Device capabilities in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd).

### onGetPrintersRequested

```typescript
chrome.printerProvider.onGetPrintersRequested.addListener(
  callback: function,
)
```

Event fired when print manager requests printers provided by extensions.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (resultCallback: function) => void
  ```

  <br />

  - resultCallback function


    The `resultCallback` parameter looks like:

    ```typescript
    (printerInfo: PrinterInfo[]) => void
    ```

    <br />

    - printerInfo [PrinterInfo](https://developer.chrome.com/docs/extensions/mv2/reference/printerProvider#type-PrinterInfo)\[\]

### onGetUsbPrinterInfoRequested

Chrome 45+

```typescript
chrome.printerProvider.onGetUsbPrinterInfoRequested.addListener(
  callback: function,
)
```

Event fired when print manager requests information about a USB device that may be a printer.

*Note:* An application should not rely on this event being fired more than once per device. If a connected device is supported it should be returned in the [`onGetPrintersRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/printerProvider#event-onGetPrintersRequested) event.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (device: usb.Device, resultCallback: function) => void
  ```

  <br />

  - device [usb.Device](https://developer.chrome.com/docs/extensions/mv2/usb/#type-Device)
  - resultCallback function


    The `resultCallback` parameter looks like:

    ```typescript
    (printerInfo?: PrinterInfo) => void
    ```

    <br />

    - printerInfo [PrinterInfo](https://developer.chrome.com/docs/extensions/mv2/reference/printerProvider#type-PrinterInfo) optional

### onPrintRequested

```typescript
chrome.printerProvider.onPrintRequested.addListener(
  callback: function,
)
```

Event fired when print manager requests printing.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (printJob: PrintJob, resultCallback: function) => void
  ```

  <br />

  - printJob [PrintJob](https://developer.chrome.com/docs/extensions/mv2/reference/printerProvider#type-PrintJob)
  - resultCallback function


    The `resultCallback` parameter looks like:

    ```typescript
    (result: PrintError) => void
    ```

    <br />

    - result [PrintError](https://developer.chrome.com/docs/extensions/mv2/reference/printerProvider#type-PrintError)

<br />