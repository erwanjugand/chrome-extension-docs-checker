<br />

<br />

## Description

Use the `chrome.notifications` API to create rich notifications using templates and show these notifications to users in the system tray.

<br />

<br />

## Permissions

`notifications`  

<br />

<br />

<br />

<br />

## Types

### NotificationBitmap

### NotificationButton

#### Properties

- iconUrl string optional
  Deprecated since Chrome 59

  Button icons not visible for Mac OS X users.

  <br />

- title string

### NotificationItem

#### Properties

- message string

  Additional details about this item.
- title string

  Title of one item of a list notification.

### NotificationOptions

#### Properties

- appIconMaskUrl string optional
  Deprecated since Chrome 59

  The app icon mask is not visible for Mac OS X users.

  <br />

  A URL to the app icon mask. URLs have the same restrictions as [iconUrl](https://developer.chrome.com/docs/extensions/reference/api/notifications#property-NotificationOptions-iconUrl).

  The app icon mask should be in alpha channel, as only the alpha channel of the image will be considered.
- buttons [NotificationButton](https://developer.chrome.com/docs/extensions/reference/api/notifications#type-NotificationButton)\[\] optional

  Text and icons for up to two notification action buttons.
- contextMessage string optional

  Alternate notification content with a lower-weight font.
- eventTime number optional

  A timestamp associated with the notification, in milliseconds past the epoch (e.g. `Date.now() + n`).
- iconUrl string optional

  A URL to the sender's avatar, app icon, or a thumbnail for image notifications.

  URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file

  \*\*Note:\*\*This value is required for the [`notifications.create`](https://developer.chrome.com/docs/extensions/reference/api/notifications#method-create)`()` method.
- imageUrl string optional
  Deprecated since Chrome 59

  The image is not visible for Mac OS X users.

  <br />

  A URL to the image thumbnail for image-type notifications. URLs have the same restrictions as [iconUrl](https://developer.chrome.com/docs/extensions/reference/api/notifications#property-NotificationOptions-iconUrl).
- isClickable boolean optional
  Deprecated since Chrome 67

  This UI hint is ignored as of Chrome 67

  <br />

- items [NotificationItem](https://developer.chrome.com/docs/extensions/reference/api/notifications#type-NotificationItem)\[\] optional

  Items for multi-item notifications. Users on Mac OS X only see the first item.
- message string optional

  Main notification content.

  \*\*Note:\*\*This value is required for the [`notifications.create`](https://developer.chrome.com/docs/extensions/reference/api/notifications#method-create)`()` method.
- priority number optional

  Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default. On platforms that don't support a notification center (Windows, Linux \& Mac), -2 and -1 result in an error as notifications with those priorities will not be shown at all.
- progress number optional

  Current progress ranges from 0 to 100.
- requireInteraction boolean optional
  Chrome 50+

  Indicates that the notification should remain visible on screen until the user activates or dismisses the notification. This defaults to false.
- silent boolean optional
  Chrome 70+

  Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.
- title string optional

  Title of the notification (e.g. sender name for email).

  \*\*Note:\*\*This value is required for the [`notifications.create`](https://developer.chrome.com/docs/extensions/reference/api/notifications#method-create)`()` method.
- type [TemplateType](https://developer.chrome.com/docs/extensions/reference/api/notifications#type-TemplateType) optional

  Which type of notification to display. *Required for [`notifications.create`](https://developer.chrome.com/docs/extensions/reference/api/notifications#method-create)* method.

### PermissionLevel

#### Enum

"granted"   
Specifies that the user has elected to show notifications from the app or extension. This is the default at install time.
"denied"   
Specifies that the user has elected not to show notifications from the app or extension.

<br />

### TemplateType

#### Enum

"basic"   
Contains an icon, title, message, expandedMessage, and up to two buttons.
"image"   
Contains an icon, title, message, expandedMessage, image, and up to two buttons.
"list"   
Contains an icon, title, message, items, and up to two buttons. Users on Mac OS X only see the first item.
"progress"   
Contains an icon, title, message, progress, and up to two buttons.

<br />

## Methods

### clear()

```typescript
chrome.notifications.clear(
  notificationId: string,
): Promise<boolean>
```

Clears the specified notification.

#### Parameters

- notificationId string

  The id of the notification to be cleared. This is returned by [`notifications.create`](https://developer.chrome.com/docs/extensions/reference/api/notifications#method-create) method.

#### Returns

- Promise\<boolean\>
  Chrome 116+

  Returns a Promise which resolves to indicate whether a matching notification existed.

### create()

```typescript
chrome.notifications.create(
  notificationId?: string,
  options: NotificationOptions,
): Promise<string>
```

Creates and displays a notification.

#### Parameters

- notificationId string optional

  Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation. The identifier may not be longer than 500 characters.

  The `notificationId` parameter is required before Chrome 42.
- options [NotificationOptions](https://developer.chrome.com/docs/extensions/reference/api/notifications#type-NotificationOptions)

  Contents of the notification.

#### Returns

- Promise\<string\>
  Chrome 116+

  Returns a Promise which resolves with the notification id (either supplied or generated) that represents the created notification.

### getAll()

```typescript
chrome.notifications.getAll(): Promise<object>
```

Retrieves all the notifications of this app or extension.

#### Returns

- Promise\<object\>
  Chrome 116+

  Returns a Promise which resolves with the set of notification_ids currently in the system.

### getPermissionLevel()

```typescript
chrome.notifications.getPermissionLevel(): Promise<https://developer.chrome.com/docs/extensions/reference/api/notifications#type-PermissionLevel>
```

Retrieves whether the user has enabled notifications from this app or extension.

#### Returns

- Promise\<[PermissionLevel](https://developer.chrome.com/docs/extensions/reference/api/notifications#type-PermissionLevel)\>
  Chrome 116+

  Returns a Promise which resolves with the current permission level.

### update()

```typescript
chrome.notifications.update(
  notificationId: string,
  options: NotificationOptions,
): Promise<boolean>
```

Updates an existing notification.

#### Parameters

- notificationId string

  The id of the notification to be updated. This is returned by [`notifications.create`](https://developer.chrome.com/docs/extensions/reference/api/notifications#method-create) method.
- options [NotificationOptions](https://developer.chrome.com/docs/extensions/reference/api/notifications#type-NotificationOptions)

  Contents of the notification to update to.

#### Returns

- Promise\<boolean\>
  Chrome 116+

  Returns a Promise which resolves to indicate whether a matching notification existed.

## Events

### onButtonClicked

```typescript
chrome.notifications.onButtonClicked.addListener(
  callback: function,
)
```

The user pressed a button in the notification.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (notificationId: string, buttonIndex: number) => void
  ```

  <br />

  - notificationId string
  - buttonIndex number

### onClicked

```typescript
chrome.notifications.onClicked.addListener(
  callback: function,
)
```

The user clicked in a non-button area of the notification.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (notificationId: string) => void
  ```

  <br />

  - notificationId string

### onClosed

```typescript
chrome.notifications.onClosed.addListener(
  callback: function,
)
```

The notification closed, either by the system or by user action.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (notificationId: string, byUser: boolean) => void
  ```

  <br />

  - notificationId string
  - byUser boolean

### onPermissionLevelChanged

```typescript
chrome.notifications.onPermissionLevelChanged.addListener(
  callback: function,
)
```

The user changes the permission level. As of Chrome 47, only ChromeOS has UI that dispatches this event.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (level: PermissionLevel) => void
  ```

  <br />

  - level [PermissionLevel](https://developer.chrome.com/docs/extensions/reference/api/notifications#type-PermissionLevel)

### onShowSettings

Deprecated since Chrome 65

```typescript
chrome.notifications.onShowSettings.addListener(
  callback: function,
)
```

Custom notification settings button is no longer supported.

<br />

The user clicked on a link for the app's notification settings. As of Chrome 47, only ChromeOS has UI that dispatches this event. As of Chrome 65, that UI has been removed from ChromeOS, too.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

<br />