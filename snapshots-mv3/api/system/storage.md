<br />

<br />

## Description

Use the `chrome.system.storage` API to query storage device information and be notified when a removable storage device is attached and detached.

<br />

<br />

## Permissions

`system.storage`  

<br />

<br />

<br />

<br />

## Types

### EjectDeviceResultCode

#### Enum

"success"   
The ejection command is successful -- the application can prompt the user to remove the device.
"in_use"   
The device is in use by another application. The ejection did not succeed; the user should not remove the device until the other application is done with the device.
"no_such_device"   
There is no such device known.
"failure"   
The ejection command failed.

<br />

### StorageAvailableCapacityInfo

#### Properties

- availableCapacity number

  The available capacity of the storage device, in bytes.
- id string

  A copied `id` of getAvailableCapacity function parameter `id`.

### StorageUnitInfo

#### Properties

- capacity number

  The total amount of the storage space, in bytes.
- id string

  The transient ID that uniquely identifies the storage device. This ID will be persistent within the same run of a single application. It will not be a persistent identifier between different runs of an application, or between different applications.
- name string

  The name of the storage unit.
- type [StorageUnitType](https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-StorageUnitType)

  The media type of the storage unit.

### StorageUnitType

#### Enum

"fixed"   
The storage has fixed media, e.g. hard disk or SSD.
"removable"   
The storage is removable, e.g. USB flash drive.
"unknown"   
The storage type is unknown.

<br />

## Methods

### ejectDevice()

```typescript
chrome.system.storage.ejectDevice(
  id: string,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-EjectDeviceResultCode>
```

Ejects a removable storage device.

#### Parameters

- id string

#### Returns

- Promise\<[EjectDeviceResultCode](https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-EjectDeviceResultCode)\>
  Chrome 91+

### getAvailableCapacity()

Dev channel

```typescript
chrome.system.storage.getAvailableCapacity(
  id: string,
): Promise<https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-StorageAvailableCapacityInfo>
```

Get the available capacity of a specified `id` storage device. The `id` is the transient device ID from StorageUnitInfo.

#### Parameters

- id string

#### Returns

- Promise\<[StorageAvailableCapacityInfo](https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-StorageAvailableCapacityInfo)\>

### getInfo()

```typescript
chrome.system.storage.getInfo(): Promise<https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-StorageUnitInfo[]>
```

Get the storage information from the system. The argument passed to the callback is an array of StorageUnitInfo objects.

#### Returns

- Promise\<[StorageUnitInfo](https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-StorageUnitInfo)\[\]\>
  Chrome 91+

## Events

### onAttached

```typescript
chrome.system.storage.onAttached.addListener(
  callback: function,
)
```

Fired when a new removable storage is attached to the system.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (info: StorageUnitInfo) => void
  ```

  <br />

  - info [StorageUnitInfo](https://developer.chrome.com/docs/extensions/reference/api/system/storage#type-StorageUnitInfo)

### onDetached

```typescript
chrome.system.storage.onDetached.addListener(
  callback: function,
)
```

Fired when a removable storage is detached from the system.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (id: string) => void
  ```

  <br />

  - id string

<br />