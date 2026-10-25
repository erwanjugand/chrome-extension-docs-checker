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

<br />

To use the `browser.alarms` API, declare the `"alarms"` permission in the [manifest](https://developer.chrome.com/docs/extensions/reference/manifest):

    {
      "name": "My extension",
      ...
      "permissions": [
        "alarms"
      ],
      ...
    }

## Concepts and usage

To ensure reliable behavior, it is helpful to understand how the API behaves.

### Device sleep

Alarms continue to run while a device is sleeping. However, an alarm will not
wake up a device. When the device wakes up, any missed alarms will fire.
Repeating alarms will fire at most once and then be rescheduled using the
specified period starting from when the device wakes, not taking into account
any time that has already elapsed since the alarm was originally set to run.

### Persistence

You can control the persistence of an alarm at creation time using the [`persistAcrossSessions`](https://developer.chrome.com/docs/extensions/reference/api/alarms#property-Alarm-persistAcrossSessions) flag. This can be set to `true` (persists until the extension updates) or `false` (cleared if the extension is reloaded or the browser restarts, and whenever the extension updates).

#### Other browsers and earlier versions of Chrome

This property is not supported in other browsers ([issue](https://github.com/w3c/webextensions/issues/406)) or in versions of Chrome before Chrome 150, where the behavior can be unpredictable. Consequently, it is best to make sure important alarms exists each time your service worker starts up. For example:

    async function checkAlarmState() {
      const alarm = await browser.alarms.get("my-alarm");

      if (!alarm) {
        await browser.alarms.create("my-alarm", { periodInMinutes: 1 });
      }
    }

    checkAlarmState();

If your alarm is created dynamically based on user action, you may want to store that an alarm was created elsewhere so you know to recreate it if needed.

## Examples

The following examples show how to use and respond to an alarm. To try this API,
install the [Alarm API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/alarms) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples)
repository.

### Set an alarm

The following example sets an alarm in the service worker when a new version of the extension is installed:

service-worker.js:

    browser.runtime.onInstalled.addListener(async ({ reason }) => {
      // Create an alarm so we have something to look at in the demo
      await browser.alarms.create('demo-default-alarm', {
        delayInMinutes: 1,
        periodInMinutes: 1,
        persistAcrossSessions: true
      });
    });

### Respond to an alarm

The following example sets the [action toolbar icon](https://developer.chrome.com/docs/extensions/reference/api/action#icon) based on the name of the alarm that went off.

service-worker.js:

    browser.alarms.onAlarm.addListener((alarm) => {
      browser.action.setIcon({
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

```typescript
chrome.alarms.clear(
  name?: string,
): Promise<boolean>
```

Clears the alarm with the given name.

#### Parameters

- name string optional

  The name of the alarm to clear. Defaults to the empty string.

#### Returns

- Promise\<boolean\>
  Chrome 91+

### clearAll()

```typescript
chrome.alarms.clearAll(): Promise<boolean | undefined>
```

Clears all alarms.

#### Returns

- Promise\<boolean \| undefined\>
  Chrome 91+

### create()

```typescript
chrome.alarms.create(
  name?: string,
  alarmInfo: AlarmCreateInfo,
): Promise<void>
```

Creates an alarm. Near the time(s) specified by `alarmInfo`, the `onAlarm` event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.

In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 30 seconds but may delay them an arbitrary amount more. That is, setting `delayInMinutes` or `periodInMinutes` to less than `0.5` will not be honored and will cause a warning. `when` can be set to less than 30 seconds after "now" without warning but won't actually cause the alarm to fire for at least 30 seconds.

To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.

#### Parameters

- name string optional

  Optional name to identify this alarm. Defaults to the empty string.
- alarmInfo [AlarmCreateInfo](https://developer.chrome.com/docs/extensions/reference/api/alarms#type-AlarmCreateInfo)

  Describes when the alarm should fire. The initial time must be specified by either `when` or `delayInMinutes` (but not both). If `periodInMinutes` is set, the alarm will repeat every `periodInMinutes` minutes after the initial event. If neither `when` or `delayInMinutes` is set for a repeating alarm, `periodInMinutes` is used as the default for `delayInMinutes`.

#### Returns

- Promise\<void\>
  Chrome 111+

  Promise that resolves when the alarm has been created.

### get()

```typescript
chrome.alarms.get(
  name?: string,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/alarms#type-Alarm | undefined>
```

Retrieves details about the specified alarm.

#### Parameters

- name string optional

  The name of the alarm to get. Defaults to the empty string.

#### Returns

- Promise\<[Alarm](https://developer.chrome.com/docs/extensions/reference/api/alarms#type-Alarm) \| undefined\>
  Chrome 91+

### getAll()

```typescript
chrome.alarms.getAll(): Promise<https://developer.chrome.com/docs/extensions/reference/api/alarms#type-Alarm[]>
```

Gets an array of all the alarms.

#### Returns

- Promise\<[Alarm](https://developer.chrome.com/docs/extensions/reference/api/alarms#type-Alarm)\[\]\>
  Chrome 91+

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

  - alarm [Alarm](https://developer.chrome.com/docs/extensions/reference/api/alarms#type-Alarm)

<br />