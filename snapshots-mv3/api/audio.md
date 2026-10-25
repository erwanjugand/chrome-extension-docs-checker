<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

The `chrome.audio` API is provided to allow users to get information about and control the audio devices attached to the system. This API is currently only available in kiosk mode for ChromeOS.

<br />

<br />

## Permissions

`audio`  

<br />

<br />

## Availability

Chrome 59+ ChromeOS only

<br />

<br />

## Types

### AudioDeviceInfo

#### Properties

- deviceName string

  Device name.
- deviceType [DeviceType](https://developer.chrome.com/docs/extensions/reference/api/audio#type-DeviceType)

  Type of the device.
- displayName string

  The user-friendly name (e.g. "USB Microphone").
- id string

  The unique identifier of the audio device.
- isActive boolean

  True if this is the current active device.
- level number

  The sound level of the device, volume for output, gain for input.
- stableDeviceId string optional

  The stable/persisted device id string when available.
- streamType [StreamType](https://developer.chrome.com/docs/extensions/reference/api/audio#type-StreamType)

  Stream type associated with this device.

### DeviceFilter

#### Properties

- isActive boolean optional

  If set, only audio devices whose active state matches this value will satisfy the filter.
- streamTypes [StreamType](https://developer.chrome.com/docs/extensions/reference/api/audio#type-StreamType)\[\] optional

  If set, only audio devices whose stream type is included in this list will satisfy the filter.

### DeviceIdLists

#### Properties

- input string\[\] optional

  List of input devices specified by their ID.

  To indicate input devices should be unaffected, leave this property unset.
- output string\[\] optional

  List of output devices specified by their ID.

  To indicate output devices should be unaffected, leave this property unset.

### DeviceProperties

#### Properties

- level number optional

  The audio device's desired sound level. Defaults to the device's current sound level.

  If used with audio input device, represents audio device gain.

  If used with audio output device, represents audio device volume.

### DeviceType

Available audio device types.

#### Enum

"HEADPHONE"   
"MIC"   
"USB"   
"BLUETOOTH"   
"HDMI"   
"INTERNAL_SPEAKER"   
"INTERNAL_MIC"   
"FRONT_MIC"   
"REAR_MIC"   
"KEYBOARD_MIC"   
"HOTWORD"   
"LINEOUT"   
"POST_MIX_LOOPBACK"   
"POST_DSP_LOOPBACK"   
"ALSA_LOOPBACK"   
"OTHER"   

<br />

### LevelChangedEvent

#### Properties

- deviceId string

  ID of device whose sound level has changed.
- level number

  The device's new sound level.

### MuteChangedEvent

#### Properties

- isMuted boolean

  Whether or not the stream is now muted.
- streamType [StreamType](https://developer.chrome.com/docs/extensions/reference/api/audio#type-StreamType)

  The type of the stream for which the mute value changed. The updated mute value applies to all devices with this stream type.

### StreamType

Type of stream an audio device provides.

#### Enum

"INPUT"   
"OUTPUT"   

<br />

## Methods

### getDevices()

```typescript
chrome.audio.getDevices(
  filter?: DeviceFilter,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/audio#type-AudioDeviceInfo[]>
```

Gets a list of audio devices filtered based on `filter`.

#### Parameters

- filter [DeviceFilter](https://developer.chrome.com/docs/extensions/reference/api/audio#type-DeviceFilter) optional

  Device properties by which to filter the list of returned audio devices. If the filter is not set or set to `{}`, returned device list will contain all available audio devices.

#### Returns

- Promise\<[AudioDeviceInfo](https://developer.chrome.com/docs/extensions/reference/api/audio#type-AudioDeviceInfo)\[\]\>
  Chrome 116+

  Reports the requested list of audio devices.

### getMute()

```typescript
chrome.audio.getMute(
  streamType: StreamType,
): Promise<boolean>
```

Gets the system-wide mute state for the specified stream type.

#### Parameters

- streamType [StreamType](https://developer.chrome.com/docs/extensions/reference/api/audio#type-StreamType)

  Stream type for which mute state should be fetched.

#### Returns

- Promise\<boolean\>
  Chrome 116+

  Promise that resolves with a boolean indicating whether mute is set or not for specified stream type.

### setActiveDevices()

```typescript
chrome.audio.setActiveDevices(
  ids: DeviceIdLists,
): Promise<void>
```

Sets lists of active input and/or output devices.

#### Parameters

- ids [DeviceIdLists](https://developer.chrome.com/docs/extensions/reference/api/audio#type-DeviceIdLists)

  Specifies IDs of devices that should be active. If either the input or output list is not set, devices in that category are unaffected.

  It is an error to pass in a non-existent device ID.

#### Returns

- Promise\<void\>
  Chrome 116+

### setMute()

```typescript
chrome.audio.setMute(
  streamType: StreamType,
  isMuted: boolean,
): Promise<void>
```

Sets mute state for a stream type. The mute state will apply to all audio devices with the specified audio stream type.

#### Parameters

- streamType [StreamType](https://developer.chrome.com/docs/extensions/reference/api/audio#type-StreamType)

  Stream type for which mute state should be set.
- isMuted boolean

  New mute value.

#### Returns

- Promise\<void\>
  Chrome 116+

### setProperties()

```typescript
chrome.audio.setProperties(
  id: string,
  properties: DeviceProperties,
): Promise<void>
```

Sets the properties for the input or output device.

#### Parameters

- id string
- properties [DeviceProperties](https://developer.chrome.com/docs/extensions/reference/api/audio#type-DeviceProperties)

#### Returns

- Promise\<void\>
  Chrome 116+

## Events

### onDeviceListChanged

```typescript
chrome.audio.onDeviceListChanged.addListener(
  callback: function,
)
```

Fired when audio devices change, either new devices being added, or existing devices being removed.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (devices: AudioDeviceInfo[]) => void
  ```

  <br />

  - devices [AudioDeviceInfo](https://developer.chrome.com/docs/extensions/reference/api/audio#type-AudioDeviceInfo)\[\]

### onLevelChanged

```typescript
chrome.audio.onLevelChanged.addListener(
  callback: function,
)
```

Fired when sound level changes for an active audio device.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (event: LevelChangedEvent) => void
  ```

  <br />

  - event [LevelChangedEvent](https://developer.chrome.com/docs/extensions/reference/api/audio#type-LevelChangedEvent)

### onMuteChanged

```typescript
chrome.audio.onMuteChanged.addListener(
  callback: function,
)
```

Fired when the mute state of the audio input or output changes. Note that mute state is system-wide and the new value applies to every audio device with specified stream type.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (event: MuteChangedEvent) => void
  ```

  <br />

  - event [MuteChangedEvent](https://developer.chrome.com/docs/extensions/reference/api/audio#type-MuteChangedEvent)

<br />