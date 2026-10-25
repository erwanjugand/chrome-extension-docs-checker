refresh date: 2026-09-25
robots: noindex

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

Promise

```typescript
chrome.systemLog.add(
  options: MessageOptions,
  callback?: function,
): Promise<void>
```

Adds a new log record.

#### Parameters

- options [MessageOptions](https://developer.chrome.com/docs/extensions/mv2/reference/systemLog#type-MessageOptions)

  The logging options.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>

  Returns a Promise which resolves once the log has been added.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />