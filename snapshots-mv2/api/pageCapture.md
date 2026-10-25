refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.pageCapture` API to save a tab as MHTML.

<br />

<br />

## Permissions

`pageCapture`  

<br />

> [!CAUTION]
> This permission [triggers a warning](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings#permissions_with_warnings).

<br />

MHTML is a [standard format](https://tools.ietf.org/html/rfc2557) supported by most browsers. It encapsulates in a single file a page
and all its resources (CSS files, images..).

Note that for security reasons a MHTML file can only be loaded from the file system and that it can
only be loaded in the main frame.

## Manifest

You must declare the "pageCapture" permission in the [extension manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use the pageCapture
API. For example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "pageCapture"
      ],
      ...
    }

<br />

## Methods

### saveAsMHTML()

Promise

```typescript
chrome.pageCapture.saveAsMHTML(
  details: object,
  callback?: function,
): Promise<Blob | undefined>
```

Saves the content of the tab with given id as MHTML.

#### Parameters

- details object
  - tabId number

    The id of the tab to save as MHTML.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (mhtmlData?: Blob) => void
  ```

  <br />

  - mhtmlData Blob optional

    The MHTML data as a Blob.

#### Returns

- Promise\<Blob \| undefined\>
  Chrome 116+

  Resolves when the MHTML has been generated.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />