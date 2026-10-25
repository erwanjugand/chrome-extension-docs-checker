<br />

<br />

## Description

Use the `chrome.idle` API to detect when the machine's idle state changes.

<br />

<br />

## Permissions

`idle`  

<br />

You must declare the `"idle"` permission in your extension's manifest to use the idle API. For
example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "idle"
      ],
      ...
    }

<br />

<br />

<br />

## Types

### IdleState

Chrome 44+

#### Enum

"active"   
"idle"   
"locked"   

<br />

## Methods

### getAutoLockDelay()

Chrome 73+ ChromeOS only

```typescript
chrome.idle.getAutoLockDelay(): Promise<number>
```

Gets the time, in seconds, it takes until the screen is locked automatically while idle. Returns a zero duration if the screen is never locked automatically. Currently supported on Chrome OS only.

#### Returns

- Promise\<number\>
  Chrome 116+

### queryState()

```typescript
chrome.idle.queryState(
  detectionIntervalInSeconds: number,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/idle#type-IdleState>
```

Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.

#### Parameters

- detectionIntervalInSeconds number

  The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.

#### Returns

- Promise\<[IdleState](https://developer.chrome.com/docs/extensions/reference/api/idle#type-IdleState)\>
  Chrome 116+

### setDetectionInterval()

```typescript
chrome.idle.setDetectionInterval(
  intervalInSeconds: number,
): void
```

Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.

#### Parameters

- intervalInSeconds number

  Threshold, in seconds, used to determine when the system is in an idle state.

## Events

### onStateChanged

```typescript
chrome.idle.onStateChanged.addListener(
  callback: function,
)
```

Fired when the system changes to an active, idle or locked state. The event fires with "locked" if the screen is locked or the screensaver activates, "idle" if the system is unlocked and the user has not generated any input for a specified number of seconds, and "active" when the user generates input on an idle system.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (newState: IdleState) => void
  ```

  <br />

  - newState [IdleState](https://developer.chrome.com/docs/extensions/reference/api/idle#type-IdleState)

<br />