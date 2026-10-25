<br />

<br />

## Description

Use the `chrome.devtools.inspectedWindow` API to interact with the inspected window: obtain the tab ID for the inspected page, evaluate the code in the context of the inspected window, reload the page, or obtain the list of resources within the page.

<br />

See [DevTools APIs summary](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools) for general introduction to using Developer Tools APIs.

<br />

<br />

The [`tabId`](https://developer.chrome.com/docs/extensions/reference/api/devtools/inspectedWindow#property-tabId) property provides the tab identifier that you can use with the [`browser.tabs.*`](https://developer.chrome.com/docs/extensions/reference/api/tabs)
API calls. However, `browser.tabs.*` API is not exposed to the Developer Tools
extension pages due to security considerations---you will need to pass the tab ID to the background
page and invoke the `browser.tabs.*` API functions from there.

The `reload` method may be used to reload the inspected page. Additionally, the caller can specify
an override for the user agent string, a script that will be injected early upon page load, or an
option to force reload of cached resources.

Use the `getResources` call and the `onResourceContent` event to obtain the list of resources
(documents, stylesheets, scripts, images etc) within the inspected page. The `getContent` and
`setContent` methods of the `Resource` class along with the `onResourceContentCommitted` event may
be used to support modification of the resource content, for example, by an external editor.

<br />

## Manifest

The following keys must be declared [in the manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use this API.
`"devtools_page"`  

<br />

## Execute code in the inspected window

The `eval` method provides the ability for extensions to execute JavaScript code in the context of
the inspected page. This method is powerful when used in the right context and dangerous when used
inappropriately. Use the [`tabs.executeScript`](https://developer.chrome.com/docs/extensions/reference/api/tabs#method-executeScript) method unless you need the specific functionality
that the `eval` method provides.

Here are the main differences between the `eval` and `tabs.executeScript` methods:

- The `eval` method does not use an isolated world for the code being evaluated, so the JavaScript state of the inspected window is accessible to the code. Use this method when access to the JavaScript state of the inspected page is required.
- The execution context of the code being evaluated includes the [Developer Tools console API](https://developers.google.com/web/tools/chrome-devtools/). For example, the code can use `inspect` and `$0`.
- The evaluated code may return a value that is passed to the extension callback. The returned value has to be a valid JSON object (it may contain only primitive JavaScript types and acyclic references to other JSON objects). *Please observe extra care while processing the data received
  from the inspected page---the execution context is essentially controlled by the inspected page; a
  malicious page may affect the data being returned to the extension.*

> [!CAUTION]
> **Caution:** Due to the security considerations explained above, the [`scripting.executeScript`](https://developer.chrome.com/docs/extensions/reference/api/scripting#method-executeScript) method is the preferred way for an extension to access DOM data of the inspected page in cases where the access to JavaScript state of the inspected page is not required.

Note that a page can include multiple different JavaScript execution contexts. Each frame has its
own context, plus an additional context for each extension that has content scripts running in that
frame.

By default, the `eval` method executes in the context of the main frame of the inspected page.

The `eval` method takes an optional second argument that you can use to specify the context in which
the code is evaluated. This *options* object can contain one or more of the following keys:

`frameURL`
:   Use to specify a frame other than the inspected page's main frame.

`contextSecurityOrigin`
:   Use to select a context within the specified frame according to its [web origin](https://www.ietf.org/rfc/rfc6454.txt).

`useContentScriptContext`
:   If true, execute the script in the same context as the extensions's content scripts. (Equivalent to
    specifying the extension's own web origin as the context security origin.) This can be used to
    exchange data with the content script.

## Examples

The following code checks for the version of jQuery used by the inspected page:

    browser.devtools.inspectedWindow.eval(
      "jQuery.fn.jquery",
      function(result, isException) {
        if (isException) {
          console.log("the page is not using jQuery");
        } else {
          console.log("The page is using jQuery v" + result);
        }
      }
    );

To try this API, install the [devtools API examples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/devtools) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### Resource

A resource within the inspected page, such as a document, a script, or an image.

#### Properties

- url string

  The URL of the resource.
- getContent void

  Gets the content of the resource.


  The `getContent` function looks like:

  ```typescript
  () => {...}
  ```

  <br />

  - returnsPromise\<object\>
    Chrome 151+

    A function that receives resource content when the request completes.
- setContent void

  Sets the content of the resource.


  The `setContent` function looks like:

  ```typescript
  (content: string, commit: boolean) => {...}
  ```

  <br />

  - content string

    New content of the resource. Only resources with the text type are currently supported.
  - commit boolean

    True if the user has finished editing the resource, and the new content of the resource should be persisted; false if this is a minor change sent in progress of the user editing the resource.
  - returnsPromise\<object\>
    Chrome 151+

    A function called upon request completion.

## Properties

### tabId

The ID of the tab being inspected. This ID may be used with chrome.tabs.\* API.

#### Type

number

## Methods

### eval()

```typescript
chrome.devtools.inspectedWindow.eval(
  expression: string,
  options?: object,
): Promise<object>
```

Evaluates a JavaScript expression in the context of the main frame of the inspected page. The expression must evaluate to a JSON-compliant object, otherwise an exception is thrown. The eval function can report either a DevTools-side error or a JavaScript exception that occurs during evaluation. In either case, the `result` parameter of the callback is `undefined`. In the case of a DevTools-side error, the `isException` parameter is non-null and has `isError` set to true and `code` set to an error code. In the case of a JavaScript error, `isException` is set to true and `value` is set to the string value of thrown object.

#### Parameters

- expression string

  An expression to evaluate.
- options object optional

  The options parameter can contain one or more options.
  - frameURL string optional

    If specified, the expression is evaluated on the iframe whose URL matches the one specified. By default, the expression is evaluated in the top frame of the inspected page.
  - scriptExecutionContext string optional
    Chrome 107+

    Evaluate the expression in the context of a content script of an extension that matches the specified origin. If given, scriptExecutionContext overrides the 'true' setting on useContentScriptContext.
  - useContentScriptContext boolean optional

    Evaluate the expression in the context of the content script of the calling extension, provided that the content script is already injected into the inspected page. If not, the expression is not evaluated and the callback is invoked with the exception parameter set to an object that has the `isError` field set to true and the `code` field set to `E_NOTFOUND`.

#### Returns

- Promise\<object\>
  Chrome 151+

  A function called when evaluation completes.

### getResources()

```typescript
chrome.devtools.inspectedWindow.getResources(): Promise<https://developer.chrome.com/docs/extensions/reference/api/devtools/inspectedWindow#type-Resource[]>
```

Retrieves the list of resources from the inspected page.

#### Returns

- Promise\<[Resource](https://developer.chrome.com/docs/extensions/reference/api/devtools/inspectedWindow#type-Resource)\[\]\>
  Chrome 151+

  A function that receives the list of resources when the request completes.

### reload()

```typescript
chrome.devtools.inspectedWindow.reload(
  reloadOptions?: object,
): void
```

Reloads the inspected page.

#### Parameters

- reloadOptions object optional
  - ignoreCache boolean optional

    When true, the loader will bypass the cache for all inspected page resources loaded before the `load` event is fired. The effect is similar to pressing Ctrl+Shift+R in the inspected window or within the Developer Tools window.
  - injectedScript string optional

    If specified, the script will be injected into every frame of the inspected page immediately upon load, before any of the frame's scripts. The script will not be injected after subsequent reloads---for example, if the user presses Ctrl+R.
  - userAgent string optional

    If specified, the string will override the value of the `User-Agent` HTTP header that's sent while loading the resources of the inspected page. The string will also override the value of the `navigator.userAgent` property that's returned to any scripts that are running within the inspected page.

## Events

### onResourceAdded

```typescript
chrome.devtools.inspectedWindow.onResourceAdded.addListener(
  callback: function,
)
```

Fired when a new resource is added to the inspected page.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (resource: Resource) => void
  ```

  <br />

  - resource [Resource](https://developer.chrome.com/docs/extensions/reference/api/devtools/inspectedWindow#type-Resource)

### onResourceContentCommitted

```typescript
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(
  callback: function,
)
```

Fired when a new revision of the resource is committed (e.g. user saves an edited version of the resource in the Developer Tools).

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (resource: Resource, content: string) => void
  ```

  <br />

  - resource [Resource](https://developer.chrome.com/docs/extensions/reference/api/devtools/inspectedWindow#type-Resource)
  - content string

<br />