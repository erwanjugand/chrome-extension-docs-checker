<br />

<br />

## Description

Use the `chrome.pageCapture` API to save a tab as MHTML.

<br />

MHTML is a [standard format](https://tools.ietf.org/html/rfc2557) supported by most browsers. It encapsulates in a single file a page
and all its resources (CSS files, images..).

Note that for security reasons a MHTML file can only be loaded from the file system and that it can
only be loaded in the main frame.

<br />

## Permissions

`pageCapture`  

<br />

You must declare the "pageCapture" permission in the [extension manifest](https://developer.chrome.com/docs/extensions/reference/manifest) to use the pageCapture
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

<br />

<br />

## Methods

### saveAsMHTML()

```typescript
chrome.pageCapture.saveAsMHTML(
  details: object,
): Promise<Blob | undefined>
```

Saves the content of the tab with given id as MHTML.

#### Parameters

- details object
  - tabId number

    The id of the tab to save as MHTML.

#### Returns

- Promise\<Blob \| undefined\>
  Chrome 116+

  Resolves when the MHTML has been generated.

<br />