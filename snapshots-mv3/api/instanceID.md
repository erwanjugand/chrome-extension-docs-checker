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

Chrome 44+ browser.\* since Chrome 148

<br />

<br />

<br />

## Methods

### deleteID()

```typescript
browser.instanceID.deleteID(): Promise<void>
```

Resets the app instance identifier and revokes all tokens associated with it.

#### Returns

- Promise\<void\>
  Chrome 96+ browser.\* since Chrome 148

  Resolves when the deletion completes. The instance identifier was revoked successfully if the promise does not reject.

### deleteToken()

```typescript
browser.instanceID.deleteToken(
  deleteTokenParams: object,
): Promise<void>
```

Revokes a granted token.

#### Parameters

- deleteTokenParams object

  Parameters for deleteToken.
  - authorizedEntity string
    Chrome 46+ browser.\* since Chrome 148

    The authorized entity that is used to obtain the token.
  - scope string
    Chrome 46+ browser.\* since Chrome 148

    The scope that is used to obtain the token.

#### Returns

- Promise\<void\>
  Chrome 96+ browser.\* since Chrome 148

  Resolves when the token deletion completes. The token was revoked successfully if the promise does not reject.

### getCreationTime()

```typescript
browser.instanceID.getCreationTime(): Promise<number>
```

Retrieves the time when the InstanceID has been generated. The creation time will be returned by the `callback`.

#### Returns

- Promise\<number\>
  Chrome 96+ browser.\* since Chrome 148

  Resolves when the retrieval completes.

### getID()

```typescript
browser.instanceID.getID(): Promise<string>
```

Retrieves an identifier for the app instance. The instance ID will be returned by the `callback`. The same ID will be returned as long as the application identity has not been revoked or expired.

#### Returns

- Promise\<string\>
  Chrome 96+ browser.\* since Chrome 148

  Resolves when the retrieval completes.

### getToken()

```typescript
browser.instanceID.getToken(
  getTokenParams: object,
): Promise<string>
```

Return a token that allows the authorized entity to access the service defined by scope.

#### Parameters

- getTokenParams object

  Parameters for getToken.
  - authorizedEntity string
    Chrome 46+ browser.\* since Chrome 148

    Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from [Google developer console](https://code.google.com/apis/console).
  - options object optional
    Chrome 46+ browser.\* since Chrome 148 Deprecated since Chrome 89

    options are deprecated and will be ignored.

    <br />

    Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request.
  - scope string
    Chrome 46+ browser.\* since Chrome 148

    Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, `GCM` scope should be used.

#### Returns

- Promise\<string\>
  Chrome 96+ browser.\* since Chrome 148

  Resolves when the retrieval completes.

## Events

### onTokenRefresh

```typescript
browser.instanceID.onTokenRefresh.addListener(
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