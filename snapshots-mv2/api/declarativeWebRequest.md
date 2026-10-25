refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

***Note:** this API is deprecated. Check out the [`declarativeNetRequest`](https://developer.chrome.com/docs/extensions/mv2/declarativeNetRequest/) API instead.* Use the `chrome.declarativeWebRequest` API to intercept, block, or modify requests in-flight. It is significantly faster than the [`chrome.webRequest` API](https://developer.chrome.com/docs/extensions/mv2/webRequest/) because you can register rules that are evaluated in the browser rather than the JavaScript engine, which reduces roundtrip latencies and allows higher efficiency.

<br />

<br />

## Permissions

`declarativeWebRequest`  

<br />

You must declare the "declarativeWebRequest" permission in the [extension manifest](https://developer.chrome.com/docs/extensions/reference/manifest) to use this
API, along with [host permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions).

    {
      "name": "My extension",
      ...
      "permissions": [
        "declarativeWebRequest",
        "*://*/*"
      ],
      ...
    }

<br />

## Availability

Beta channel ≤ MV2

<br />

## Manifest

Note that certain types of non-sensitive actions do not require host permissions:

- `CancelRequest`
- `IgnoreRules`
- `RedirectToEmptyDocument`
- `RedirectToTransparentImage`

The `SendMessageToExtension()` action requires host permissions for any hosts whose network requests
you want to trigger a message on.

All other actions require host permissions to all URLs.

As an example, if `"https://*.google.com/*"` is the only host permission an extension has, then such an
extension may set up a rule to:

- Cancel a request to `https://www.google.com` or `https://anything.else.com`.
- Send a message when navigating to `https://www.google.com` but not to `https://something.else.com`.

The extension cannot set up a rule to redirect `https://www.google.com` to `https://mail.google.com`.

## Rules

The Declarative Web Request API follows the concepts of the [Declarative API](https://developer.chrome.com/docs/extensions/reference/api/events#declarative). You can register
rules to the `chrome.declarativeWebRequest.onRequest` event object.

The Declarative Web Request API supports a single type of match criteria, the `RequestMatcher`. The
`RequestMatcher` matches network requests if and only if all listed criteria are met. The following
`RequestMatcher` would match a network request when the user enters `https://www.example.com` in the
omnibox:

    var matcher = new chrome.declarativeWebRequest.RequestMatcher({
      url: { hostSuffix: 'example.com', schemes: ['http'] },
      resourceType: ['main_frame']
    });

Requests to `https://www.example.com` would be rejected by the `RequestMatcher` due to the scheme.
Also all requests for an embedded iframe would be rejected due to the `resourceType`.

> [!NOTE]
> **Note:** All conditions and actions are created via a constructor as shown in the example above.

To cancel all requests to "example.com", you can define a rule as follows:

    var rule = {
      conditions: [
        new chrome.declarativeWebRequest.RequestMatcher({
          url: { hostSuffix: 'example.com' } })
      ],
      actions: [
        new chrome.declarativeWebRequest.CancelRequest()
      ]
    };

To cancel all requests to `example.com` and `foobar.com`, you can add a second condition,
as each condition is sufficient to trigger all specified actions:

    var rule2 = {
      conditions: [
        new chrome.declarativeWebRequest.RequestMatcher({
          url: { hostSuffix: 'example.com' } }),
        new chrome.declarativeWebRequest.RequestMatcher({
          url: { hostSuffix: 'foobar.com' } })
      ],
      actions: [
        new chrome.declarativeWebRequest.CancelRequest()
      ]
    };

Register rules as follows:

    chrome.declarativeWebRequest.onRequest.addRules([rule2]);

> [!NOTE]
> **Note:** You should always register or unregister rules in bulk rather than individually because each of these operations recreates internal data structures. This re-creation is computationally expensive but facilitates a very fast URL matching algorithm for hundreds of thousands of URLs. The [Performance section](https://developer.chrome.com/docs/extensions/reference/api/events#performance) of the [Events](https://developer.chrome.com/docs/extensions/reference/api/events) API provides further performance tips.

## Evaluation of conditions and actions

The Declarative Web Request API follows the [Life cycle model for web requests](https://developer.chrome.com/docs/extensions/reference/api/webRequest#life_cycle) of the [Web
Request API](https://developer.chrome.com/docs/extensions/reference/api/webRequest). This means that conditions can only be tested at specific stages of a web request
and, likewise, actions can also only be executed at specific stages. The following tables list the
request stages that are compatible with conditions and actions.

| Request stages during which condition attributes can be processed. |||||
| Condition attribute | onBeforeRequest | onBeforeSendHeaders | onHeadersReceived | onAuthRequired |
|---|---|---|---|---|
| `url` | ✓ | ✓ | ✓ | ✓ |
| `resourceType` | ✓ | ✓ | ✓ | ✓ |
| `contentType` |   |   | ✓ |   |
| `excludeContentType` |   |   | ✓ |   |
| `responseHeaders` |   |   | ✓ |   |
| `excludeResponseHeaders` |   |   | ✓ |   |
| `requestHeaders` |   | ✓ |   |   |
| `excludeRequestHeaders` |   | ✓ |   |   |
| `thirdPartyForCookies` | ✓ | ✓ | ✓ | ✓ |
| `AddRequestCookie` |   | ✓ |   |   |
| `AddResponseCookie` |   |   | ✓ |   |
| `AddResponseHeader` |   |   | ✓ |   |
| `CancelRequest` | ✓ | ✓ | ✓ | ✓ |
| `EditRequestCookie` |   | ✓ |   |   |
| `EditResponseCookie` |   |   | ✓ |   |
| `IgnoreRules` | ✓ | ✓ | ✓ | ✓ |
| `RedirectByRegEx` | ✓ |   | ✓ |   |
| `RedirectRequest` | ✓ |   | ✓ |   |
| `RedirectToEmptyDocument` | ✓ |   | ✓ |   |
| `RedirectToTransparentImage` | ✓ |   | ✓ |   |
| `RemoveRequestCookie` |   | ✓ |   |   |
| `RemoveRequestHeader` |   | ✓ |   |   |
| `RemoveResponseCookie` |   |   | ✓ |   |
| `RemoveResponseHeader` |   |   | ✓ |   |
| `SendMessageToExtension` | ✓ | ✓ | ✓ | ✓ |
| `SetRequestHeader` |   | ✓ |   |   |

> [!NOTE]
> **Note:** Applicable stages can be further constrained by using the "stages" attribute.

> [!NOTE]
> **Note:** Redirects initiated by a redirect action use the original request method for the redirect with one exception: if the redirect is initiated at the \`onHeadersReceived\`\` stage, then the redirect will be issued using the \`GET\` method.

> [!IMPORTANT]
> **Example:** It is possible to combine a \`new chrome.declarativeWebRequest.RequestMatcher({contentType: \["image/jpeg"\]})\` condition with a \`new chrome.declarativeWebRequest.CancelRequest()\` action because both of them can be evaluated in the \`onHeadersReceived\` stage. It is, however, impossible to combine the request matcher with a \`new chrome.declarativeWebRequest.SetRequestHeader()\` because request headers cannot be set any more by the time the content type has been terminated.

## Use priorities to override rules

Rules can be associated with priorities as described in the [Events API](https://developer.chrome.com/docs/extensions/reference/api/events#declarative). This mechanism can be
used to express exceptions. The following example blocks all requests to images named `evil.jpg`
except on the server "myserver.com".

    var rule1 = {
      priority: 100,
      conditions: [
        new chrome.declarativeWebRequest.RequestMatcher({
            url: { pathEquals: 'evil.jpg' } })
      ],
      actions: [
        new chrome.declarativeWebRequest.CancelRequest()
      ]
    };
    var rule2 = {
      priority: 1000,
      conditions: [
        new chrome.declarativeWebRequest.RequestMatcher({
          url: { hostSuffix: '.myserver.com' } })
      ],
      actions: [
        new chrome.declarativeWebRequest.IgnoreRules({
          lowerPriorityThan: 1000 })
      ]
    };
    chrome.declarativeWebRequest.onRequest.addRules([rule1, rule2]);

It is important to recognize that the `IgnoreRules` action is not persisted across [request
stages](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#evaluation). All conditions of all rules are evaluated at each stage of a web request. If an
`IgnoreRules` action is executed, it applies only to other actions that are executed for the same
web request in the same stage.

<br />

## Types

### AddRequestCookie

Adds a cookie to the request or overrides a cookie, in case another cookie of the same name exists already. Note that it is preferred to use the Cookies API because this is computationally less expensive.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: AddRequestCookie) => {...}
  ```

  <br />

  - arg [AddRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddRequestCookie)
  - returns[AddRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddRequestCookie)
- cookie [RequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RequestCookie)

  Cookie to be added to the request. No field may be undefined.

### AddResponseCookie

Adds a cookie to the response or overrides a cookie, in case another cookie of the same name exists already. Note that it is preferred to use the Cookies API because this is computationally less expensive.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: AddResponseCookie) => {...}
  ```

  <br />

  - arg [AddResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddResponseCookie)
  - returns[AddResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddResponseCookie)
- cookie [ResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-ResponseCookie)

  Cookie to be added to the response. The name and value need to be specified.

### AddResponseHeader

Adds the response header to the response of this web request. As multiple response headers may share the same name, you need to first remove and then add a new response header in order to replace one.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: AddResponseHeader) => {...}
  ```

  <br />

  - arg [AddResponseHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddResponseHeader)
  - returns[AddResponseHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddResponseHeader)
- name string

  HTTP response header name.
- value string

  HTTP response header value.

### CancelRequest

Declarative event action that cancels a network request.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: CancelRequest) => {...}
  ```

  <br />

  - arg [CancelRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-CancelRequest)
  - returns[CancelRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-CancelRequest)

### EditRequestCookie

Edits one or more cookies of request. Note that it is preferred to use the Cookies API because this is computationally less expensive.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: EditRequestCookie) => {...}
  ```

  <br />

  - arg [EditRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-EditRequestCookie)
  - returns[EditRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-EditRequestCookie)
- filter [RequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RequestCookie)

  Filter for cookies that will be modified. All empty entries are ignored.
- modification [RequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RequestCookie)

  Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed.

### EditResponseCookie

Edits one or more cookies of response. Note that it is preferred to use the Cookies API because this is computationally less expensive.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: EditResponseCookie) => {...}
  ```

  <br />

  - arg [EditResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-EditResponseCookie)
  - returns[EditResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-EditResponseCookie)
- filter [FilterResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-FilterResponseCookie)

  Filter for cookies that will be modified. All empty entries are ignored.
- modification [ResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-ResponseCookie)

  Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed.

### FilterResponseCookie

A filter of a cookie in HTTP Responses.

#### Properties

- ageLowerBound number optional

  Inclusive lower bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is set to 'now + ageLowerBound' or later fulfill this criterion. Session cookies do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime.
- ageUpperBound number optional

  Inclusive upper bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is in the interval \[now, now + ageUpperBound\] fulfill this criterion. Session cookies and cookies whose expiration date-time is in the past do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime.
- domain string optional

  Value of the Domain cookie attribute.
- expires string optional

  Value of the Expires cookie attribute.
- httpOnly string optional

  Existence of the HttpOnly cookie attribute.
- maxAge number optional

  Value of the Max-Age cookie attribute
- name string optional

  Name of a cookie.
- path string optional

  Value of the Path cookie attribute.
- secure string optional

  Existence of the Secure cookie attribute.
- sessionCookie boolean optional

  Filters session cookies. Session cookies have no lifetime specified in any of 'max-age' or 'expires' attributes.
- value string optional

  Value of a cookie, may be padded in double-quotes.

### HeaderFilter

Filters request headers for various criteria. Multiple criteria are evaluated as a conjunction.

#### Properties

- nameContains string \| string\[\] optional

  Matches if the header name contains all of the specified strings.
- nameEquals string optional

  Matches if the header name is equal to the specified string.
- namePrefix string optional

  Matches if the header name starts with the specified string.
- nameSuffix string optional

  Matches if the header name ends with the specified string.
- valueContains string \| string\[\] optional

  Matches if the header value contains all of the specified strings.
- valueEquals string optional

  Matches if the header value is equal to the specified string.
- valuePrefix string optional

  Matches if the header value starts with the specified string.
- valueSuffix string optional

  Matches if the header value ends with the specified string.

### IgnoreRules

Masks all rules that match the specified criteria.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: IgnoreRules) => {...}
  ```

  <br />

  - arg [IgnoreRules](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-IgnoreRules)
  - returns[IgnoreRules](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-IgnoreRules)
- hasTag string optional

  If set, rules with the specified tag are ignored. This ignoring is not persisted, it affects only rules and their actions of the same network request stage. Note that rules are executed in descending order of their priorities. This action affects rules of lower priority than the current rule. Rules with the same priority may or may not be ignored.
- lowerPriorityThan number optional

  If set, rules with a lower priority than the specified value are ignored. This boundary is not persisted, it affects only rules and their actions of the same network request stage.

### RedirectByRegEx

Redirects a request by applying a regular expression on the URL. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RedirectByRegEx) => {...}
  ```

  <br />

  - arg [RedirectByRegEx](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectByRegEx)
  - returns[RedirectByRegEx](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectByRegEx)
- from string

  A match pattern that may contain capture groups. Capture groups are referenced in the Perl syntax ($1, $2, ...) instead of the RE2 syntax (\\1, \\2, ...) in order to be closer to JavaScript Regular Expressions.
- to string

  Destination pattern.

### RedirectRequest

Declarative event action that redirects a network request.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RedirectRequest) => {...}
  ```

  <br />

  - arg [RedirectRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectRequest)
  - returns[RedirectRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectRequest)
- redirectUrl string

  Destination to where the request is redirected.

### RedirectToEmptyDocument

Declarative event action that redirects a network request to an empty document.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RedirectToEmptyDocument) => {...}
  ```

  <br />

  - arg [RedirectToEmptyDocument](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectToEmptyDocument)
  - returns[RedirectToEmptyDocument](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectToEmptyDocument)

### RedirectToTransparentImage

Declarative event action that redirects a network request to a transparent image.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RedirectToTransparentImage) => {...}
  ```

  <br />

  - arg [RedirectToTransparentImage](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectToTransparentImage)
  - returns[RedirectToTransparentImage](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectToTransparentImage)

### RemoveRequestCookie

Removes one or more cookies of request. Note that it is preferred to use the Cookies API because this is computationally less expensive.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RemoveRequestCookie) => {...}
  ```

  <br />

  - arg [RemoveRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveRequestCookie)
  - returns[RemoveRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveRequestCookie)
- filter [RequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RequestCookie)

  Filter for cookies that will be removed. All empty entries are ignored.

### RemoveRequestHeader

Removes the request header of the specified name. Do not use SetRequestHeader and RemoveRequestHeader with the same header name on the same request. Each request header name occurs only once in each request.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RemoveRequestHeader) => {...}
  ```

  <br />

  - arg [RemoveRequestHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveRequestHeader)
  - returns[RemoveRequestHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveRequestHeader)
- name string

  HTTP request header name (case-insensitive).

### RemoveResponseCookie

Removes one or more cookies of response. Note that it is preferred to use the Cookies API because this is computationally less expensive.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RemoveResponseCookie) => {...}
  ```

  <br />

  - arg [RemoveResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveResponseCookie)
  - returns[RemoveResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveResponseCookie)
- filter [FilterResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-FilterResponseCookie)

  Filter for cookies that will be removed. All empty entries are ignored.

### RemoveResponseHeader

Removes all response headers of the specified names and values.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RemoveResponseHeader) => {...}
  ```

  <br />

  - arg [RemoveResponseHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveResponseHeader)
  - returns[RemoveResponseHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveResponseHeader)
- name string

  HTTP request header name (case-insensitive).
- value string optional

  HTTP request header value (case-insensitive).

### RequestCookie

A filter or specification of a cookie in HTTP Requests.

#### Properties

- name string optional

  Name of a cookie.
- value string optional

  Value of a cookie, may be padded in double-quotes.

### RequestMatcher

Matches network events by various criteria.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: RequestMatcher) => {...}
  ```

  <br />

  - arg [RequestMatcher](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RequestMatcher)
  - returns[RequestMatcher](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RequestMatcher)
- contentType string\[\] optional

  Matches if the MIME media type of a response (from the HTTP Content-Type header) is contained in the list.
- excludeContentType string\[\] optional

  Matches if the MIME media type of a response (from the HTTP Content-Type header) is *not* contained in the list.
- excludeRequestHeaders [HeaderFilter](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-HeaderFilter)\[\] optional

  Matches if none of the request headers is matched by any of the HeaderFilters.
- excludeResponseHeaders [HeaderFilter](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-HeaderFilter)\[\] optional

  Matches if none of the response headers is matched by any of the HeaderFilters.
- firstPartyForCookiesUrl [UrlFilter](https://developer.chrome.com/docs/extensions/mv2/events/#type-UrlFilter) optional
  Deprecated

  Ignored since release 82.

  <br />

  Matches if the conditions of the UrlFilter are fulfilled for the 'first party' URL of the request. The 'first party' URL of a request, when present, can be different from the request's target URL, and describes what is considered 'first party' for the sake of third-party checks for cookies.
- requestHeaders [HeaderFilter](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-HeaderFilter)\[\] optional

  Matches if some of the request headers is matched by one of the HeaderFilters.
- resourceType [ResourceType](https://developer.chrome.com/docs/extensions/mv2/webRequest/#type-ResourceType)\[\] optional

  Matches if the request type of a request is contained in the list. Requests that cannot match any of the types will be filtered out.
- responseHeaders [HeaderFilter](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-HeaderFilter)\[\] optional

  Matches if some of the response headers is matched by one of the HeaderFilters.
- stages [Stage](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-Stage)\[\] optional

  Contains a list of strings describing stages. Allowed values are 'onBeforeRequest', 'onBeforeSendHeaders', 'onHeadersReceived', 'onAuthRequired'. If this attribute is present, then it limits the applicable stages to those listed. Note that the whole condition is only applicable in stages compatible with all attributes.
- thirdPartyForCookies boolean optional
  Deprecated

  Ignored since release 87.

  <br />

  If set to true, matches requests that are subject to third-party cookie policies. If set to false, matches all other requests.
- url [UrlFilter](https://developer.chrome.com/docs/extensions/mv2/events/#type-UrlFilter) optional

  Matches if the conditions of the UrlFilter are fulfilled for the URL of the request.

### ResponseCookie

A specification of a cookie in HTTP Responses.

#### Properties

- domain string optional

  Value of the Domain cookie attribute.
- expires string optional

  Value of the Expires cookie attribute.
- httpOnly string optional

  Existence of the HttpOnly cookie attribute.
- maxAge number optional

  Value of the Max-Age cookie attribute
- name string optional

  Name of a cookie.
- path string optional

  Value of the Path cookie attribute.
- secure string optional

  Existence of the Secure cookie attribute.
- value string optional

  Value of a cookie, may be padded in double-quotes.

### SendMessageToExtension

Triggers the [`declarativeWebRequest.onMessage`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#event-onMessage) event.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: SendMessageToExtension) => {...}
  ```

  <br />

  - arg [SendMessageToExtension](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-SendMessageToExtension)
  - returns[SendMessageToExtension](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-SendMessageToExtension)
- message string

  The value that will be passed in the `message` attribute of the dictionary that is passed to the event handler.

### SetRequestHeader

Sets the request header of the specified name to the specified value. If a header with the specified name did not exist before, a new one is created. Header name comparison is always case-insensitive. Each request header name occurs only once in each request.

#### Properties

- constructor void


  The `constructor` function looks like:

  ```typescript
  (arg: SetRequestHeader) => {...}
  ```

  <br />

  - arg [SetRequestHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-SetRequestHeader)
  - returns[SetRequestHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-SetRequestHeader)
- name string

  HTTP request header name.
- value string

  HTTP request header value.

### Stage

#### Enum

"onBeforeRequest"   
"onBeforeSendHeaders"   
"onHeadersReceived"   
"onAuthRequired"   

<br />

## Events

### onMessage

```typescript
chrome.declarativeWebRequest.onMessage.addListener(
  callback: function,
)
```

Fired when a message is sent via [`declarativeWebRequest.SendMessageToExtension`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-SendMessageToExtension) from an action of the declarative web request API.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (details: object) => void
  ```

  <br />

  - details object
    - documentId string optional

      A UUID of the document that made the request.
    - documentLifecycle [extensionTypes.DocumentLifecycle](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-DocumentLifecycle)

      The lifecycle the document is in.
    - frameId number

      The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
    - frameType [extensionTypes.FrameType](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-FrameType)

      The type of frame the navigation occurred in.
    - message string

      The message sent by the calling script.
    - method string

      Standard HTTP method.
    - parentDocumentId string optional

      A UUID of the parent document owning this frame. This is not set if there is no parent.
    - parentFrameId number

      ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
    - requestId string

      The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
    - stage [Stage](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-Stage)

      The stage of the network request during which the event was triggered.
    - tabId number

      The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
    - timeStamp number

      The time when this signal is triggered, in milliseconds since the epoch.
    - type [webRequest.ResourceType](https://developer.chrome.com/docs/extensions/mv2/webRequest/#type-ResourceType)

      How the requested resource will be used.
    - url string

### onRequest


Provides the [Declarative Event API](https://developer.chrome.com/docs/extensions/reference/api/events#declarative_event_handlers) consisting of `addRules`, `removeRules`, and `getRules`.

#### Conditions

[RequestMatcher](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RequestMatcher)

<br />

#### Actions

[AddRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddRequestCookie)
[AddResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddResponseCookie)
[AddResponseHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-AddResponseHeader)
[CancelRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-CancelRequest)
[EditRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-EditRequestCookie)
[EditResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-EditResponseCookie)
[RedirectRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectRequest)
[RedirectToTransparentImage](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectToTransparentImage)
[RedirectToEmptyDocument](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectToEmptyDocument)
[RedirectByRegEx](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RedirectByRegEx)
[RemoveRequestCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveRequestCookie)
[RemoveResponseCookie](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveResponseCookie)
[RemoveRequestHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveRequestHeader)
[RemoveResponseHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-RemoveResponseHeader)
[SetRequestHeader](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-SetRequestHeader)
[SendMessageToExtension](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-SendMessageToExtension)
[IgnoreRules](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest#type-IgnoreRules)

<br />

<br />