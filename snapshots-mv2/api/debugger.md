refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

The `chrome.debugger` API serves as an alternate transport for Chrome's [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol). Use `chrome.debugger` to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, and more. Use the [`Debuggee`](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-Debuggee) property `tabId` to target tabs with `sendCommand` and route events by `tabId` from `onEvent` callbacks.

<br />

<br />

## Permissions

`debugger`  

<br />

> [!CAUTION]
> This permission [triggers a warning](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings#permissions_with_warnings).

<br />

<br />

## Security Note

For security reasons, the `chrome.debugger` API does not provide access to all Chrome DevTools
Protocol Domains. The available domains are: [Accessibility](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility),
[Audits](https://chromedevtools.github.io/devtools-protocol/tot/Audits), [CacheStorage](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage), [Console](https://chromedevtools.github.io/devtools-protocol/tot/Console),
[CSS](https://chromedevtools.github.io/devtools-protocol/tot/css), [Database](https://chromedevtools.github.io/devtools-protocol/tot/Database), [Debugger](https://chromedevtools.github.io/devtools-protocol/tot/Debugger), [DOM](https://chromedevtools.github.io/devtools-protocol/tot/DOM),
[DOMDebugger](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger), [DOMSnapshot](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot),
[Emulation](https://chromedevtools.github.io/devtools-protocol/tot/Emulation), [Fetch](https://chromedevtools.github.io/devtools-protocol/tot/Fetch), [IO](https://chromedevtools.github.io/devtools-protocol/tot/IO), [Input](https://chromedevtools.github.io/devtools-protocol/tot/Input),
[Inspector](https://chromedevtools.github.io/devtools-protocol/tot/Inspector), [Log](https://chromedevtools.github.io/devtools-protocol/tot/Log), [Network](https://chromedevtools.github.io/devtools-protocol/tot/Network), [Overlay](https://chromedevtools.github.io/devtools-protocol/tot/Overlay),
[Page](https://chromedevtools.github.io/devtools-protocol/tot/Page), [Performance](https://chromedevtools.github.io/devtools-protocol/tot/Performance),
[Runtime](https://chromedevtools.github.io/devtools-protocol/tot/Runtime), [Storage](https://chromedevtools.github.io/devtools-protocol/tot/Storage), [Target](https://chromedevtools.github.io/devtools-protocol/tot/Target), [Tracing](https://chromedevtools.github.io/devtools-protocol/tot/Tracing),
[WebAudio](https://chromedevtools.github.io/devtools-protocol/tot/WebAudio), and [WebAuthn](https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn).

## Manifest

You must declare the `"debugger"` permission in your extension's manifest to use this API.

    {
      "name": "My extension",
      ...
      "permissions": [
        "debugger",
      ],
      ...
    }

## Examples

To try this API, install the [debugger API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/debugger) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### Debuggee

Debuggee identifier. Either tabId, extensionId or targetId must be specified

#### Properties

- extensionId string optional

  The id of the extension which you intend to debug. Attaching to an extension background page is only possible when the `--silent-debugger-extension-api` command-line switch is used.
- tabId number optional

  The id of the tab which you intend to debug.
- targetId string optional

  The opaque id of the debug target.

### DebuggerSession

Chrome 125+

Debugger session identifier. One of tabId, extensionId or targetId must be specified. Additionally, an optional sessionId can be provided. If sessionId is specified for arguments sent from [`onEvent`](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#event-onEvent), it means the event is coming from a child protocol session within the root debuggee session. If sessionId is specified when passed to [`sendCommand`](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#method-sendCommand), it targets a child protocol session within the root debuggee session.

#### Properties

- extensionId string optional

  The id of the extension which you intend to debug. Attaching to an extension background page is only possible when the `--silent-debugger-extension-api` command-line switch is used.
- sessionId string optional

  The opaque id of the Chrome DevTools Protocol session. Identifies a child session within the root session identified by tabId, extensionId or targetId.
- tabId number optional

  The id of the tab which you intend to debug.
- targetId string optional

  The opaque id of the debug target.

### DetachReason

Chrome 44+

Connection termination reason.

#### Enum

"target_closed"   
"canceled_by_user"   

<br />

### TargetInfo

Debug target information

#### Properties

- attached boolean

  True if debugger is already attached.
- extensionId string optional

  The extension id, defined if type = 'background_page'.
- faviconUrl string optional

  Target favicon URL.
- id string

  Target id.
- tabId number optional

  The tab id, defined if type == 'page'.
- title string

  Target page title.
- type [TargetInfoType](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-TargetInfoType)

  Target type.
- url string

  Target URL.

### TargetInfoType

Chrome 44+

Target type.

#### Enum

"page"   
"background_page"   
"worker"   
"other"   

<br />

## Methods

### attach()

Promise

```typescript
chrome.debugger.attach(
  target: Debuggee,
  requiredVersion: string,
  callback?: function,
): Promise<void>
```

Attaches debugger to the given target.

#### Parameters

- target [Debuggee](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-Debuggee)

  Debugging target to which you want to attach.
- requiredVersion string

  Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained [here](https://developer.chrome.com/devtools/docs/debugger-protocol).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+

  Resolves once the attach operation succeeds or fails. The promise resolves with no value. If the attach fails, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### detach()

Promise

```typescript
chrome.debugger.detach(
  target: Debuggee,
  callback?: function,
): Promise<void>
```

Detaches debugger from the given target.

#### Parameters

- target [Debuggee](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-Debuggee)

  Debugging target from which you want to detach.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+

  Resolves once the detach operation succeeds or fails. The promise resolves with no value. If the detach fails, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getTargets()

Promise

```typescript
chrome.debugger.getTargets(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-TargetInfo[]>
```

Returns the list of available debug targets.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: TargetInfo[]) => void
  ```

  <br />

  - result [TargetInfo](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-TargetInfo)\[\]

    Array of TargetInfo objects corresponding to the available debug targets.

#### Returns

- Promise\<[TargetInfo](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-TargetInfo)\[\]\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### sendCommand()

Promise

```typescript
chrome.debugger.sendCommand(
  target: DebuggerSession,
  method: string,
  commandParams?: object,
  callback?: function,
): Promise<object | undefined>
```

Sends given command to the debugging target.

#### Parameters

- target [DebuggerSession](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-DebuggerSession)

  Debugging target to which you want to send the command.
- method string

  Method name. Should be one of the methods defined by the [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol).
- commandParams object optional

  JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result?: object) => void
  ```

  <br />

  - result object optional

    JSON object with the response. Structure of the response varies depending on the method name and is defined by the 'returns' attribute of the command description in the remote debugging protocol.

#### Returns

- Promise\<object \| undefined\>
  Chrome 96+

  Response body. If an error occurs while posting the message, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onDetach

```typescript
chrome.debugger.onDetach.addListener(
  callback: function,
)
```

Fired when browser terminates debugging session for the tab. This happens when either the tab is being closed or Chrome DevTools is being invoked for the attached tab.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (source: Debuggee, reason: DetachReason) => void
  ```

  <br />

  - source [Debuggee](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-Debuggee)
  - reason [DetachReason](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-DetachReason)

### onEvent

```typescript
chrome.debugger.onEvent.addListener(
  callback: function,
)
```

Fired whenever debugging target issues instrumentation event.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (source: DebuggerSession, method: string, params?: object) => void
  ```

  <br />

  - source [DebuggerSession](https://developer.chrome.com/docs/extensions/mv2/reference/debugger#type-DebuggerSession)
  - method string
  - params object optional

<br />