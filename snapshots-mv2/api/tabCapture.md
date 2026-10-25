refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.tabCapture` API to interact with tab media streams.

<br />

<br />

## Permissions

`tabCapture`  

<br />

> [!CAUTION]
> This permission [triggers a warning](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings#permissions_with_warnings).

<br />

<br />

## Overview

The chrome.tabCapture API allows you to access a [MediaStream](https://developer.mozilla.org/docs/Web/API/MediaStream) containing video and
audio of the current tab. It can only be called after the user invokes an extension, such as by
clicking the extension's [action button](https://developer.chrome.com/docs/extensions/mv3/user_interface#action). This is similar to the behavior of the
[activeTab](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab) permission.

## Preserving system audio

When a [MediaStream](https://developer.mozilla.org/docs/Web/API/MediaStream) is obtained for a tab, audio in that tab will no longer be played
to the user. This is similar to the behavior of the [`getDisplayMedia()`](https://developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia) function when
the [`suppressLocalAudioPlayback`](https://developer.mozilla.org/docs/Web/API/MediaTrackSupportedConstraints/suppressLocalAudioPlayback) flag is set to true.

To continue playing audio to the user, use the following:

    const output = new AudioContext();
    const source = output.createMediaStreamSource(stream);
    source.connect(output.destination);

This creates a new `AudioContext` and connects the audio of the tab's `MediaStream` to the default
destination.

## Stream IDs

Calling [chrome.tabCapture.getMediaStreamId](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#method-getMediaStreamId) will return a stream ID. To later
access a [MediaStream](https://developer.mozilla.org/docs/Web/API/MediaStream) from the ID, use the following:

    navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: id,
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: id,
        },
      },
    });

### Usage restrictions

After calling [`getMediaStreamId()`](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#method-getMediaStreamId), there are restrictions on where the
returned stream ID can be used:

- If `consumerTabId` is specified, the ID can be used by a `getUserMedia()` call in any frame in the given tab which has the same security origin.
- When this is not specified, beginning in Chrome 116, the ID can be used in any frame with the same security origin in the same render process as the caller. This means that a stream ID obtained in a service worker can be used in an [offscreen document](https://developer.chrome.com/docs/extensions/reference/offscreen).

Prior to Chrome 116, when a `consumerTabId` was not specified, the stream ID was restricted to both
the security origin, render process and render frame of the caller.

## Learn more

To learn more about how to use the `chrome.tabCapture` API, see
[Audio recording and screen capture](https://developer.chrome.com/docs/extensions/mv3/screen_capture). This demonstrates how to use
`tabCapture` and related APIs to solve a number of common use cases.

<br />

## Types

### CaptureInfo

#### Properties

- fullscreen boolean

  Whether an element in the tab being captured is in fullscreen mode.
- status [TabCaptureState](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-TabCaptureState)

  The new capture status of the tab.
- tabId number

  The id of the tab whose status changed.

### CaptureOptions

#### Properties

- audio boolean optional
- audioConstraints [MediaStreamConstraint](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-MediaStreamConstraint) optional
- video boolean optional
- videoConstraints [MediaStreamConstraint](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-MediaStreamConstraint) optional

### GetMediaStreamOptions

Chrome 71+

#### Properties

- consumerTabId number optional

  Optional tab id of the tab which will later invoke `getUserMedia()` to consume the stream. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches the consumber tab's origin. The tab's origin must be a secure origin, e.g. HTTPS.
- targetTabId number optional

  Optional tab id of the tab which will be captured. If not specified then the current active tab will be selected. Only tabs for which the extension has been granted the `activeTab` permission can be used as the target tab.

### MediaStreamConstraint

#### Properties

- mandatory object
- optional object optional

### TabCaptureState

#### Enum

"pending"   
"active"   
"stopped"   
"error"   

<br />

## Methods

### capture()

Foreground only

```typescript
chrome.tabCapture.capture(
  options: CaptureOptions,
  callback: function,
): void
```

Captures the visible area of the currently active tab. Capture can only be started on the currently active tab after the extension has been *invoked* , similar to the way that [activeTab](https://developer.chrome.com/docs/extensions/activeTab#invoking-activeTab) works. Capture is maintained across page navigations within the tab, and stops when the tab is closed, or the media stream is closed by the extension.

#### Parameters

- options [CaptureOptions](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-CaptureOptions)

  Configures the returned media stream.
- callback function


  The `callback` parameter looks like:

  ```typescript
  (stream: LocalMediaStream) => void
  ```

  <br />

  - stream LocalMediaStream

### getCapturedTabs()

Promise

```typescript
chrome.tabCapture.getCapturedTabs(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-CaptureInfo[]>
```

Returns a list of tabs that have requested capture or are being captured, i.e. status != stopped and status != error. This allows extensions to inform the user that there is an existing tab capture that would prevent a new tab capture from succeeding (or to prevent redundant requests for the same tab).

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: CaptureInfo[]) => void
  ```

  <br />

  - result [CaptureInfo](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-CaptureInfo)\[\]

#### Returns

- Promise\<[CaptureInfo](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-CaptureInfo)\[\]\>
  Chrome 116+

  Returns a Promise which resolves with CaptureInfo\[\] for captured tabs.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getMediaStreamId()

Promise Chrome 71+

```typescript
chrome.tabCapture.getMediaStreamId(
  options?: GetMediaStreamOptions,
  callback?: function,
): Promise<string>
```

Creates a stream ID to capture the target tab. Similar to chrome.tabCapture.capture() method, but returns a media stream ID, instead of a media stream, to the consumer tab.

#### Parameters

- options [GetMediaStreamOptions](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-GetMediaStreamOptions) optional
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (streamId: string) => void
  ```

  <br />

  - streamId string

#### Returns

- Promise\<string\>
  Chrome 116+

  Returns a Promise which resolves with the result. If successful, the result is an opaque string that can be passed to the `getUserMedia()` API to generate a media stream that corresponds to the target tab. The created `streamId` can only be used once and expires after a few seconds if it is not used.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onStatusChanged

```typescript
chrome.tabCapture.onStatusChanged.addListener(
  callback: function,
)
```

Event fired when the capture status of a tab changes. This allows extension authors to keep track of the capture status of tabs to keep UI elements like page actions in sync.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (info: CaptureInfo) => void
  ```

  <br />

  - info [CaptureInfo](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture#type-CaptureInfo)

<br />