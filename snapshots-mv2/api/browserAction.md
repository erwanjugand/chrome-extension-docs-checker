refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its [icon](https://developer.chrome.com/docs/extensions/reference/browserAction/#icon), a browser action can have a [tooltip](https://developer.chrome.com/docs/extensions/reference/browserAction/#tooltip), a [badge](https://developer.chrome.com/docs/extensions/reference/browserAction/#badge), and a [popup](https://developer.chrome.com/docs/extensions/reference/browserAction/#popup).

<br />

<br />

<br />

## Availability

≤ MV2

<br />

In the following figure, the multicolored square to the right of the address bar is the icon for a
browser action. A popup is below the icon.

![](https://developer.chrome.com/static/docs/extensions/mv2/reference/browserAction/images/browser-action.png)

If you want to create an icon that isn't always active, use a [page action](https://developer.chrome.com/docs/extensions/pageAction) instead of a browser
action.

## Manifest

Register your browser action in the [extension manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) like this:

    {
      "name": "My extension",
      ...
      "browser_action": {
        "default_icon": {                // optional
          "16": "images/icon16.png",     // optional
          "24": "images/icon24.png",     // optional
          "32": "images/icon32.png"      // optional
        },
        "default_title": "Google Mail",  // optional, shown in tooltip
        "default_popup": "popup.html"    // optional
      },
      ...
    }

You can provide any size icon to be used in Chrome, and Chrome will select the closest one and scale
it to the appropriate size to fill the 16-dip space. However, if the exact size isn't provided, this
scaling can cause the icon to lose detail or look fuzzy.

Since devices with less-common scale factors like 1.5x or 1.2x are becoming more common, you are
encouraged to provide multiple sizes for your icons. This also ensures that if the icon display size
is ever changed, you don't need to do any more work to provide different icons!

The old syntax for registering the default icon is still supported:

    {
      "name": "My extension",
      ...
      "browser_action": {
        ...
        "default_icon": "images/icon32.png"  // optional
        // equivalent to "default_icon": { "32": "images/icon32.png" }
      },
      ...
    }

## Parts of the UI

A browser action can have an [icon](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#icon), a [tooltip](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#tooltip), a [badge](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#badge), and a [popup](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#popup).

### Icon

The browser action icons in Chrome are 16 dips (device-independent pixels) wide and high. Larger
icons are resized to fit, but for best results, use a 16-dip square icon.

You can set the icon in two ways: using a static image or using the HTML5 [canvas element](https://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html). Using
static images is easier for simple applications, but you can create more dynamic UIs---such as
smooth animation---using the canvas element.

Static images can be in any format WebKit can display, including BMP, GIF, ICO, JPEG, or PNG. For
unpacked extensions, images must be in the PNG format.

To set the icon, use the **default_icon** field of **browser_action** in the [manifest](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#manifest), or call
the [`browserAction.setIcon`](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#method-setIcon) method.

To properly display icon when screen pixel density (ratio `size_in_pixel / size_in_dip`) is
different than 1, the icon can be defined as set of images with different sizes. The actual image to
display will be selected from the set to best fit the pixel size of 16 dip. The icon set can contain
any size icon specification, and Chrome will select the most appropriate one.

### Tooltip

To set the tooltip, use the **default_title** field of **browser_action** in the [manifest](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#manifest), or
call the [`browserAction.setTitle`](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#method-setTitle) method. You can specify locale-specific strings for the
**default_title** field; see [Internationalization](https://developer.chrome.com/extensions/i18n) for details.

### Badge

Browser actions can optionally display a *badge*---a bit of text that is layered over the icon.
Badges make it easy to update the browser action to display a small amount of information about the
state of the extension.

Because the badge has limited space, it should have 4 characters or less.

Set the text and color of the badge using [`browserAction.setBadgeText`](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#method-setBadgeText) and
[`browserAction.setBadgeBackgroundColor`](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#method-setBadgeBackgroundColor), respectively.

### Popup

If a browser action has a popup, the popup appears when the user clicks the extension's icon. The
popup can contain any HTML contents that you like, and it's automatically sized to fit its contents.
The popup cannot be smaller than 25x25 and cannot be larger than 800x600.

To add a popup to your browser action, create an HTML file with the popup's contents. Specify the
HTML file in the **default_popup** field of **browser_action** in the [manifest](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#manifest), or call the
[`browserAction.setPopup`](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#method-setPopup) method.

## Tips

For the best visual impact, follow these guidelines:

- **Do** use browser actions for features that make sense on most pages.
- **Don't** use browser actions for features that make sense for only a few pages. Use [page
  actions](https://developer.chrome.com/extensions/pageAction) instead.
- **Do** use big, colorful icons that make the most of the 16x16-dip space. Browser action icons should seem a little bigger and heavier than page action icons.
- **Don't** attempt to mimic Google Chrome's monochrome menu icon. That doesn't work well with themes, and anyway, extensions should stand out a little.
- **Do** use alpha transparency to add soft edges to your icon. Because many people use themes, your icon should look nice on a variety of background colors.
- **Don't** constantly animate your icon. That's just annoying.

## Examples

You can find simple examples of using browser actions in the [examples/api/browserAction](https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/_archive/mv2/api/browserAction/)
directory. For other examples and for help in viewing the source code, see [Samples](https://developer.chrome.com/docs/extensions/mv2/samples).

<br />

## Types

### TabDetails

Chrome 88+

#### Properties

- tabId number optional

  The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.

## Methods

### disable()

Promise

```typescript
chrome.browserAction.disable(
  tabId?: number,
  callback?: function,
): Promise<void>
```

Disables the browser action for a tab.

#### Parameters

- tabId number optional

  The ID of the tab for which to modify the browser action.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### enable()

Promise

```typescript
chrome.browserAction.enable(
  tabId?: number,
  callback?: function,
): Promise<void>
```

Enables the browser action for a tab. Defaults to enabled.

#### Parameters

- tabId number optional

  The ID of the tab for which to modify the browser action.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getBadgeBackgroundColor()

Promise

```typescript
chrome.browserAction.getBadgeBackgroundColor(
  details: TabDetails,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/extensionTypes#type-ColorArray.ColorArray>
```

Gets the background color of the browser action.

#### Parameters

- details [TabDetails](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#type-TabDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: ColorArray) => void
  ```

  <br />

  - result [ColorArray](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-ColorArray)

#### Returns

- Promise\<[extensionTypes.ColorArray](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-ColorArray)\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getBadgeText()

Promise

```typescript
chrome.browserAction.getBadgeText(
  details: TabDetails,
  callback?: function,
): Promise<string>
```

Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.

#### Parameters

- details [TabDetails](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#type-TabDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: string) => void
  ```

  <br />

  - result string

#### Returns

- Promise\<string\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getPopup()

Promise

```typescript
chrome.browserAction.getPopup(
  details: TabDetails,
  callback?: function,
): Promise<string>
```

Gets the HTML document that is set as the popup for this browser action.

#### Parameters

- details [TabDetails](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#type-TabDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: string) => void
  ```

  <br />

  - result string

#### Returns

- Promise\<string\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getTitle()

Promise

```typescript
chrome.browserAction.getTitle(
  details: TabDetails,
  callback?: function,
): Promise<string>
```

Gets the title of the browser action.

#### Parameters

- details [TabDetails](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#type-TabDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: string) => void
  ```

  <br />

  - result string

#### Returns

- Promise\<string\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setBadgeBackgroundColor()

Promise

```typescript
chrome.browserAction.setBadgeBackgroundColor(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the background color for the badge.

#### Parameters

- details object
  - color string \| [ColorArray](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-ColorArray)

    An array of four integers in the range 0-255 that make up the RGBA color of the badge. Can also be a string with a CSS hex color value; for example, `#FF0000` or `#F00` (red). Renders colors at full opacity.
  - tabId number optional

    Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setBadgeText()

Promise

```typescript
chrome.browserAction.setBadgeText(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the badge text for the browser action. The badge is displayed on top of the icon.

#### Parameters

- details object
  - tabId number optional

    Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
  - text string optional

    Any number of characters can be passed, but only about four can fit into the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setIcon()

Promise

```typescript
chrome.browserAction.setIcon(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the icon for the browser action. The icon can be specified as the path to an image file, as the pixel data from a canvas element, or as a dictionary of one of those. Either the `path` or the `imageData` property must be specified.

#### Parameters

- details object
  - imageData ImageData \| object optional

    Either an ImageData object or a dictionary {size -\> ImageData} representing an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale` \* n is selected, where *n* is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
  - path string \| object optional

    Either a relative image path or a dictionary {size -\> relative image path} pointing to an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale` \* n is selected, where *n* is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'
  - tabId number optional

    Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 116+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setPopup()

Promise

```typescript
chrome.browserAction.setPopup(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the HTML document to be opened as a popup when the user clicks the browser action icon.

#### Parameters

- details object
  - popup string

    The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown.
  - tabId number optional

    Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setTitle()

Promise

```typescript
chrome.browserAction.setTitle(
  details: object,
  callback?: function,
): Promise<void>
```

Sets the title of the browser action. This title appears in the tooltip.

#### Parameters

- details object
  - tabId number optional

    Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
  - title string

    The string the browser action should display when moused over.
- callback function optional
  Chrome 67+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onClicked

```typescript
chrome.browserAction.onClicked.addListener(
  callback: function,
)
```

Fired when a browser action icon is clicked. Does not fire if the browser action has a popup.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tab: tabs.Tab) => void
  ```

  <br />

  - tab [tabs.Tab](https://developer.chrome.com/docs/extensions/mv2/tabs/#type-Tab)

<br />