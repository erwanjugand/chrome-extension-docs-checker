refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use `chrome.instanceID` to access the Instance ID service.

<br />

<br />

## Permissions

`gcm`  

<br />

<br />

## Availability

Chrome 44+

<br />

<br />

<br />

## Methods

### deleteID()

Promise

```typescript
chrome.instanceID.deleteID(
  callback?: function,
): Promise<void>
```

Resets the app instance identifier and revokes all tokens associated with it.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+

  Resolves when the deletion completes. The instance identifier was revoked successfully if the promise does not reject.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### deleteToken()

Promise

```typescript
chrome.instanceID.deleteToken(
  deleteTokenParams: object,
  callback?: function,
): Promise<void>
```

Revokes a granted token.

#### Parameters

- deleteTokenParams object

  Parameters for deleteToken.
  - authorizedEntity string
    Chrome 46+

    The authorized entity that is used to obtain the token.
  - scope string
    Chrome 46+

    The scope that is used to obtain the token.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+

  Resolves when the token deletion completes. The token was revoked successfully if the promise does not reject.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getCreationTime()

Promise

```typescript
chrome.instanceID.getCreationTime(
  callback?: function,
): Promise<number>
```

Retrieves the time when the InstanceID has been generated. The creation time will be returned by the `callback`.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (creationTime: number) => void
  ```

  <br />

  - creationTime number

    The time when the Instance ID has been generated, represented in milliseconds since the epoch.

#### Returns

- Promise\<number\>
  Chrome 96+

  Resolves when the retrieval completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getID()

Promise

```typescript
chrome.instanceID.getID(
  callback?: function,
): Promise<string>
```

Retrieves an identifier for the app instance. The instance ID will be returned by the `callback`. The same ID will be returned as long as the application identity has not been revoked or expired.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (instanceID: string) => void
  ```

  <br />

  - instanceID string

    An Instance ID assigned to the app instance.

#### Returns

- Promise\<string\>
  Chrome 96+

  Resolves when the retrieval completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getToken()

Promise

```typescript
chrome.instanceID.getToken(
  getTokenParams: object,
  callback?: function,
): Promise<string>
```

Return a token that allows the authorized entity to access the service defined by scope.

#### Parameters

- getTokenParams object

  Parameters for getToken.
  - authorizedEntity string
    Chrome 46+

    Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from [Google developer console](https://code.google.com/apis/console).
  - options object optional
    Chrome 46+ Deprecated since Chrome 89

    options are deprecated and will be ignored.

    <br />

    Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request.
  - scope string
    Chrome 46+

    Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, `GCM` scope should be used.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (token: string) => void
  ```

  <br />

  - token string

    A token assigned by the requested service.

#### Returns

- Promise\<string\>
  Chrome 96+

  Resolves when the retrieval completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onTokenRefresh

```typescript
chrome.instanceID.onTokenRefresh.addListener(
  callback: function,
)
```

Fired when all the granted tokens need to be refreshed.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

<br />