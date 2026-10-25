<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.loginState` API to read and monitor the login state.

<br />

<br />

## Permissions

`loginState`  

<br />

<br />

## Availability

Chrome 78+ ChromeOS only

<br />

<br />

<br />

## Types

### ProfileType

#### Enum

"SIGNIN_PROFILE"   
Specifies that the extension is in the signin profile.
"USER_PROFILE"   
Specifies that the extension is in the user profile.
"LOCK_PROFILE"   
Specifies that the extension is in the lock screen profile.

<br />

### SessionState

#### Enum

"UNKNOWN"   
Specifies that the session state is unknown.
"IN_OOBE_SCREEN"   
Specifies that the user is in the out-of-box-experience screen.
"IN_LOGIN_SCREEN"   
Specifies that the user is in the login screen.
"IN_SESSION"   
Specifies that the user is in the session.
"IN_LOCK_SCREEN"   
Specifies that the user is in the lock screen.
"IN_RMA_SCREEN"   
Specifies that the device is in RMA mode, finalizing repairs.

<br />

## Methods

### getProfileType()

```typescript
chrome.loginState.getProfileType(): Promise<https://developer.chrome.com/docs/extensions/reference/api/loginState#type-ProfileType>
```

Gets the type of the profile the extension is in.

#### Returns

- Promise\<[ProfileType](https://developer.chrome.com/docs/extensions/reference/api/loginState#type-ProfileType)\>
  Chrome 96+

### getSessionState()

```typescript
chrome.loginState.getSessionState(): Promise<https://developer.chrome.com/docs/extensions/reference/api/loginState#type-SessionState>
```

Gets the current session state.

#### Returns

- Promise\<[SessionState](https://developer.chrome.com/docs/extensions/reference/api/loginState#type-SessionState)\>
  Chrome 96+

## Events

### onSessionStateChanged

```typescript
chrome.loginState.onSessionStateChanged.addListener(
  callback: function,
)
```

Dispatched when the session state changes. `sessionState` is the new session state.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (sessionState: SessionState) => void
  ```

  <br />

  - sessionState [SessionState](https://developer.chrome.com/docs/extensions/reference/api/loginState#type-SessionState)

<br />