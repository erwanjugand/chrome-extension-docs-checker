refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `system.display` API to query display metadata.

<br />

<br />

## Permissions

`system.display`  

<br />

<br />

<br />

<br />

## Types

### ActiveState

Chrome 117+

An enum to tell if the display is detected and used by the system. The display is considered 'inactive', if it is not detected by the system (maybe disconnected, or considered disconnected due to sleep mode, etc). This state is used to keep existing display when the all displays are disconnected, for example.

#### Enum

"active"   
"inactive"   

<br />

### Bounds

#### Properties

- height number

  The height of the display in pixels.
- left number

  The x-coordinate of the upper-left corner.
- top number

  The y-coordinate of the upper-left corner.
- width number

  The width of the display in pixels.

### DisplayLayout

Chrome 53+

#### Properties

- id string

  The unique identifier of the display.
- offset number

  The offset of the display along the connected edge. 0 indicates that the topmost or leftmost corners are aligned.
- parentId string

  The unique identifier of the parent display. Empty if this is the root.
- position [LayoutPosition](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-LayoutPosition)

  The layout position of this display relative to the parent. This will be ignored for the root.

### DisplayMode

Chrome 52+

#### Properties

- deviceScaleFactor number

  The display mode device scale factor.
- height number

  The display mode height in device independent (user visible) pixels.
- heightInNativePixels number

  The display mode height in native pixels.
- isInterlaced boolean optional
  Chrome 74+

  True if this mode is interlaced, false if not provided.
- isNative boolean

  True if the mode is the display's native mode.
- isSelected boolean

  True if the display mode is currently selected.
- refreshRate number
  Chrome 67+

  The display mode refresh rate in hertz.
- uiScale number optional
  Deprecated since Chrome 70

  Use `displayZoomFactor`

  <br />

  The display mode UI scale factor.
- width number

  The display mode width in device independent (user visible) pixels.
- widthInNativePixels number

  The display mode width in native pixels.

### DisplayProperties

#### Properties

- boundsOriginX number optional

  If set, updates the display's logical bounds origin along the x-axis. Applied together with [`boundsOriginY`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#property-DisplayProperties-boundsOriginY). Defaults to the current value if not set and [`boundsOriginY`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#property-DisplayProperties-boundsOriginY) is set. Note that when updating the display origin, some constraints will be applied, so the final bounds origin may be different than the one set. The final bounds can be retrieved using [`getInfo`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#method-getInfo). The bounds origin cannot be changed on the primary display.
- boundsOriginY number optional

  If set, updates the display's logical bounds origin along the y-axis. See documentation for [`boundsOriginX`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#property-DisplayProperties-boundsOriginX) parameter.
- displayMode [DisplayMode](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayMode) optional
  Chrome 52+

  If set, updates the display mode to the mode matching this value. If other parameters are invalid, this will not be applied. If the display mode is invalid, it will not be applied and an error will be set, but other properties will still be applied.
- displayZoomFactor number optional
  Chrome 65+

  If set, updates the zoom associated with the display. This zoom performs re-layout and repaint thus resulting in a better quality zoom than just performing a pixel by pixel stretch enlargement.
- isPrimary boolean optional

  If set to true, makes the display primary. No-op if set to false. Note: If set, the display is considered primary for all other properties (i.e. [`isUnified`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#property-DisplayProperties-isUnified) may be set and bounds origin may not).
- isUnified boolean optional
  Chrome 59+

  ChromeOS only. If set to true, changes the display mode to unified desktop (see [`enableUnifiedDesktop`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#method-enableUnifiedDesktop) for details). If set to false, unified desktop mode will be disabled. This is only valid for the primary display. If provided, mirroringSourceId must not be provided and other properties will be ignored. This is has no effect if not provided.
- mirroringSourceId string optional
  Deprecated since Chrome 68

  Use [`setMirrorMode`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#method-setMirrorMode).

  <br />

  ChromeOS only. If set and not empty, enables mirroring for this display only. Otherwise disables mirroring for all displays. This value should indicate the id of the source display to mirror, which must not be the same as the id passed to setDisplayProperties. If set, no other property may be set.
- overscan [Insets](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Insets) optional

  If set, sets the display's overscan insets to the provided values. Note that overscan values may not be negative or larger than a half of the screen's size. Overscan cannot be changed on the internal monitor.
- rotation number optional

  If set, updates the display's rotation. Legal values are \[0, 90, 180, 270\]. The rotation is set clockwise, relative to the display's vertical position.

### DisplayUnitInfo

#### Properties

- activeState [ActiveState](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-ActiveState)
  Chrome 117+

  Active if the display is detected and used by the system.
- availableDisplayZoomFactors number\[\]
  Chrome 67+

  A list of zoom factor values that can be set for the display.
- bounds [Bounds](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Bounds)

  The display's logical bounds.
- displayZoomFactor number
  Chrome 65+

  The ratio between the display's current and default zoom. For example, value 1 is equivalent to 100% zoom, and value 1.5 is equivalent to 150% zoom.
- dpiX number

  The number of pixels per inch along the x-axis.
- dpiY number

  The number of pixels per inch along the y-axis.
- edid [Edid](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Edid) optional
  Chrome 67+

  NOTE: This is only available to ChromeOS Kiosk apps.
- hasTouchSupport boolean
  Chrome 57+

  True if this display has a touch input device associated with it.
- id string

  The unique identifier of the display.
- isEnabled boolean

  True if this display is enabled.
- isPrimary boolean

  True if this is the primary display.
- isUnified boolean
  Chrome 59+

  True for all displays when in unified desktop mode. See documentation for [`enableUnifiedDesktop`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#method-enableUnifiedDesktop).
- mirroringDestinationIds string\[\]
  Chrome 64+

  ChromeOS only. Identifiers of the displays to which the source display is being mirrored. Empty if no displays are being mirrored. This will be set to the same value for all displays. This must not include `mirroringSourceId`.
- mirroringSourceId string

  ChromeOS only. Identifier of the display that is being mirrored if mirroring is enabled, otherwise empty. This will be set for all displays (including the display being mirrored).
- modes [DisplayMode](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayMode)\[\]
  Chrome 52+

  The list of available display modes. The current mode will have isSelected=true. Only available on ChromeOS. Will be set to an empty array on other platforms.
- name string

  The user-friendly name (e.g. "HP LCD monitor").
- overscan [Insets](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Insets)

  The display's insets within its screen's bounds. Currently exposed only on ChromeOS. Will be set to empty insets on other platforms.
- rotation number

  The display's clockwise rotation in degrees relative to the vertical position. Currently exposed only on ChromeOS. Will be set to 0 on other platforms. A value of -1 will be interpreted as auto-rotate when the device is in a physical tablet state.
- workArea [Bounds](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Bounds)

  The usable work area of the display within the display bounds. The work area excludes areas of the display reserved for OS, for example taskbar and launcher.

### Edid

Chrome 67+

#### Properties

- manufacturerId string

  3 character manufacturer code. See Sec. 3.4.1 page 21. Required in v1.4.
- productId string

  2 byte manufacturer-assigned code, Sec. 3.4.2 page 21. Required in v1.4.
- yearOfManufacture number

  Year of manufacturer, Sec. 3.4.4 page 22. Required in v1.4.

### GetInfoFlags

Chrome 59+

#### Properties

- singleUnified boolean optional

  If set to true, only a single [`DisplayUnitInfo`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayUnitInfo) will be returned by [`getInfo`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#method-getInfo) when in unified desktop mode (see [`enableUnifiedDesktop`](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#method-enableUnifiedDesktop)). Defaults to false.

### Insets

#### Properties

- bottom number

  The y-axis distance from the bottom bound.
- left number

  The x-axis distance from the left bound.
- right number

  The x-axis distance from the right bound.
- top number

  The y-axis distance from the top bound.

### LayoutPosition

Chrome 53+

Layout position, i.e. edge of parent that the display is attached to.

#### Enum

"top"   
"right"   
"bottom"   
"left"   

<br />

### MirrorMode

Chrome 65+

Mirror mode, i.e. different ways of how a display is mirrored to other displays.

#### Enum

"off"   
Specifies the default mode (extended or unified desktop).
"normal"   
Specifies that the default source display will be mirrored to all other displays.
"mixed"   
Specifies that the specified source display will be mirrored to the provided destination displays. All other connected displays will be extended.

<br />

### MirrorModeInfo

Chrome 65+

#### Properties

- mirroringDestinationIds string\[\] optional

  The ids of the mirroring destination displays. This is only valid for 'mixed'.
- mirroringSourceId string optional

  The id of the mirroring source display. This is only valid for 'mixed'.
- mode [MirrorMode](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-MirrorMode)

  The mirror mode that should be set.

### Point

Chrome 57+

#### Properties

- x number

  The x-coordinate of the point.
- y number

  The y-coordinate of the point.

### TouchCalibrationPair

Chrome 57+

#### Properties

- displayPoint [Point](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Point)

  The coordinates of the display point.
- touchPoint [Point](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Point)

  The coordinates of the touch point corresponding to the display point.

### TouchCalibrationPairQuad

Chrome 57+

#### Properties

- pair1 [TouchCalibrationPair](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-TouchCalibrationPair)

  First pair of touch and display point required for touch calibration.
- pair2 [TouchCalibrationPair](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-TouchCalibrationPair)

  Second pair of touch and display point required for touch calibration.
- pair3 [TouchCalibrationPair](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-TouchCalibrationPair)

  Third pair of touch and display point required for touch calibration.
- pair4 [TouchCalibrationPair](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-TouchCalibrationPair)

  Fourth pair of touch and display point required for touch calibration.

## Methods

### clearTouchCalibration()

Chrome 57+

```typescript
chrome.system.display.clearTouchCalibration(
  id: string,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Resets the touch calibration for the display and brings it back to its default state by clearing any touch calibration data associated with the display.

#### Parameters

- id string

  The display's unique identifier.

### completeCustomTouchCalibration()

Chrome 57+

```typescript
chrome.system.display.completeCustomTouchCalibration(
  pairs: TouchCalibrationPairQuad,
  bounds: Bounds,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Sets the touch calibration pairs for a display. These `pairs` would be used to calibrate the touch screen for display with `id` called in startCustomTouchCalibration(). Always call `startCustomTouchCalibration` before calling this method. If another touch calibration is already in progress this will throw an error.

#### Parameters

- pairs [TouchCalibrationPairQuad](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-TouchCalibrationPairQuad)

  The pairs of point used to calibrate the display.
- bounds [Bounds](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Bounds)

  Bounds of the display when the touch calibration was performed. `bounds.left` and `bounds.top` values are ignored.

### enableUnifiedDesktop()

Chrome 46+

```typescript
chrome.system.display.enableUnifiedDesktop(
  enabled: boolean,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Enables/disables the unified desktop feature. If enabled while mirroring is active, the desktop mode will not change until mirroring is turned off. Otherwise, the desktop mode will switch to unified immediately.

#### Parameters

- enabled boolean

  True if unified desktop should be enabled.

### getDisplayLayout()

Promise Chrome 53+

```typescript
chrome.system.display.getDisplayLayout(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayLayout[]>
```

NOTE: This is only available to ChromeOS Kiosk apps. Requests the layout info for all displays.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (layouts: DisplayLayout[]) => void
  ```

  <br />

  - layouts [DisplayLayout](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayLayout)\[\]

#### Returns

- Promise\<[DisplayLayout](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayLayout)\[\]\>
  Chrome 91+

  Promise that resolves with the results.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getInfo()

Promise

```typescript
chrome.system.display.getInfo(
  flags?: GetInfoFlags,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayUnitInfo[]>
```

Requests the information for all attached display devices.

#### Parameters

- flags [GetInfoFlags](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-GetInfoFlags) optional
  Chrome 59+

  Options affecting how the information is returned.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (displayInfo: DisplayUnitInfo[]) => void
  ```

  <br />

  - displayInfo [DisplayUnitInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayUnitInfo)\[\]

#### Returns

- Promise\<[DisplayUnitInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayUnitInfo)\[\]\>
  Chrome 91+

  Promise that resolves with the results.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### overscanCalibrationAdjust()

Chrome 53+

```typescript
chrome.system.display.overscanCalibrationAdjust(
  id: string,
  delta: Insets,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Adjusts the current overscan insets for a display. Typically this should either move the display along an axis (e.g. left+right have the same value) or scale it along an axis (e.g. top+bottom have opposite values). Each Adjust call is cumulative with previous calls since Start.

#### Parameters

- id string

  The display's unique identifier.
- delta [Insets](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-Insets)

  The amount to change the overscan insets.

### overscanCalibrationComplete()

Chrome 53+

```typescript
chrome.system.display.overscanCalibrationComplete(
  id: string,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Complete overscan adjustments for a display by saving the current values and hiding the overlay.

#### Parameters

- id string

  The display's unique identifier.

### overscanCalibrationReset()

Chrome 53+

```typescript
chrome.system.display.overscanCalibrationReset(
  id: string,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Resets the overscan insets for a display to the last saved value (i.e before Start was called).

#### Parameters

- id string

  The display's unique identifier.

### overscanCalibrationStart()

Chrome 53+

```typescript
chrome.system.display.overscanCalibrationStart(
  id: string,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Starts overscan calibration for a display. This will show an overlay on the screen indicating the current overscan insets. If overscan calibration for display `id` is in progress this will reset calibration.

#### Parameters

- id string

  The display's unique identifier.

### setDisplayLayout()

Promise Chrome 53+

```typescript
chrome.system.display.setDisplayLayout(
  layouts: DisplayLayout[],
  callback?: function,
): Promise<void>
```

NOTE: This is only available to ChromeOS Kiosk apps. Set the layout for all displays. Any display not included will use the default layout. If a layout would overlap or be otherwise invalid it will be adjusted to a valid layout. After layout is resolved, an onDisplayChanged event will be triggered.

#### Parameters

- layouts [DisplayLayout](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayLayout)\[\]

  The layout information, required for all displays except the primary display.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 91+

  Promise that resolves when the function finishes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setDisplayProperties()

Promise

```typescript
chrome.system.display.setDisplayProperties(
  id: string,
  info: DisplayProperties,
  callback?: function,
): Promise<void>
```

NOTE: This is only available to ChromeOS Kiosk apps. Updates the properties for the display specified by `id`, according to the information provided in `info`. On failure, [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/reference/runtime/#property-lastError) will be set.

#### Parameters

- id string

  The display's unique identifier.
- info [DisplayProperties](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-DisplayProperties)

  The information about display properties that should be changed. A property will be changed only if a new value for it is specified in `info`.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 91+

  Promise that resolves when the function finishes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setMirrorMode()

Promise Chrome 65+

```typescript
chrome.system.display.setMirrorMode(
  info: MirrorModeInfo,
  callback?: function,
): Promise<void>
```

NOTE: This is only available to ChromeOS Kiosk apps. Sets the display mode to the specified mirror mode. Each call resets the state from previous calls. Calling setDisplayProperties() will fail for the mirroring destination displays.

#### Parameters

- info [MirrorModeInfo](https://developer.chrome.com/docs/extensions/mv2/reference/system/display#type-MirrorModeInfo)

  The information of the mirror mode that should be applied to the display mode.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 91+

  Promise that resolves when the function finishes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### showNativeTouchCalibration()

Promise Chrome 57+

```typescript
chrome.system.display.showNativeTouchCalibration(
  id: string,
  callback?: function,
): Promise<boolean>
```

NOTE: This is only available to ChromeOS Kiosk apps. Displays the native touch calibration UX for the display with `id` as display id. This will show an overlay on the screen with required instructions on how to proceed. The callback will be invoked in case of successful calibration only. If the calibration fails, this will throw an error.

#### Parameters

- id string

  The display's unique identifier.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 91+

  Promise that resolves to inform the caller that the touch calibration has ended. The boolean value informs if the calibration was a success or not.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### startCustomTouchCalibration()

Chrome 57+

```typescript
chrome.system.display.startCustomTouchCalibration(
  id: string,
): void
```

NOTE: This is only available to ChromeOS Kiosk apps. Starts custom touch calibration for a display. This should be called when using a custom UX for collecting calibration data. If another touch calibration is already in progress this will throw an error.

#### Parameters

- id string

  The display's unique identifier.

## Events

### onDisplayChanged

```typescript
chrome.system.display.onDisplayChanged.addListener(
  callback: function,
)
```

Fired when anything changes to the display configuration.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

<br />