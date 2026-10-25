refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.alarms` API to schedule code to run periodically or at a specified time in the future.

<br />

<br />

## Permissions

`alarms`  

<br />

<br />

## Manifest

To use the `chrome.alarms` API, declare the `"alarms"` permission in the [manifest](https://developer.chrome.com/docs/extensions/mv3/manifest):

    {
      "name": "My extension",
      ...
      "permissions": [
        "alarms"
      ],
      ...
    }

## Examples

The following examples show how to use and respond to an alarm. To try this API,
install the [Alarm API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/alarms) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples)
repository.

### Set an alarm

The following example sets an alarm in the service worker when the extension is installed:

service-worker.js:

    chrome.runtime.onInstalled.addListener(async ({ reason }) => {
      if (reason !== 'install') {
        return;
      }

      // Create an alarm so we have something to look at in the demo
      await chrome.alarms.create('demo-default-alarm', {
        delayInMinutes: 1,
        periodInMinutes: 1
      });
    });

> [!NOTE]
> **Note:** Starting in Chrome 117, the number of active alarms is limited to 500. Once this limit is reached, `chrome.alarms.create()` will fail. When using a callback, [`chrome.runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/reference/runtime#property-lastError) will be set. When using promises, the promise will be rejected.

### Respond to an alarm

The following example sets the [action toolbar icon](https://developer.chrome.com/docs/extensions/reference/action#icon) based on the name of the alarm that went off.

service-worker.js:

    chrome.alarms.onAlarm.addListener((alarm) => {
      chrome.action.setIcon({
        path: getIconPath(alarm.name),
      });
    });

<br />

## Types

### Alarm

#### Properties

- name string

  Name of this alarm.
- periodInMinutes number optional

  If not null, the alarm is a repeating alarm and will fire again in `periodInMinutes` minutes.
- persistAcrossSessions boolean
  Chrome 150+

  Whether the alarm should persist across sessions (browser restarts).
- scheduledTime number

  Time at which this alarm was scheduled to fire, in milliseconds past the epoch (e.g. `Date.now() + n`). For performance reasons, the alarm may have been delayed an arbitrary amount beyond this.

### AlarmCreateInfo

#### Properties

- delayInMinutes number optional

  Length of time in minutes after which the `onAlarm` event should fire.
- name string optional
  Chrome 152+

  Name of this alarm.
- periodInMinutes number optional

  If set, the onAlarm event should fire every `periodInMinutes` minutes after the initial event specified by `when` or `delayInMinutes`. If not set, the alarm will only fire once.
- persistAcrossSessions boolean optional
  Chrome 150+

  Whether the alarm should persist across sessions (browser restarts). In Chrome, this defaults to true to match historical behavior, but you should set this explicitly to maximize compatibility across browsers.
- when number optional

  Time at which the alarm should fire, in milliseconds past the epoch (e.g. `Date.now() + n`).

## Methods

### clear()

Promise

```typescript
chrome.alarms.clear(
  name?: string,
  callback?: function,
): Promise<boolean>
```

Clears the alarm with the given name.

#### Parameters

- name string optional

  The name of the alarm to clear. Defaults to the empty string.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (wasCleared: boolean) => void
  ```

  <br />

  - wasCleared boolean

#### Returns

- Promise\<boolean\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### clearAll()

Promise

```typescript
chrome.alarms.clearAll(
  callback?: function,
): Promise<boolean | undefined>
```

Clears all alarms.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (wasCleared?: boolean) => void
  ```

  <br />

  - wasCleared boolean optional

#### Returns

- Promise\<boolean \| undefined\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### create()

Promise

```typescript
chrome.alarms.create(
  name?: string,
  alarmInfo: AlarmCreateInfo,
  callback?: function,
): Promise<void>
```

Creates an alarm. Near the time(s) specified by `alarmInfo`, the `onAlarm` event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.

In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 30 seconds but may delay them an arbitrary amount more. That is, setting `delayInMinutes` or `periodInMinutes` to less than `0.5` will not be honored and will cause a warning. `when` can be set to less than 30 seconds after "now" without warning but won't actually cause the alarm to fire for at least 30 seconds.

To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.

#### Parameters

- name string optional

  Optional name to identify this alarm. Defaults to the empty string.
- alarmInfo [AlarmCreateInfo](https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-AlarmCreateInfo)

  Describes when the alarm should fire. The initial time must be specified by either `when` or `delayInMinutes` (but not both). If `periodInMinutes` is set, the alarm will repeat every `periodInMinutes` minutes after the initial event. If neither `when` or `delayInMinutes` is set for a repeating alarm, `periodInMinutes` is used as the default for `delayInMinutes`.
- callback function optional
  Chrome 111+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 111+

  Promise that resolves when the alarm has been created.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### get()

Promise

```typescript
chrome.alarms.get(
  name?: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-Alarm | undefined>
```

Retrieves details about the specified alarm.

#### Parameters

- name string optional

  The name of the alarm to get. Defaults to the empty string.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (alarm?: Alarm) => void
  ```

  <br />

  - alarm [Alarm](https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-Alarm) optional

#### Returns

- Promise\<[Alarm](https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-Alarm) \| undefined\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getAll()

Promise

```typescript
chrome.alarms.getAll(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-Alarm[]>
```

Gets an array of all the alarms.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (alarms: Alarm[]) => void
  ```

  <br />

  - alarms [Alarm](https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-Alarm)\[\]

#### Returns

- Promise\<[Alarm](https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-Alarm)\[\]\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onAlarm

```typescript
chrome.alarms.onAlarm.addListener(
  callback: function,
)
```

Fired when an alarm has elapsed. Useful for event pages.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (alarm: Alarm) => void
  ```

  <br />

  - alarm [Alarm](https://developer.chrome.com/docs/extensions/mv2/reference/alarms#type-Alarm)

<br />