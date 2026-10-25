This API is only for [extensions installed by a policy](https://support.google.com/chrome/a/answer/1375694).

<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.enterprise.networkingAttributes` API to read information about your current network. Note: This API is only available to extensions force-installed by enterprise policy.

<br />

<br />

## Permissions

`enterprise.networkingAttributes`  

<br />

<br />

## Availability

Chrome 85+ ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

<br />

<br />

<br />

## Types

### NetworkDetails

#### Properties

- ipv4 string optional

  The device's local IPv4 address (undefined if not configured).
- ipv6 string optional

  The device's local IPv6 address (undefined if not configured).
- macAddress string

  The device's MAC address.

## Methods

### getNetworkDetails()

```typescript
chrome.enterprise.networkingAttributes.getNetworkDetails(): Promise<https://developer.chrome.com/docs/extensions/reference/api/enterprise/networkingAttributes#type-NetworkDetails>
```

Retrieves the network details of the device's default network. If the user is not affiliated or the device is not connected to a network, [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/api/runtime/#property-lastError) will be set with a failure reason.

#### Returns

- Promise\<[NetworkDetails](https://developer.chrome.com/docs/extensions/reference/api/enterprise/networkingAttributes#type-NetworkDetails)\>
  Chrome 96+

  Returns a Promise which resolves with the device's default network's [`NetworkDetails`](https://developer.chrome.com/docs/extensions/reference/api/enterprise/networkingAttributes#type-NetworkDetails).

<br />