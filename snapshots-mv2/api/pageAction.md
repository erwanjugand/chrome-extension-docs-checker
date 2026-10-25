refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.pageAction` API to put icons in the main Google Chrome toolbar, to the right of the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. Page actions appear grayed out when inactive.

<br />

<br />

<br />

## Availability

≤ MV2

<br />

Some examples:

- Subscribe to this page's RSS feed
- Make a slideshow out of this page's photos

The RSS icon in the following screenshot represents a page action that lets you subscribe to the RSS
feed for the current page.

![](https://developer.chrome.com/static/docs/extensions/mv2/reference/pageAction/images/page_action.png)

Hidden page actions appear grayed out. For example, the RSS feed below is grayed out, as you can't
subscribe to the feed for the current page:

![](https://developer.chrome.com/static/docs/extensions/mv2/reference/pageAction/images/page_action_grey.png)

Please consider using a [browser action](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction) instead, so that users can always interact with your
extension.

## Manifest

Register your page action in the [extension manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) like this:

    {
      "name": "My extension",
      ...
      "page_action": {
        "default_icon": {                    // optional
          "16": "images/icon16.png",           // optional
          "24": "images/icon24.png",           // optional
          "32": "images/icon32.png"            // optional
        },
        "default_title": "Google Mail",      // optional; shown in tooltip
        "default_popup": "popup.html"        // optional
      },
      ...
    }

Since devices with less-common scale factors like 1.5x or 1.2x are becoming more common, you are
encouraged to provide multiple sizes for your icons. Chrome will select the closest one and scale it
to fill the 16-dip space. This also ensures that if the icon display size is ever changed, you don't
need to do any more work to provide different icons! However, if the size difference is too extreme,
this scaling can cause the icon to lose detail or look fuzzy.

The old syntax for registering the default icon is still supported:

    {
      "name": "My extension",
      ...
      "page_action": {
        ...
        "default_icon": "images/icon32.png"  // optional
        // equivalent to "default_icon": { "32": "images/icon32.png" }
      },
      ...
    }

## Parts of the UI

Like browser actions, page actions can have an icon, a tooltip, and popup; they can't have badges,
however. In addition, page actions can be grayed out. You can find information about icons,
tooltips, and popups by reading about the [browser action UI](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#ui).

You make a page action appear and be grayed out using the [`pageAction.show`](https://developer.chrome.com/docs/extensions/mv2/reference/pageAction#method-show) and
[`pageAction.hide`](https://developer.chrome.com/docs/extensions/mv2/reference/pageAction#method-hide) methods, respectively. By default, a page action appears grayed out. When you
show it, you specify the tab in which the icon should appear. The icon remains visible until the tab
is closed or starts displaying a different URL (because the user clicks a link, for example).

## Tips

For the best visual impact, follow these guidelines:

- **Do** use page actions for features that make sense for only a few pages.
- **Don't** use page actions for features that make sense for most pages. Use [browser actions](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction) instead.
- **Don't** constantly animate your icon. That's just annoying.

<br />

## Types

### ImageDataType

Pixel data for an image. Must be an ImageData object (for example, from a `canvas` element).

#### Type

ImageData

### TabDetails

Chrome 88+

#### Properties

- tabId number optional

  The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.

## Methods

### getPopup()

Promise

```typescript
chrome.pageAction.getPopup(
  details: TabDetails,
  callback?: function,
): Promise<string>
```

Gets the html document set as the popup for this page action.

#### Parameters

- details [TabDetails](https://developer.chrome.com/docs/extensions/mv2/reference/pageAction#type-TabDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: string) => void
  ```

  <br />

  - result string

#### Returns

- Promise\<string\>
  Chrome 101+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getTitle()

Promise

```typescript
chrome.pageAction.getTitle(
  details: TabDetails,
  callback?: function,
): Promise<string>
```

Gets the title of the page action.

#### Parameters

- details [TabDetails](https://developer.chrome.com/docs/extensions/mv2/reference/pageAction#type-TabDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: string) => void
  ```

  <br />

  - result string

#### Returns

- Promise\<string\>
  Chrome 101+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### hide()

Promise

```typescript
chrome.pageAction.hide(
  tabId: number,
  callback?: function,
): Promise<void>
```

Hides the page action. Hidden page actions still appear in the Chrome toolbar, but are grayed out.

#### Parameters

- tabId number

  The id of the tab for which you want to modify the page action.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 101+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setIcon()

Promise

```typescript
chrome.pageAction.setIcon(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.

#### Parameters

- details object
  - iconIndex number optional

    **Deprecated.** This argument is ignored.
  - imageData ImageData \| object optional

    Either an ImageData object or a dictionary {size -\> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
  - path string \| object optional

    Either a relative image path or a dictionary {size -\> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'
  - tabId number

    The id of the tab for which you want to modify the page action.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 101+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setPopup()

Promise

```typescript
chrome.pageAction.setPopup(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the HTML document to be opened as a popup when the user clicks on the page action's icon.

#### Parameters

- details object
  - popup string

    The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown.
  - tabId number

    The id of the tab for which you want to modify the page action.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 101+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setTitle()

Promise

```typescript
chrome.pageAction.setTitle(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the title of the page action. This is displayed in a tooltip over the page action.

#### Parameters

- details object
  - tabId number

    The id of the tab for which you want to modify the page action.
  - title string

    The tooltip string.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 101+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### show()

Promise

```typescript
chrome.pageAction.show(
  tabId: number,
  callback?: function,
): Promise<void>
```

Shows the page action. The page action is shown whenever the tab is selected.

#### Parameters

- tabId number

  The id of the tab for which you want to modify the page action.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 101+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onClicked

```typescript
chrome.pageAction.onClicked.addListener(
  callback: function,
)
```

Fired when a page action icon is clicked. This event will not fire if the page action has a popup.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tab: tabs.Tab) => void
  ```

  <br />

  - tab [tabs.Tab](https://developer.chrome.com/docs/extensions/mv2/tabs/#type-Tab)

<br />