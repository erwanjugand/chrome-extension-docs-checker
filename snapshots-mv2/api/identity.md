refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.identity` API to get OAuth2 access tokens.

<br />

<br />

## Permissions

`identity`  

<br />

<br />

<br />

<br />

## Types

### AccountInfo

#### Properties

- id string

  A unique identifier for the account. This ID will not change for the lifetime of the account.

### AccountStatus

Chrome 84+

#### Enum

"SYNC"   
Specifies that Sync is enabled for the primary account.
"ANY"   
Specifies the existence of a primary account, if any.

<br />

### GetAuthTokenResult

Chrome 105+

#### Properties

- grantedScopes string\[\] optional

  A list of OAuth2 scopes granted to the extension.
- token string optional

  The specific token associated with the request.

### InvalidTokenDetails

#### Properties

- token string

  The specific token that should be removed from the cache.

### ProfileDetails

Chrome 84+

#### Properties

- accountStatus [AccountStatus](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-AccountStatus) optional

  A status of the primary account signed into a profile whose `ProfileUserInfo` should be returned. Defaults to `SYNC` account status.

### ProfileUserInfo

#### Properties

- email string

  An email address for the user account signed into the current profile. Empty if the user is not signed in or the `identity.email` manifest permission is not specified.
- id string

  A unique identifier for the account. This ID will not change for the lifetime of the account. Empty if the user is not signed in or (in M41+) the `identity.email` manifest permission is not specified.

### TokenDetails

#### Properties

- account [AccountInfo](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-AccountInfo) optional

  The account ID whose token should be returned. If not specified, the function will use an account from the Chrome profile: the Sync account if there is one, or otherwise the first Google web account.
- enableGranularPermissions boolean optional
  Chrome 87+

  The `enableGranularPermissions` flag allows extensions to opt-in early to the granular permissions consent screen, in which requested permissions are granted or denied individually.
- interactive boolean optional

  Fetching a token may require the user to sign-in to Chrome, or approve the application's requested scopes. If the interactive flag is `true`, `getAuthToken` will prompt the user as necessary. When the flag is `false` or omitted, `getAuthToken` will return failure any time a prompt would be required.
- scopes string\[\] optional

  A list of OAuth2 scopes to request.

  When the `scopes` field is present, it overrides the list of scopes specified in manifest.json.

### WebAuthFlowDetails

#### Properties

- abortOnLoadForNonInteractive boolean optional
  Chrome 113+

  Whether to terminate `launchWebAuthFlow` for non-interactive requests after the page loads. This parameter does not affect interactive flows.

  When set to `true` (default) the flow will terminate immediately after the page loads. When set to `false`, the flow will only terminate after the `timeoutMsForNonInteractive` passes. This is useful for identity providers that use JavaScript to perform redirections after the page loads.
- interactive boolean optional

  Whether to launch auth flow in interactive mode.

  Since some auth flows may immediately redirect to a result URL, `launchWebAuthFlow` hides its web view until the first navigation either redirects to the final URL, or finishes loading a page meant to be displayed.

  If the `interactive` flag is `true`, the window will be displayed when a page load completes. If the flag is `false` or omitted, `launchWebAuthFlow` will return with an error if the initial navigation does not complete the flow.

  For flows that use JavaScript for redirection, `abortOnLoadForNonInteractive` can be set to `false` in combination with setting `timeoutMsForNonInteractive` to give the page a chance to perform any redirects.
- timeoutMsForNonInteractive number optional
  Chrome 113+

  The maximum amount of time, in miliseconds, `launchWebAuthFlow` is allowed to run in non-interactive mode in total. Only has an effect if `interactive` is `false`.
- url string

  The URL that initiates the auth flow.

## Methods

### clearAllCachedAuthTokens()

Promise Chrome 87+

```typescript
chrome.identity.clearAllCachedAuthTokens(
  callback?: function,
): Promise<void>
```

Resets the state of the Identity API:

- Removes all OAuth2 access tokens from the token cache
- Removes user's account preferences
- De-authorizes the user from all auth flows

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 106+

  Returns a Promise which resolves when the state has been cleared.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getAccounts()

Promise Dev channel

```typescript
chrome.identity.getAccounts(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-AccountInfo[]>
```

Retrieves a list of AccountInfo objects describing the accounts present on the profile.

`getAccounts` is only supported on dev channel.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (accounts: AccountInfo[]) => void
  ```

  <br />

  - accounts [AccountInfo](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-AccountInfo)\[\]

#### Returns

- Promise\<[AccountInfo](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-AccountInfo)\[\]\>


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getAuthToken()

Promise

```typescript
chrome.identity.getAuthToken(
  details?: TokenDetails,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-GetAuthTokenResult>
```

Gets an OAuth2 access token using the client ID and scopes specified in the [`oauth2` section of manifest.json](https://developer.chrome.com/docs/apps/app_identity#update_manifest).

The Identity API caches access tokens in memory, so it's ok to call `getAuthToken` non-interactively any time a token is required. The token cache automatically handles expiration.

For a good user experience it is important interactive token requests are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests, or Chrome sign in screens if they are not signed in, with with no context. In particular, do not use `getAuthToken` interactively when your app is first launched.

Note: When called with a callback, instead of returning an object this function will return the two properties as separate arguments passed to the callback.

#### Parameters

- details [TokenDetails](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-TokenDetails) optional

  Token options.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: GetAuthTokenResult) => void
  ```

  <br />

  - result [GetAuthTokenResult](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-GetAuthTokenResult)
    Chrome 105+

#### Returns

- Promise\<[GetAuthTokenResult](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-GetAuthTokenResult)\>
  Chrome 105+

  Returns a Promise which resolves with an OAuth2 access token as specified by the manifest, or rejects if there was an error. The `grantedScopes` parameter is populated since Chrome 87. When available, this parameter contains the list of granted scopes corresponding with the returned token.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getProfileUserInfo()

Promise

```typescript
chrome.identity.getProfileUserInfo(
  details?: ProfileDetails,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-ProfileUserInfo>
```

Retrieves email address and obfuscated gaia id of the user signed into a profile.

Requires the `identity.email` manifest permission. Otherwise, returns an empty result.

This API is different from identity.getAccounts in two ways. The information returned is available offline, and it only applies to the primary account for the profile.

#### Parameters

- details [ProfileDetails](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-ProfileDetails) optional
  Chrome 84+

  Profile options.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (userInfo: ProfileUserInfo) => void
  ```

  <br />

  - userInfo [ProfileUserInfo](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-ProfileUserInfo)

#### Returns

- Promise\<[ProfileUserInfo](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-ProfileUserInfo)\>
  Chrome 106+

  Returns a Promise which resolves with the `ProfileUserInfo` of the primary Chrome account, or an empty `ProfileUserInfo` if the account with given `details` doesn't exist.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getRedirectURL()

```typescript
chrome.identity.getRedirectURL(
  path?: string,
): string
```

Generates a redirect URL to be used in `launchWebAuthFlow`.

The generated URLs match the pattern `https://<app-id>.chromiumapp.org/*`.

#### Parameters

- path string optional

  The path appended to the end of the generated URL.

#### Returns

- string

### launchWebAuthFlow()

Promise

```typescript
chrome.identity.launchWebAuthFlow(
  details: WebAuthFlowDetails,
  callback?: function,
): Promise<string | undefined>
```

Starts an auth flow at the specified URL.

This method enables auth flows with non-Google identity providers by launching a web view and navigating it to the first URL in the provider's auth flow. When the provider redirects to a URL matching the pattern `https://<app-id>.chromiumapp.org/*`, the window will close, and the final redirect URL will be passed to the `callback` function.

For a good user experience it is important interactive auth flows are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests with no context. In particular, do not launch an interactive auth flow when your app is first launched.

#### Parameters

- details [WebAuthFlowDetails](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-WebAuthFlowDetails)

  WebAuth flow options.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (responseUrl?: string) => void
  ```

  <br />

  - responseUrl string optional

#### Returns

- Promise\<string \| undefined\>
  Chrome 106+

  Returns a Promise which resolves with the URL redirected back to your application.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### removeCachedAuthToken()

Promise

```typescript
chrome.identity.removeCachedAuthToken(
  details: InvalidTokenDetails,
  callback?: function,
): Promise<void>
```

Removes an OAuth2 access token from the Identity API's token cache.

If an access token is discovered to be invalid, it should be passed to removeCachedAuthToken to remove it from the cache. The app may then retrieve a fresh token with `getAuthToken`.

#### Parameters

- details [InvalidTokenDetails](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-InvalidTokenDetails)

  Token information.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 106+

  Returns a Promise which resolves when the token has been removed from the cache.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onSignInChanged

```typescript
chrome.identity.onSignInChanged.addListener(
  callback: function,
)
```

Fired when signin state changes for an account on the user's profile.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (account: AccountInfo, signedIn: boolean) => void
  ```

  <br />

  - account [AccountInfo](https://developer.chrome.com/docs/extensions/mv2/reference/identity#type-AccountInfo)
  - signedIn boolean

<br />