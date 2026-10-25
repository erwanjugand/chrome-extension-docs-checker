<br />

<br />

## Description

Use the `chrome.devtools.network` API to retrieve the information about network requests displayed by the Developer Tools in the Network panel.

<br />

Network requests information is represented in the HTTP Archive format (*HAR* ). The description of
HAR is outside of scope of this document, refer to [HAR v1.2 Specification](http://www.softwareishard.com/blog/har-12-spec/).

In terms of HAR, the `browser.devtools.network.getHAR()` method returns entire *HAR log* , while
`browser.devtools.network.onRequestFinished` event provides *HAR entry* as an argument to the event
callback.

Note that request content is not provided as part of HAR for efficiency reasons. You may call
request's `getContent()` method to retrieve content.

If the Developer Tools window is opened after the page is loaded, some requests may be missing in
the array of entries returned by `getHAR()`. Reload the page to get all requests. In general, the
list of requests returned by `getHAR()` should match that displayed in the Network panel.

See [DevTools APIs summary](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools) for general introduction to using Developer Tools APIs.

<br />

<br />

<br />

## Manifest

The following keys must be declared [in the manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use this API.
`"devtools_page"`  

<br />

## Examples

The following code logs URLs of all images larger than 40KB as they are loaded:

    browser.devtools.network.onRequestFinished.addListener(
      function(request) {
        if (request.response.bodySize > 40*1024) {
          browser.devtools.inspectedWindow.eval(
              'console.log("Large image: " + unescape("' +
              escape(request.request.url) + '"))');
        }
      }
    );

To try this API, install the [devtools API examples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/devtools) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### Request

Represents a network request for a document resource (script, image and so on). See HAR Specification for reference.

#### Properties

- getContent void

  Returns content of the response body.


  The `getContent` function looks like:

  ```typescript
  () => {...}
  ```

  <br />

  - returnsPromise\<object\>
    Chrome 151+

    A function that receives the response body when the request completes.

## Methods

### getHAR()

```typescript
chrome.devtools.network.getHAR(): Promise<object>
```

Returns HAR log that contains all known network requests.

#### Returns

- Promise\<object\>
  Chrome 151+

  A function that receives the HAR log when the request completes.

## Events

### onNavigated

```typescript
chrome.devtools.network.onNavigated.addListener(
  callback: function,
)
```

Fired when the inspected window navigates to a new page.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (url: string) => void
  ```

  <br />

  - url string

### onRequestFinished

```typescript
chrome.devtools.network.onRequestFinished.addListener(
  callback: function,
)
```

Fired when a network request is finished and all request data are available.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (request: Request) => void
  ```

  <br />

  - request [Request](https://developer.chrome.com/docs/extensions/reference/api/devtools/network#type-Request)

<br />