refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.permissions` API to request [declared optional permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.

<br />

<br />

<br />

<br />

## Overview

Permission warnings exist to describe the capabilities granted by an API, but some of these warnings may not be obvious. The Permissions API allows developers to explain permission warnings and introduce new features gradually which gives users a risk-free introduction to the extension. This way, users can specify how much access they are willing to grant and which features they want to enable.

For example, the [optional permissions extension's](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.optional_permissions) core functionality is overriding the new tab page. One feature is displaying the user's goal of the day. This feature only requires the [storage](https://developer.chrome.com/docs/extensions/reference/storage) permission, which does not include a warning. The extension has an additional feature, that users can enable by clicking the following button:

![Extension button that enables additional features](https://developer.chrome.com/static/docs/extensions/mv2/reference/permissions/images/button.png)

Displaying the user's top sites requires the [topSites](https://developer.chrome.com/docs/extensions/reference/topSites) permission, which has the following warning.

![Extension warning for topSites API](https://developer.chrome.com/static/docs/extensions/mv2/reference/permissions/image/dialog.png)

## Implementing optional permissions

### Step 1: Decide which permissions are required and which are optional

An extension can declare both required and optional permissions. In general, you should:

- Use required permissions when they are needed for your extension's basic functionality.
- Use optional permissions when they are needed for optional features in your extension.

Advantages of *required* permissions:

- **Fewer prompts:** An extension can prompt the user once to accept all permissions.
- **Simpler development:** Required permissions are guaranteed to be present.

Advantages of *optional* permissions:

- **Better security:** Extensions run with fewer permissions since users only enable permissions that are needed.
- **Better information for users:** An extension can explain why it needs a particular permission when the user enables the relevant feature.
- **Easier upgrades:** When you upgrade your extension, Chrome will not disable it for your users if the upgrade adds optional rather than required permissions.

### Step 2: Declare optional permissions in the manifest

Declare optional permissions in your [extension manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) with the `optional_permissions` key,
using the same format as the [permissions](https://developer.chrome.com/docs/extensions/mv3/declare_permissions) field:

    {
      "name": "My extension",
      ...
      "optional_permissions": ["tabs"],
      "optional_host_permissions": ["https://www.google.com/"],
      ...
    }

If you want to request hosts that you only discover at runtime, include `"https://*/*"` in your extension's `optional_host_permissions` field. This lets you specify any origin in [Permissions.origins](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#property-Permissions-origins) as long as it has a matching
scheme.

**Permissions that can *not* be specified as optional**

Most Chrome extension permissions can be specified as optional, with the following exceptions.

| Permission | Description |
|---|---|
| `"debugger"` | The [chrome.debugger](https://developer.chrome.com/docs/extensions/mv2/reference/debugger) API serves as an alternate transport for Chrome's [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/). |
| `"declarativeNetRequest"` | Grants the extension access to the [chrome.declarativeNetRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest) API. |
| `"devtools"` | Allows extension to expand [Chrome DevTools](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools) functionality. |
| `"experimental"` | **[Canary](https://www.google.com/chrome/canary/) and [Dev channel](https://www.chromium.org/getting-involved/dev-channel) only.** Grants the extension access to [chrome.experimental](https://developer.chrome.com/experimental) APIs. |
| `"geolocation"` | Allows the extension to use the HTML5 [geolocation](https://w3c.github.io/geolocation-api/) API. |
| `"mdns"` | Grants the extension access to the [chrome.mdns](https://developer.chrome.com/docs/apps/reference/mdns) API. |
| `"proxy"` | Grants the extension access to the [chrome.proxy](https://developer.chrome.com/docs/extensions/mv2/reference/proxy) API to manage Chrome's proxy settings. |
| `"tts"` | The [chrome.tts](https://developer.chrome.com/docs/extensions/mv2/reference/tts) API plays synthesized text-to-speech (TTS). |
| `"ttsEngine"` | The [chrome.ttsEngine](https://developer.chrome.com/docs/extensions/mv2/reference/ttsEngine) API implements a text-to-speech (TTS) engine using an extension. |
| `"wallpaper"` | **ChromeOS only** . Use the [chrome.wallpaper](https://developer.chrome.com/docs/extensions/mv2/reference/wallpaper) API change the ChromeOS wallpaper. |

View [Declare Permissions and Warn Users](https://developer.chrome.com/docs/extensions/mv3/permission_warnings#overview) for further information on available permissions and
their warnings.

### Step 3: Request optional permissions

Request the permissions from within a user gesture using `permissions.request()`:

    document.querySelector('#my-button').addEventListener('click', (event) => {
      // Permissions must be requested from inside a user gesture, like a button's
      // click handler.
      chrome.permissions.request({
        permissions: ['tabs'],
        origins: ['https://www.google.com/']
      }, (granted) => {
        // The callback argument will be true if the user granted the permissions.
        if (granted) {
          doSomething();
        } else {
          doSomethingElse();
        }
      });
    });

Chrome prompts the user if adding the permissions results in different [warning messages](https://developer.chrome.com/docs/extensions/mv3/permission_warnings#overview) than
the user has already seen and accepted. For example, the previous code might result in a prompt like
this:

![example permission confirmation prompt](https://developer.chrome.com/static/perms-optional.png)

### Step 4: Check the extension's current permissions

To check whether your extension has a specific permission or set of permissions, use
`permission.contains()`:

    chrome.permissions.contains({
      permissions: ['tabs'],
      origins: ['https://www.google.com/']
    }, (result) => {
      if (result) {
        // The extension has the permissions.
      } else {
        // The extension doesn't have the permissions.
      }
    });

### Step 5: Remove the permissions

You should remove permissions when you no longer need them. After a permission has been removed,
calling `permissions.request()` usually adds the permission back without prompting the user.

    chrome.permissions.remove({
      permissions: ['tabs'],
      origins: ['https://www.google.com/']
    }, (removed) => {
      if (removed) {
        // The permissions have been removed.
      } else {
        // The permissions have not been removed (e.g., you tried to remove
        // required permissions).
      }
    });

<br />

## Types

### Permissions

#### Properties

- origins string\[\] optional

  The list of host permissions, including those specified in the `optional_permissions` or `permissions` keys in the manifest, and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts).
- permissions string\[\] optional

  List of named permissions (does not include hosts or origins).

## Methods

### contains()

Promise

```typescript
chrome.permissions.contains(
  permissions: Permissions,
  callback?: function,
): Promise<boolean>
```

Checks if the extension has the specified permissions.

#### Parameters

- permissions [Permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: boolean) => void
  ```

  <br />

  - result boolean

    True if the extension has the specified permissions. If an origin is specified as both an optional permission and a content script match pattern, this will return `false` unless both permissions are granted.

#### Returns

- Promise\<boolean\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getAll()

Promise

```typescript
chrome.permissions.getAll(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions>
```

Gets the extension's current set of permissions.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (permissions: Permissions) => void
  ```

  <br />

  - permissions [Permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions)

    The extension's active permissions. Note that the `origins` property will contain granted origins from those specified in the `permissions` and `optional_permissions` keys in the manifest and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts).

#### Returns

- Promise\<[Permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions)\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### remove()

Promise

```typescript
chrome.permissions.remove(
  permissions: Permissions,
  callback?: function,
): Promise<boolean>
```

Removes access to the specified permissions. If there are any problems removing the permissions, the promise will be rejected.

#### Parameters

- permissions [Permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (removed: boolean) => void
  ```

  <br />

  - removed boolean

    True if the permissions were removed.

#### Returns

- Promise\<boolean\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### request()

Promise

```typescript
chrome.permissions.request(
  permissions: Permissions,
  callback?: function,
): Promise<boolean>
```

Requests access to the specified permissions, displaying a prompt to the user if necessary. These permissions must either be defined in the `optional_permissions` field of the manifest or be required permissions that were withheld by the user. Paths on origin patterns will be ignored. You can request subsets of optional origin permissions; for example, if you specify `*://*\/*` in the `optional_permissions` section of the manifest, you can request `http://example.com/`. If there are any problems requesting the permissions, the promise will be rejected.

#### Parameters

- permissions [Permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (granted: boolean) => void
  ```

  <br />

  - granted boolean

    True if the user granted the specified permissions.

#### Returns

- Promise\<boolean\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onAdded

```typescript
chrome.permissions.onAdded.addListener(
  callback: function,
)
```

Fired when the extension acquires new permissions.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (permissions: Permissions) => void
  ```

  <br />

  - permissions [Permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions)

### onRemoved

```typescript
chrome.permissions.onRemoved.addListener(
  callback: function,
)
```

Fired when access to permissions has been removed from the extension.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (permissions: Permissions) => void
  ```

  <br />

  - permissions [Permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions#type-Permissions)

<br />