<br />

<br />

## Description

Use the `chrome.sessions` API to query and restore tabs and windows from a browsing session.

<br />

<br />

## Permissions

`sessions`  

<br />

<br />

<br />

<br />

## Types

### Device

#### Properties

- deviceName string

  The name of the foreign device.
- sessions [Session](https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Session)\[\]

  A list of open window sessions for the foreign device, sorted from most recently to least recently modified session.

### Filter

#### Properties

- maxResults number optional

  The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries ([`sessions.MAX_SESSION_RESULTS`](https://developer.chrome.com/docs/extensions/reference/api/sessions#property-MAX_SESSION_RESULTS)).

### Session

#### Properties

- lastModified number

  The time when the window or tab was closed or modified, represented in seconds since the epoch.
- tab [Tab](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab) optional

  The [`tabs.Tab`](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab), if this entry describes a tab. Either this or [`sessions.Session.window`](https://developer.chrome.com/docs/extensions/reference/api/sessions#property-Session-window) will be set.
- window [Window](https://developer.chrome.com/docs/extensions/reference/windows/#type-Window) optional

  The [`windows.Window`](https://developer.chrome.com/docs/extensions/reference/windows/#type-Window), if this entry describes a window. Either this or [`sessions.Session.tab`](https://developer.chrome.com/docs/extensions/reference/api/sessions#property-Session-tab) will be set.

## Properties

### MAX_SESSION_RESULTS

The maximum number of [`sessions.Session`](https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Session) that will be included in a requested list.

#### Value

25   

## Methods

### getDevices()

```typescript
chrome.sessions.getDevices(
  filter?: Filter,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Device[]>
```

Retrieves all devices with synced sessions.

#### Parameters

- filter [Filter](https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Filter) optional

#### Returns

- Promise\<[Device](https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Device)\[\]\>
  Chrome 96+

### getRecentlyClosed()

```typescript
chrome.sessions.getRecentlyClosed(
  filter?: Filter,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Session[]>
```

Gets the list of recently closed tabs and/or windows.

#### Parameters

- filter [Filter](https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Filter) optional

#### Returns

- Promise\<[Session](https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Session)\[\]\>
  Chrome 96+

### restore()

```typescript
chrome.sessions.restore(
  sessionId?: string,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Session>
```

Reopens a [`windows.Window`](https://developer.chrome.com/docs/extensions/reference/windows/#type-Window) or [`tabs.Tab`](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab), with an optional callback to run when the entry has been restored.

#### Parameters

- sessionId string optional

  The [`windows.Window.sessionId`](https://developer.chrome.com/docs/extensions/reference/windows/#property-Window-sessionId), or [`tabs.Tab.sessionId`](https://developer.chrome.com/docs/extensions/reference/tabs/#property-Tab-sessionId) to restore. If this parameter is not specified, the most recently closed session is restored.

#### Returns

- Promise\<[Session](https://developer.chrome.com/docs/extensions/reference/api/sessions#type-Session)\>
  Chrome 96+

## Events

### onChanged

```typescript
chrome.sessions.onChanged.addListener(
  callback: function,
)
```

Fired when recently closed tabs and/or windows are changed. This event does not monitor synced sessions changes.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

<br />