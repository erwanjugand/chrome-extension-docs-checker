This API is only for [extensions installed by a policy](https://cloud.google.com/blog/products/chrome-enterprise/how-to-manage-chrome-extensions-on-windows-and-mac). The [`EnterpriseHardwarePlatformAPIEnabled`](https://chromeenterprise.google/policies/?policy=EnterpriseHardwarePlatformAPIEnabled) key must also be set.

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

<br />

## Types

### HardwarePlatformInfo

#### Properties

- manufacturer string
- model string

## Methods

### getHardwarePlatformInfo()

```typescript
chrome.enterprise.hardwarePlatform.getHardwarePlatformInfo(): Promise<https://developer.chrome.com/docs/extensions/reference/api/enterprise/hardwarePlatform#type-HardwarePlatformInfo>
```

Obtains the manufacturer and model for the hardware platform and, if the extension is authorized, returns it via `callback`.

#### Returns

- Promise\<[HardwarePlatformInfo](https://developer.chrome.com/docs/extensions/reference/api/enterprise/hardwarePlatform#type-HardwarePlatformInfo)\>
  Chrome 96+

  Returns a Promise which resolves with the hardware platform info.

<br />