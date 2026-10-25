<br />

<br />

## Description

The `chrome.debugger` API serves as an alternate transport for Chrome's [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol). Use `chrome.debugger` to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, and more. Use the [`Debuggee`](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-Debuggee) property `tabId` to target tabs with `sendCommand` and route events by `tabId` from `onEvent` callbacks.

<br />

<br />

## Permissions

`debugger`  

<br />

You must declare the `"debugger"` permission in your extension's manifest to use this API.

    {
      "name": "My extension",
      ...
      "permissions": [
        "debugger",
      ],
      ...
    }

### Enterprise policy restrictions

On enterprise devices, some policies can restrict extensions from attaching the debugger using an all-or-nothing model at attach time
([`browser.debugger.attach()`](https://developer.chrome.com/docs/extensions/reference/api/debugger#method-attach)):

- **Host restrictions:** If enterprise policy [`ExtensionSettings`](https://support.google.com/chrome/a/answer/9867568?p=Configure_ExtensionSettings_policy) configures blocked hosts (`runtime_blocked_hosts`) for an extension, [`browser.debugger.attach()`](https://developer.chrome.com/docs/extensions/reference/api/debugger#method-attach) is blocked on all targets with the error `"Host access is restricted by policy."` (even if individual origins are in `runtime_allowed_hosts`).
- **Screenshot and DLP policies:** If enterprise policy [`DisableScreenshots`](https://chromeenterprise.google/policies/#DisableScreenshots) disables screenshot capture or Data Loss Prevention (DLP) rules apply to the target, [`browser.debugger.attach()`](https://developer.chrome.com/docs/extensions/reference/api/debugger#method-attach) fails with the error `"Screenshot capture is restricted by policy."`.

<br />

<br />

## Concepts and usage

Once attached, the `browser.debugger` API lets you send [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
(CDP) commands to a given target. Explaining the CDP in depth is out of scope
for this documentation---to learn more about CDP check out the
[official CDP documentation](https://chromedevtools.github.io/devtools-protocol/).

### Targets

Targets represent something which is being debugged---this could include a tab,
an iframe or a worker. Each target is identified by a UUID and has an associated
type (such as `iframe`, `shared_worker`, and more).

Within a target, there may be multiple execution contexts---for example same
process iframes don't get a unique target but are instead represented as
different contexts that can be accessed from a single target.

### Restricted domains

For security reasons, the `browser.debugger` API does not provide access to all Chrome DevTools
Protocol Domains. The available domains are: [Accessibility](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility),
[Audits](https://chromedevtools.github.io/devtools-protocol/tot/Audits), [CacheStorage](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage), [Console](https://chromedevtools.github.io/devtools-protocol/tot/Console),
[CSS](https://chromedevtools.github.io/devtools-protocol/tot/CSS/), [Database](https://chromedevtools.github.io/devtools-protocol/tot/Database), [Debugger](https://chromedevtools.github.io/devtools-protocol/tot/Debugger), [DOM](https://chromedevtools.github.io/devtools-protocol/tot/DOM),
[DOMDebugger](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger), [DOMSnapshot](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot),
[Emulation](https://chromedevtools.github.io/devtools-protocol/tot/Emulation), [Fetch](https://chromedevtools.github.io/devtools-protocol/tot/Fetch), [IO](https://chromedevtools.github.io/devtools-protocol/tot/IO), [Input](https://chromedevtools.github.io/devtools-protocol/tot/Input),
[Inspector](https://chromedevtools.github.io/devtools-protocol/tot/Inspector), [Log](https://chromedevtools.github.io/devtools-protocol/tot/Log), [Network](https://chromedevtools.github.io/devtools-protocol/tot/Network), [Overlay](https://chromedevtools.github.io/devtools-protocol/tot/Overlay),
[Page](https://chromedevtools.github.io/devtools-protocol/tot/Page), [Performance](https://chromedevtools.github.io/devtools-protocol/tot/Performance),
[Runtime](https://chromedevtools.github.io/devtools-protocol/tot/Runtime), [Storage](https://chromedevtools.github.io/devtools-protocol/tot/Storage), [Target](https://chromedevtools.github.io/devtools-protocol/tot/Target), [Tracing](https://chromedevtools.github.io/devtools-protocol/tot/Tracing),
[WebAudio](https://chromedevtools.github.io/devtools-protocol/tot/WebAudio), and [WebAuthn](https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn).

### Work with frames

There is not a one to one mapping of frames to targets. Within a single tab,
multiple same process frames may share the same target but use a different
[execution context](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ExecutionContextId). On the other hand, a new target may be
created for an out-of-process iframe.

To attach to all frames, you need to handle each type of frame separately:

- Listen for the `Runtime.executionContextCreated` event to identify new
  execution contexts associated with same process frames.

- Follow the steps to [attach to related targets](https://developer.chrome.com/docs/extensions/reference/api/debugger#attach_to_related_targets) to
  identify out-of-process frames.

### Attach to related targets

After connecting to a target, you may want to connect to further related targets
including out-of-process child frames or associated workers.

Starting in Chrome 125, the `browser.debugger` API supports flat sessions. This
lets you add additional targets as children to your main debugger session and
message them without needing another call to `browser.debugger.attach`. Instead,
you can add a `sessionId` property when calling `browser.debugger.sendCommand` to
identify the child target you would like to send a command to.

To automatically attach to out of process child frames, first add a listener for
the `Target.attachedToTarget` event:

    browser.debugger.onEvent.addListener((source, method, params) => {
      if (method === "Target.attachedToTarget") {
        // `source` identifies the parent session, but we need to construct a new
        // identifier for the child session
        const session = { ...source, sessionId: params.sessionId };

        // Call any needed CDP commands for the child session
        await browser.debugger.sendCommand(session, "Runtime.enable");
      }
    });

Then, enable [auto attach](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAutoAttach) by sending the `Target.setAutoAttach` command with
the `flatten` option set to `true`:

    await browser.debugger.sendCommand({ tabId }, "Target.setAutoAttach", {
      autoAttach: true,
      waitForDebuggerOnStart: false,
      flatten: true,
      filter: [{ type: "iframe", exclude: false }]
    });

Auto-attach only attaches to frames the target is aware of, which is limited to
frames which are immediate children of a frame associated with it. For example,
with the frame hierarchy A -\> B -\> C (where all are cross-origin), calling
`Target.setAutoAttach` for the target associated with A would result in the
session also being attached to B. However, this is not recursive, so
`Target.setAutoAttach` also needs to be called for B to attach the session to C.

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

Debugger session identifier. One of tabId, extensionId or targetId must be specified. Additionally, an optional sessionId can be provided. If sessionId is specified for arguments sent from [`onEvent`](https://developer.chrome.com/docs/extensions/reference/api/debugger#event-onEvent), it means the event is coming from a child protocol session within the root debuggee session. If sessionId is specified when passed to [`sendCommand`](https://developer.chrome.com/docs/extensions/reference/api/debugger#method-sendCommand), it targets a child protocol session within the root debuggee session.

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
- type [TargetInfoType](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-TargetInfoType)

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

```typescript
chrome.debugger.attach(
  target: Debuggee,
  requiredVersion: string,
): Promise<void>
```

Attaches debugger to the given target.

#### Parameters

- target [Debuggee](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-Debuggee)

  Debugging target to which you want to attach.
- requiredVersion string

  Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained [here](https://developer.chrome.com/devtools/docs/debugger-protocol).

#### Returns

- Promise\<void\>
  Chrome 96+

  Resolves once the attach operation succeeds or fails. The promise resolves with no value. If the attach fails, the promise will be rejected.

### detach()

```typescript
chrome.debugger.detach(
  target: Debuggee,
): Promise<void>
```

Detaches debugger from the given target.

#### Parameters

- target [Debuggee](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-Debuggee)

  Debugging target from which you want to detach.

#### Returns

- Promise\<void\>
  Chrome 96+

  Resolves once the detach operation succeeds or fails. The promise resolves with no value. If the detach fails, the promise will be rejected.

### getTargets()

```typescript
chrome.debugger.getTargets(): Promise<https://developer.chrome.com/docs/extensions/reference/api/debugger#type-TargetInfo[]>
```

Returns the list of available debug targets.

#### Returns

- Promise\<[TargetInfo](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-TargetInfo)\[\]\>
  Chrome 96+

### sendCommand()

```typescript
chrome.debugger.sendCommand(
  target: DebuggerSession,
  method: string,
  commandParams?: object,
): Promise<object | undefined>
```

Sends given command to the debugging target.

#### Parameters

- target [DebuggerSession](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-DebuggerSession)

  Debugging target to which you want to send the command.
- method string

  Method name. Should be one of the methods defined by the [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol).
- commandParams object optional

  JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.

#### Returns

- Promise\<object \| undefined\>
  Chrome 96+

  Response body. If an error occurs while posting the message, the promise will be rejected.

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

  - source [Debuggee](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-Debuggee)
  - reason [DetachReason](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-DetachReason)

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

  - source [DebuggerSession](https://developer.chrome.com/docs/extensions/reference/api/debugger#type-DebuggerSession)
  - method string
  - params object optional

<br />