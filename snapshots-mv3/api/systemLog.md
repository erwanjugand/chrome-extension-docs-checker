<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.systemLog` API to record Chrome system logs from extensions.

<br />

<br />

## Permissions

`systemLog`  

<br />

<br />

## Availability

Chrome 125+ ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

<br />

<br />

<br />

## Types

### MessageOptions

#### Properties

- message string

## Methods

### add()

```typescript
chrome.systemLog.add(
  options: MessageOptions,
): Promise<void>
```

Adds a new log record.

#### Parameters

- options [MessageOptions](https://developer.chrome.com/docs/extensions/reference/api/systemLog#type-MessageOptions)

  The logging options.

#### Returns

- Promise\<void\>

  Returns a Promise which resolves once the log has been added.

<br />