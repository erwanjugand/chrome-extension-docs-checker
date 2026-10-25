<br />

<br />

## Description

Use `chrome.gcm` to enable apps and extensions to send and receive messages through [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (FCM).

<br />

<br />

## Permissions

`gcm`  

<br />

<br />

<br />

<br />

## Properties

### MAX_MESSAGE_SIZE

The maximum size (in bytes) of all key/value pairs in a message.

#### Value

4096   

## Methods

### register()

```typescript
chrome.gcm.register(
  senderIds: string[],
): Promise<string>
```

Registers the application with FCM. The registration ID will be returned by the `callback`. If `register` is called again with the same list of `senderIds`, the same registration ID will be returned.

#### Parameters

- senderIds string\[\]

  A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.

#### Returns

- Promise\<string\>
  Chrome 116+

  Resolves when registration completes.

### send()

```typescript
chrome.gcm.send(
  message: object,
): Promise<string>
```

Sends a message according to its contents.

#### Parameters

- message object

  A message to send to the other party via FCM.
  - data object

    Message data to send to the server. Case-insensitive `goog.` and `google`, as well as case-sensitive `collapse_key` are disallowed as key prefixes. Sum of all key/value pairs should not exceed [`gcm.MAX_MESSAGE_SIZE`](https://developer.chrome.com/docs/extensions/reference/api/gcm#property-MAX_MESSAGE_SIZE).
  - destinationId string

    The ID of the server to send the message to as assigned by [Google API Console](https://console.cloud.google.com/apis/dashboard).
  - messageId string

    The ID of the message. It must be unique for each message in scope of the applications. See the [Cloud Messaging documentation](https://firebase.google.com/docs/cloud-messaging/js/client) for advice for picking and handling an ID.
  - timeToLive number optional

    Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The default value of time-to-live is 86,400 seconds (1 day) and the maximum value is 2,419,200 seconds (28 days).

#### Returns

- Promise\<string\>
  Chrome 116+

  Resolves after the message is successfully queued for sending. If an error occurs, the promise will be rejected.

### unregister()

```typescript
chrome.gcm.unregister(): Promise<void>
```

Unregisters the application from FCM.

#### Returns

- Promise\<void\>
  Chrome 116+

  Resolves after the unregistration completes. Unregistration was successful if the promise does not reject.

## Events

### onMessage

```typescript
chrome.gcm.onMessage.addListener(
  callback: function,
)
```

Fired when a message is received through FCM.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (message: object) => void
  ```

  <br />

  - message object
    - collapseKey string optional

      The collapse key of a message. See the [Non-collapsible and collapsible messages](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_and_non-collapsible_messages) for details.
    - data object

      The message data.
    - from string optional

      The sender who issued the message.

### onMessagesDeleted

```typescript
chrome.gcm.onMessagesDeleted.addListener(
  callback: function,
)
```

Fired when a FCM server had to delete messages sent by an app server to the application. See [Lifetime of a message](https://firebase.google.com/docs/cloud-messaging/concept-options#lifetime) for details on handling this event.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

### onSendError

```typescript
chrome.gcm.onSendError.addListener(
  callback: function,
)
```

Fired when it was not possible to send a message to the FCM server.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (error: object) => void
  ```

  <br />

  - error object
    - details object

      Additional details related to the error, when available.
    - errorMessage string

      The error message describing the problem.
    - messageId string optional

      The ID of the message with this error, if error is related to a specific message.

<br />