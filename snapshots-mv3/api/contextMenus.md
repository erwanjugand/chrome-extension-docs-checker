<br />

<br />

## Description

Use the `chrome.contextMenus` API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.

<br />

<br />

## Permissions

`contextMenus`  

<br />

<br />

<br />

You must declare the `"contextMenus"` permission in your extension's manifest to use the API. Also,
you should specify a 16 by 16-pixel icon for display next to your menu item. For example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "contextMenus"
      ],
      "icons": {
        "16": "icon-bitty.png",
        "48": "icon-small.png",
        "128": "icon-large.png"
      },
      ...
    }

## Concepts and usage

Context menu items can appear in any document (or frame within a document), even those with file://
or chrome:// URLs. To control which documents your items can appear in, specify the
`documentUrlPatterns` field when you call the `create()` or `update()` methods.

You can create as many context menu items as you need, but if more than one from your extension is
visible at once, Google Chrome automatically collapses them into a single parent menu.

The bulk of this page contains reference information for the members of this API.
For instructions on using the API, see
[Build a context menu](https://developer.chrome.com/docs/extensions/develop/ui/context-menu).

## Examples

To try this API, install the [contextMenus API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/contextMenus) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### ContextType

Chrome 44+

The different contexts a menu can appear in. Specifying 'all' is equivalent to the combination of all other contexts except for 'launcher' and 'tab'. The 'launcher' context is only supported by apps and is used to add menu items to the context menu that appears when clicking the app icon in the launcher/taskbar/dock/etc. Different platforms might put limitations on what is actually supported in a launcher context menu.

#### Enum

"all"   
"page"   
"frame"   
"selection"   
"link"   
"editable"   
"image"   
"video"   
"audio"   
"launcher"   
"action"   
Applies to the context menu of the extension's action (its toolbar icon).
"tab"   
Applies to the context menu of a tab in the tab strip.

<br />

### CreateProperties

Chrome 123+

Properties of the new context menu item.

#### Properties

- checked boolean optional

  The initial state of a checkbox or radio button: `true` for selected, `false` for unselected. Only one radio button can be selected at a time in a given group.
- contexts \[[ContextType](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-ContextType), ...[ContextType](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-ContextType)\[\]\] optional

  List of contexts this menu item will appear in. Defaults to `['page']`.
- documentUrlPatterns string\[\] optional

  Restricts the item to apply only to documents or frames whose URL matches one of the given patterns. For details on pattern formats, see [Match Patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns).
- enabled boolean optional

  Whether this context menu item is enabled or disabled. Defaults to `true`.
- id string optional

  The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
- parentId string \| number optional

  The ID of a parent menu item; this makes the item a child of a previously added item.
- targetUrlPatterns string\[\] optional

  Similar to `documentUrlPatterns`, filters based on the `src` attribute of `img`, `audio`, and `video` tags and the `href` attribute of `a` tags.
- title string optional

  The text to display in the item; this is *required* unless `type` is `separator`. When the context is `selection`, use `%s` within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".
- type [ItemType](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-ItemType) optional

  The type of menu item. Defaults to `normal`.
- visible boolean optional

  Whether the item is visible in the menu.
- onclick void optional

  A function that is called back when the menu item is clicked. This is not available inside of a service worker; instead, you should register a listener for [`contextMenus.onClicked`](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#event-onClicked).


  The `onclick` function looks like:

  ```typescript
  (info: OnClickData, tab: Tab) => {...}
  ```

  <br />

  - info [OnClickData](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-OnClickData)

    Information about the item clicked and the context where the click happened.
  - tab [Tab](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab)

    The details of the tab where the click took place. This parameter is not present for platform apps.

### ItemType

Chrome 44+

The type of menu item.

#### Enum

"normal"   
"checkbox"   
"radio"   
"separator"   

<br />

### OnClickData

Information sent when a context menu item is clicked.

#### Properties

- checked boolean optional

  A flag indicating the state of a checkbox or radio item after it is clicked.
- editable boolean

  A flag indicating whether the element is editable (text input, textarea, etc.).
- frameId number optional
  Chrome 51+

  The [ID of the frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) of the element where the context menu was clicked, if it was in a frame.
- frameUrl string optional

  The URL of the frame of the element where the context menu was clicked, if it was in a frame.
- linkUrl string optional

  If the element is a link, the URL it points to.
- mediaType string optional

  One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
- menuItemId string \| number

  The ID of the menu item that was clicked.
- pageUrl string optional

  The URL of the page where the menu item was clicked. This property is not set if the click occured in a context where there is no current page, such as in a launcher context menu.
- parentMenuItemId string \| number optional

  The parent ID, if any, for the item clicked.
- selectionText string optional

  The text for the context selection, if any.
- srcUrl string optional

  Will be present for elements with a 'src' URL.
- wasChecked boolean optional

  A flag indicating the state of a checkbox or radio item before it was clicked.

## Properties

### ACTION_MENU_TOP_LEVEL_LIMIT

The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored.

#### Value

6   

## Methods

### create()

```typescript
chrome.contextMenus.create(
  createProperties: CreateProperties,
  callback?: function,
): number | string
```

Creates a new context menu item. If an error occurs during creation, it may not be detected until the creation callback fires; details will be in [`runtime.lastError`](https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError).

#### Parameters

- createProperties [CreateProperties](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-CreateProperties)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- number \| string

  The ID of the newly created item.

### remove()

```typescript
chrome.contextMenus.remove(
  menuItemId: string | number,
): Promise<void>
```

Removes a context menu item.

#### Parameters

- menuItemId string \| number

  The ID of the context menu item to remove.

#### Returns

- Promise\<void\>
  Chrome 123+

  Resolves when the context menu has been removed.

### removeAll()

```typescript
chrome.contextMenus.removeAll(): Promise<void>
```

Removes all context menu items added by this extension.

#### Returns

- Promise\<void\>
  Chrome 123+

  Resolves when removal is complete.

### update()

```typescript
chrome.contextMenus.update(
  id: string | number,
  updateProperties: object,
): Promise<void>
```

Updates a previously created context menu item.

#### Parameters

- id string \| number

  The ID of the item to update.
- updateProperties object

  The properties to update. Accepts the same values as the [`contextMenus.create`](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#method-create) function.
  - checked boolean optional
  - contexts \[[ContextType](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-ContextType), ...[ContextType](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-ContextType)\[\]\] optional
  - documentUrlPatterns string\[\] optional
  - enabled boolean optional
  - parentId string \| number optional

    The ID of the item to be made this item's parent. Note: You cannot set an item to become a child of its own descendant.
  - targetUrlPatterns string\[\] optional
  - title string optional
  - type [ItemType](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-ItemType) optional
  - visible boolean optional
    Chrome 62+

    Whether the item is visible in the menu.
  - onclick void optional


    The `onclick` function looks like:

    ```typescript
    (info: OnClickData, tab: Tab) => {...}
    ```

    <br />

    - info [OnClickData](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-OnClickData)
      Chrome 44+
    - tab [Tab](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab)
      Chrome 44+

      The details of the tab where the click took place. This parameter is not present for platform apps.

#### Returns

- Promise\<void\>
  Chrome 123+

  Resolves when the context menu has been updated.

## Events

### onClicked

```typescript
chrome.contextMenus.onClicked.addListener(
  callback: function,
)
```

Fired when a context menu item is clicked.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (info: OnClickData, tab?: tabs.Tab) => void
  ```

  <br />

  - info [OnClickData](https://developer.chrome.com/docs/extensions/reference/api/contextMenus#type-OnClickData)
  - tab [tabs.Tab](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab) optional

<br />