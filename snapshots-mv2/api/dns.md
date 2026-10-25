refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.dns` API for dns resolution.

<br />

<br />

## Permissions

`dns`  

<br />

<br />

## Availability

Dev channel

<br />

## Manifest

To use this API, you must declare the `"dns"` permission in the [manifest](https://developer.chrome.com/docs/extensions/mv3/manifest).

    {
      "name": "My extension",
      ...
      "permissions": [
        "dns"
      ],
      ...
    }

> [!NOTE]
> **Note:** This API is only available in [Chrome Dev](https://www.google.com/chrome/dev/). There are no foreseeable plans to move this API from the dev channel into Chrome stable.

### Usage

The following code calls [`resolve()`](https://developer.chrome.com/docs/extensions/mv2/reference/dns#method-resolve) to retrieve the IP address of `example.com`.

service-worker.js:

    const resolveDNS = async () => {
        let record = await chrome.dns.resolve('example.com');
        console.log(record.address); // "192.0.2.172"
    };

    resolveDNS();

> [!IMPORTANT]
> **Key point:** Do not include the scheme or trailing slash in the hostname. For example, `https://example.com/` is invalid.

<br />

## Types

### ResolveCallbackResolveInfo

#### Properties

- address string optional

  A string representing the IP address literal. Supplied only if resultCode indicates success.
- resultCode number

  The result code. Zero indicates success.

## Methods

### resolve()

Promise

```typescript
chrome.dns.resolve(
  hostname: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/dns#type-ResolveCallbackResolveInfo>
```

Resolves the given hostname or IP address literal.

#### Parameters

- hostname string

  The hostname to resolve.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (resolveInfo: ResolveCallbackResolveInfo) => void
  ```

  <br />

  - resolveInfo [ResolveCallbackResolveInfo](https://developer.chrome.com/docs/extensions/mv2/reference/dns#type-ResolveCallbackResolveInfo)

#### Returns

- Promise\<[ResolveCallbackResolveInfo](https://developer.chrome.com/docs/extensions/mv2/reference/dns#type-ResolveCallbackResolveInfo)\>

  Promise that resolves when the resolution operation completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />