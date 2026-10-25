<br />

<br />

## Description

The Desktop Capture API captures the content of the screen, individual windows, or individual tabs.

<br />

<br />

## Permissions

`desktopCapture`  

<br />

<br />

<br />

<br />

## Types

### DesktopCaptureSourceType

Enum used to define set of desktop media sources used in chooseDesktopMedia().

#### Enum

"screen"   
"window"   
"tab"   
"audio"   

<br />

### SelfCapturePreferenceEnum

Chrome 107+

Mirrors [SelfCapturePreferenceEnum](https://w3c.github.io/mediacapture-screen-share/#dom-selfcapturepreferenceenum).

#### Enum

"include"   
"exclude"   

<br />

### SystemAudioPreferenceEnum

Chrome 105+

Mirrors [SystemAudioPreferenceEnum](https://w3c.github.io/mediacapture-screen-share/#dom-systemaudiopreferenceenum).

#### Enum

"include"   
"exclude"   

<br />

### WindowAudioPreferenceEnum

Chrome 140+

Mirrors [WindowAudioPreferenceEnum](https://w3c.github.io/mediacapture-screen-share/#dom-windowaudiopreferenceenum).

#### Enum

"system"   
"window"   
"exclude"   

<br />

## Methods

### cancelChooseDesktopMedia()

```typescript
chrome.desktopCapture.cancelChooseDesktopMedia(
  desktopMediaRequestId: number,
): void
```

Hides desktop media picker dialog shown by chooseDesktopMedia().

#### Parameters

- desktopMediaRequestId number

  Id returned by chooseDesktopMedia()

### chooseDesktopMedia()

```typescript
chrome.desktopCapture.chooseDesktopMedia(
  sources: DesktopCaptureSourceType[],
  targetTab?: Tab,
  callback: function,
): number
```

Shows desktop media picker UI with the specified set of sources.

#### Parameters

- sources [DesktopCaptureSourceType](https://developer.chrome.com/docs/extensions/reference/api/desktopCapture#type-DesktopCaptureSourceType)\[\]

  Set of sources that should be shown to the user. The sources order in the set decides the tab order in the picker.
- targetTab [Tab](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab) optional

  Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches `tab.url`. The tab's origin must be a secure origin, e.g. HTTPS.
- callback function


  The `callback` parameter looks like:

  ```typescript
  (streamId: string, options: object) => void
  ```

  <br />

  - streamId string

    An opaque string that can be passed to `getUserMedia()` API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty `streamId`. The created `streamId` can be used only once and expires after a few seconds when it is not used.
  - options object
    Chrome 57+

    Contains properties that describe the stream.
    - canRequestAudioTrack boolean

      True if "audio" is included in parameter sources, and the end user does not uncheck the "Share audio" checkbox. Otherwise false, and in this case, one should not ask for audio stream through getUserMedia call.

#### Returns

- number

  An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.

<br />