<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.vpnProvider` API to implement a VPN client.

<br />

<br />

## Permissions

`vpnProvider`  

<br />

<br />

## Availability

Chrome 43+ ChromeOS only

<br />

<br />

## Concepts and usage

Typical usage of `browser.vpnProvider` is as follows:

- Create VPN configurations by calling [`createConfig()`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#method-createConfig). A VPN configuration is a persistent entry shown to the user in a ChromeOS UI. The user can select a VPN configuration from a list and connect to it or disconnect from it.

- Add listeners to the [`onPlatformMessage`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#event-onPlatformMessage), [`onPacketReceived`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#event-onPacketReceived), and [`onConfigRemoved`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#event-onConfigRemoved) events.

- When the user connects to the VPN configuration, [`onPlatformMessage`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#event-onPlatformMessage) will be received with the message `"connected"`. The period between the `"connected"` and `"disconnected"` messages is called a "VPN session". In this time period, the extension that receives the message is said to own the VPN session.

- Initiate connection to the VPN server and start the VPN client.

- Set the Parameters of the connection by calling [`setParameters()`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#method-setParameters).

- Notify the connection state as `"connected"` by calling [`notifyConnectionStateChanged()`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#method-notifyConnectionStateChanged).

- When the steps previous are completed without errors, a virtual tunnel is created to the network stack of ChromeOS. IP packets can be sent through the tunnel by calling [`sendPacket()`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#method-sendPacket) and any packets originating on the ChromeOS device will be received using the [`onPacketReceived`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#event-onPacketReceived) event handler.

- When the user disconnects from the VPN configuration, [`onPlatformMessage`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#event-onPlatformMessage) will be fired with the message `"disconnected"`.

- If the VPN configuration is no longer necessary, it can be destroyed by calling [`destroyConfig()`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#method-destroyConfig).

<br />

## Types

### Parameters

#### Properties

- address string

  IP address for the VPN interface in CIDR notation. IPv4 is currently the only supported mode.
- broadcastAddress string optional

  Broadcast address for the VPN interface. (default: deduced from IP address and mask)
- dnsServers string\[\]

  A list of IPs for the DNS servers.
- domainSearch string\[\] optional

  A list of search domains. (default: no search domain)
- exclusionList string\[\]

  Exclude network traffic to the list of IP blocks in CIDR notation from the tunnel. This can be used to bypass traffic to and from the VPN server. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
- inclusionList string\[\]

  Include network traffic to the list of IP blocks in CIDR notation to the tunnel. This parameter can be used to set up a split tunnel. By default no traffic is directed to the tunnel. Adding the entry "0.0.0.0/0" to this list gets all the user traffic redirected to the tunnel. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
- mtu string optional

  MTU setting for the VPN interface. (default: 1500 bytes)
- reconnect string optional
  Chrome 51+

  Whether or not the VPN extension implements auto-reconnection.

  If true, the `linkDown`, `linkUp`, `linkChanged`, `suspend`, and `resume` platform messages will be used to signal the respective events. If false, the system will forcibly disconnect the VPN if the network topology changes, and the user will need to reconnect manually. (default: false)

  This property is new in Chrome 51; it will generate an exception in earlier versions. try/catch can be used to conditionally enable the feature based on browser support.

### PlatformMessage

The enum is used by the platform to notify the client of the VPN session status.

#### Enum

"connected"   
Indicates that the VPN configuration connected.
"disconnected"   
Indicates that the VPN configuration disconnected.
"error"   
Indicates that an error occurred in VPN connection, for example a timeout. A description of the error is given as the error argument to onPlatformMessage.
"linkDown"   
Indicates that the default physical network connection is down.
"linkUp"   
Indicates that the default physical network connection is back up.
"linkChanged"   
Indicates that the default physical network connection changed, e.g. wifi-\>mobile.
"suspend"   
Indicates that the OS is preparing to suspend, so the VPN should drop its connection. The extension is not guaranteed to receive this event prior to suspending.
"resume"   
Indicates that the OS has resumed and the user has logged back in, so the VPN should try to reconnect.

<br />

### UIEvent

The enum is used by the platform to indicate the event that triggered `onUIEvent`.

#### Enum

"showAddDialog"   
Requests that the VPN client show the add configuration dialog box to the user.
"showConfigureDialog"   
Requests that the VPN client show the configuration settings dialog box to the user.

<br />

### VpnConnectionState

The enum is used by the VPN client to inform the platform of its current state. This helps provide meaningful messages to the user.

#### Enum

"connected"   
Specifies that VPN connection was successful.
"failure"   
Specifies that VPN connection has failed.

<br />

## Methods

### createConfig()

```typescript
chrome.vpnProvider.createConfig(
  name: string,
): Promise<string>
```

Creates a new VPN configuration that persists across multiple login sessions of the user.

#### Parameters

- name string

  The name of the VPN configuration.

#### Returns

- Promise\<string\>
  Chrome 96+

  Returns a Promise which resolves when the configuration is created or rejects if there is an error.

### destroyConfig()

```typescript
chrome.vpnProvider.destroyConfig(
  id: string,
): Promise<void>
```

Destroys a VPN configuration created by the extension.

#### Parameters

- id string

  ID of the VPN configuration to destroy.

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the configuration is destroyed or rejects if there is an error.

### notifyConnectionStateChanged()

```typescript
chrome.vpnProvider.notifyConnectionStateChanged(
  state: VpnConnectionState,
): Promise<void>
```

Notifies the VPN session state to the platform. This will succeed only when the VPN session is owned by the extension.

#### Parameters

- state [VpnConnectionState](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#type-VpnConnectionState)

  The VPN session state of the VPN client.

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the notification is complete or rejects if there is an error.

### sendPacket()

```typescript
chrome.vpnProvider.sendPacket(
  data: ArrayBuffer,
): Promise<void>
```

Sends an IP packet through the tunnel created for the VPN session. This will succeed only when the VPN session is owned by the extension.

#### Parameters

- data ArrayBuffer

  The IP packet to be sent to the platform.

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the packet is sent or rejects if there is an error.

### setParameters()

```typescript
chrome.vpnProvider.setParameters(
  parameters: Parameters,
): Promise<void>
```

Sets the parameters for the VPN session. This should be called immediately after `"connected"` is received from the platform. This will succeed only when the VPN session is owned by the extension.

#### Parameters

- parameters [Parameters](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#type-Parameters)

  The parameters for the VPN session.

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the parameters are set or rejects if there is an error.

## Events

### onConfigCreated

```typescript
chrome.vpnProvider.onConfigCreated.addListener(
  callback: function,
)
```

Triggered when a configuration is created by the platform for the extension.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (id: string, name: string, data: object) => void
  ```

  <br />

  - id string
  - name string
  - data object

### onConfigRemoved

```typescript
chrome.vpnProvider.onConfigRemoved.addListener(
  callback: function,
)
```

Triggered when a configuration created by the extension is removed by the platform.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (id: string) => void
  ```

  <br />

  - id string

### onPacketReceived

```typescript
chrome.vpnProvider.onPacketReceived.addListener(
  callback: function,
)
```

Triggered when an IP packet is received via the tunnel for the VPN session owned by the extension.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (data: ArrayBuffer) => void
  ```

  <br />

  - data ArrayBuffer

### onPlatformMessage

```typescript
chrome.vpnProvider.onPlatformMessage.addListener(
  callback: function,
)
```

Triggered when a message is received from the platform for a VPN configuration owned by the extension.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (id: string, message: PlatformMessage, error: string) => void
  ```

  <br />

  - id string
  - message [PlatformMessage](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#type-PlatformMessage)
  - error string

### onUIEvent

```typescript
chrome.vpnProvider.onUIEvent.addListener(
  callback: function,
)
```

Triggered when there is a UI event for the extension. UI events are signals from the platform that indicate to the app that a UI dialog needs to be shown to the user.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (event: UIEvent, id?: string) => void
  ```

  <br />

  - event [UIEvent](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider#type-UIEvent)
  - id string optional

<br />