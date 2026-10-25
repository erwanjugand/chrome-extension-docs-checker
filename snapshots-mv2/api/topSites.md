refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.topSites` API to access the top sites (i.e. most visited sites) that are displayed on the new tab page. These do not include shortcuts customized by the user.

<br />

<br />

## Permissions

`topSites`  

<br />

> [!CAUTION]
> This permission [triggers a warning](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings#permissions_with_warnings).

<br />

## Manifest

You must declare the "topSites" permission in your [extension's manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use this API.

    {
      "name": "My extension",
      ...
      "permissions": [
        "topSites",
      ],
      ...
    }

## Examples

To try this API, install the [topSites API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/topSites) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### MostVisitedURL

An object encapsulating a most visited URL, such as the default shortcuts on the new tab page.

#### Properties

- title string

  The title of the page
- url string

  The most visited URL.

## Methods

### get()

Promise

```typescript
chrome.topSites.get(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/topSites#type-MostVisitedURL[]>
```

Gets a list of top sites.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (data: MostVisitedURL[]) => void
  ```

  <br />

  - data [MostVisitedURL](https://developer.chrome.com/docs/extensions/mv2/reference/topSites#type-MostVisitedURL)\[\]

#### Returns

- Promise\<[MostVisitedURL](https://developer.chrome.com/docs/extensions/mv2/reference/topSites#type-MostVisitedURL)\[\]\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

<br />