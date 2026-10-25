refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.enterprise.hardwarePlatform` API to get the manufacturer and model of the hardware platform where the browser runs. Note: This API is only available to extensions installed by enterprise policy.

<br />

<br />

## Permissions

`enterprise.hardwarePlatform`  

<br />

<br />

## Availability

Chrome 71+ [Requires policy](https://support.google.com/chrome/a/answer/9296680)

<br />

<br />

> [!NOTE]
> **Note:** This API is only for **[extensions pre-installed by a policy](https://cloud.google.com/blog/products/chrome-enterprise/how-to-manage-chrome-extensions-on-windows-and-mac)** . The \<code\>[EnterpriseHardwarePlatformAPIEnabled](https://chromeenterprise.google/policies/?policy=EnterpriseHardwarePlatformAPIEnabled)\</code\> policy key must also be set.

<br />

## Types

### HardwarePlatformInfo

#### Properties

- manufacturer string
- model string

## Methods

### getHardwarePlatformInfo()

Promise

```typescript
chrome.enterprise.hardwarePlatform.getHardwarePlatformInfo(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/hardwarePlatform#type-HardwarePlatformInfo>
```

Obtains the manufacturer and model for the hardware platform and, if the extension is authorized, returns it via `callback`.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (info: HardwarePlatformInfo) => void
  ```

  <br />

  - info [HardwarePlatformInfo](https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/hardwarePlatform#type-HardwarePlatformInfo)

#### Returns

- Promise\<[HardwarePlatformInfo](https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/hardwarePlatform#type-HardwarePlatformInfo)\>
  Chrome 96+

  Returns a Promise which resolves with the hardware platform info.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />