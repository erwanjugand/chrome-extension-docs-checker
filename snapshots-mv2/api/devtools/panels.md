refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.devtools.panels` API to integrate your extension into Developer Tools window UI: create your own panels, access existing panels, and add sidebars.

<br />

<br />

<br />

<br />

## Manifest

The following keys must be declared [in the manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use this API.
`"devtools_page"`  

<br />

See [DevTools APIs summary](https://developer.chrome.com/docs/extensions/mv3/devtools) for general introduction to using Developer Tools APIs.

## Overview

Each extension panel and sidebar is displayed as a separate HTML page. All extension pages displayed
in the Developer Tools window have access to all modules in `chrome.devtools` API, as well as to
[chrome.extension](https://developer.chrome.com/docs/extensions/reference/extension) API. Other extension APIs are not available to the pages within Developer
Tools window, but you may invoke them by sending a request to the background page of your extension,
similarly to how it's done in the [content scripts](https://developer.chrome.com/docs/extensions/mv3/overview#contentScripts).

You can use the [`devtools.panels.setOpenResourceHandler`](https://developer.chrome.com/docs/extensions/reference/devtools_panels#method-setOpenResourceHandler) method to install a callback function
that handles user requests to open a resource (typically, a click on a resource link in the
Developer Tools window). At most one of the installed handlers gets called; users can specify (using
the Developer Tools Settings dialog) either the default behavior or an extension to handle resource
open requests. If an extension calls `setOpenResourceHandler()` multiple times, only the last
handler is retained.

## Examples

The following code adds a panel contained in `Panel.html`, represented by `FontPicker.png` on the
Developer Tools toolbar and labeled as *Font Picker*:

    chrome.devtools.panels.create("Font Picker",
                                  "FontPicker.png",
                                  "Panel.html",
                                  function(panel) { ... });

The following code adds a sidebar pane contained in `Sidebar.html` and titled *Font Properties* to
the Elements panel, then sets its height to `8ex`:

    chrome.devtools.panels.elements.createSidebarPane("Font Properties",
      function(sidebar) {
        sidebar.setPage("Sidebar.html");
        sidebar.setHeight("8ex");
      }
    );

This screenshot demonstrates the effect the above examples would have on Developer Tools window:

![Extension icon panel on DevTools toolbar](https://developer.chrome.com/static/images/devtools-panels.png)

To try this API, install the [devtools panels API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/devtools/panels) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### Button

A button created by the extension.

#### Properties

- onClicked Event\<functionvoidvoid\>

  Fired when the button is clicked.


  The `onClicked.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

- update void

  Updates the attributes of the button. If some of the arguments are omitted or `null`, the corresponding attributes are not updated.


  The `update` function looks like:

  ```typescript
  (iconPath?: string, tooltipText?: string, disabled?: boolean) => {...}
  ```

  <br />

  - iconPath string optional

    Path to the new icon of the button.
  - tooltipText string optional

    Text shown as a tooltip when user hovers the mouse over the button.
  - disabled boolean optional

    Whether the button is disabled.

### ElementsPanel

Represents the Elements panel.

#### Properties

- onSelectionChanged Event\<functionvoidvoid\>

  Fired when an object is selected in the panel.


  The `onSelectionChanged.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

- createSidebarPane void
  Promise

  Creates a pane within panel's sidebar.


  The `createSidebarPane` function looks like:

  ```typescript
  (title: string, callback?: function) => {...}
  ```

  <br />

  - title string

    Text that is displayed in sidebar caption.
  - callback function optional


    The `callback` parameter looks like:

    ```typescript
    (result: ExtensionSidebarPane) => void
    ```

    <br />

    - result [ExtensionSidebarPane](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ExtensionSidebarPane)

      An ExtensionSidebarPane object for created sidebar pane.
  - returnsPromise\<[ExtensionSidebarPane](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ExtensionSidebarPane)\>
    Chrome 152+

    A callback invoked when the sidebar is created.


    Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### ExtensionPanel

Represents a panel created by an extension.

#### Properties

- onHidden Event\<functionvoidvoid\>

  Fired when the user switches away from the panel.


  The `onHidden.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

- onSearch Event\<functionvoidvoid\>

  Fired upon a search action (start of a new search, search result navigation, or search being canceled).


  The `onSearch.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    (action: string, queryString?: string) => void
    ```

    <br />

    - action string
    - queryString string optional
- onShown Event\<functionvoidvoid\>

  Fired when the user switches to the panel.


  The `onShown.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    (window: Window) => void
    ```

    <br />

    - window Window
- createStatusBarButton void

  Appends a button to the status bar of the panel.


  The `createStatusBarButton` function looks like:

  ```typescript
  (iconPath: string, tooltipText: string, disabled: boolean) => {...}
  ```

  <br />

  - iconPath string

    Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed.
  - tooltipText string

    Text shown as a tooltip when user hovers the mouse over the button.
  - disabled boolean

    Whether the button is disabled.
  - returns[Button](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-Button)
- show void
  Chrome 140+

  Shows the panel by activating the corresponding tab.


  The `show` function looks like:

  ```typescript
  () => {...}
  ```

  <br />

### ExtensionSidebarPane

A sidebar created by the extension.

#### Properties

- onHidden Event\<functionvoidvoid\>

  Fired when the sidebar pane becomes hidden as a result of the user switching away from the panel that hosts the sidebar pane.


  The `onHidden.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

- onShown Event\<functionvoidvoid\>

  Fired when the sidebar pane becomes visible as a result of user switching to the panel that hosts it.


  The `onShown.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    (window: Window) => void
    ```

    <br />

    - window Window
- setExpression void
  Promise

  Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.


  The `setExpression` function looks like:

  ```typescript
  (expression: string, rootTitle?: string, callback?: function) => {...}
  ```

  <br />

  - expression string

    An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.
  - rootTitle string optional

    An optional title for the root of the expression tree.
  - callback function optional


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - returnsPromise\<void\>
    Chrome 152+

    A callback invoked after the sidebar pane is updated with the expression evaluation results.


    Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.
- setHeight void

  Sets the height of the sidebar.


  The `setHeight` function looks like:

  ```typescript
  (height: string) => {...}
  ```

  <br />

  - height string

    A CSS-like size specification, such as `'100px'` or `'12ex'`.
- setObject void
  Promise

  Sets a JSON-compliant object to be displayed in the sidebar pane.


  The `setObject` function looks like:

  ```typescript
  (jsonObject: string, rootTitle?: string, callback?: function) => {...}
  ```

  <br />

  - jsonObject string

    An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).
  - rootTitle string optional

    An optional title for the root of the expression tree.
  - callback function optional


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

  - returnsPromise\<void\>
    Chrome 152+

    A callback invoked after the sidebar is updated with the object.


    Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.
- setPage void

  Sets an HTML page to be displayed in the sidebar pane.


  The `setPage` function looks like:

  ```typescript
  (path: string) => {...}
  ```

  <br />

  - path string

    Relative path of an extension page to display within the sidebar.

### SourcesPanel

Represents the Sources panel.

#### Properties

- onSelectionChanged Event\<functionvoidvoid\>

  Fired when an object is selected in the panel.


  The `onSelectionChanged.addListener` function looks like:

  ```typescript
  (callback: function) => {...}
  ```

  <br />

  - callback function


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

- createSidebarPane void
  Promise

  Creates a pane within panel's sidebar.


  The `createSidebarPane` function looks like:

  ```typescript
  (title: string, callback?: function) => {...}
  ```

  <br />

  - title string

    Text that is displayed in sidebar caption.
  - callback function optional


    The `callback` parameter looks like:

    ```typescript
    (result: ExtensionSidebarPane) => void
    ```

    <br />

    - result [ExtensionSidebarPane](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ExtensionSidebarPane)

      An ExtensionSidebarPane object for created sidebar pane.
  - returnsPromise\<[ExtensionSidebarPane](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ExtensionSidebarPane)\>
    Chrome 152+

    A callback invoked when the sidebar is created.


    Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### Theme

Chrome 99+

Theme used by DevTools.

#### Enum

"default"   
Default DevTools theme. This is always the light theme.
"dark"   
Dark theme.

<br />

## Properties

### elements

Elements panel.

#### Type

[ElementsPanel](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ElementsPanel)

### sources

Sources panel.

#### Type

[SourcesPanel](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-SourcesPanel)

### themeName

Chrome 59+

The name of the color theme set in user's DevTools settings. Possible values: `default` (the default) and `dark`.

#### Type

string

## Methods

### create()

Promise

```typescript
chrome.devtools.panels.create(
  title: string,
  iconPath: string,
  pagePath: string,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ExtensionPanel>
```

Creates an extension panel.

#### Parameters

- title string

  Title that is displayed next to the extension icon in the Developer Tools toolbar.
- iconPath string

  Path of the panel's icon relative to the extension directory.
- pagePath string

  Path of the panel's HTML page relative to the extension directory.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (panel: ExtensionPanel) => void
  ```

  <br />

  - panel [ExtensionPanel](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ExtensionPanel)

    An ExtensionPanel object representing the created panel.

#### Returns

- Promise\<[ExtensionPanel](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-ExtensionPanel)\>
  Chrome 152+

  A function that is called when the panel is created.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### openResource()

Promise

```typescript
chrome.devtools.panels.openResource(
  url: string,
  lineNumber: number,
  columnNumber?: number,
  callback?: function,
): Promise<void>
```

Requests DevTools to open a URL in a Developer Tools panel.

#### Parameters

- url string

  The URL of the resource to open.
- lineNumber number

  Specifies the line number to scroll to when the resource is loaded.
- columnNumber number optional
  Chrome 114+

  Specifies the column number to scroll to when the resource is loaded.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 152+

  A function that is called when the resource has been successfully loaded.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setOpenResourceHandler()

```typescript
chrome.devtools.panels.setOpenResourceHandler(
  callback?: function,
): void
```

Specifies the function to be called when the user clicks a resource link in the Developer Tools window. To unset the handler, either call the method with no parameters or pass null as the parameter.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (resource: Resource, lineNumber: number) => void
  ```

  <br />

  - resource [Resource](https://developer.chrome.com/docs/extensions/mv2/reference/devtools_inspectedWindow/#type-Resource)

    A [`devtools.inspectedWindow.Resource`](https://developer.chrome.com/docs/extensions/mv2/reference/devtools_inspectedWindow/#type-Resource) object for the resource that was clicked.
  - lineNumber number

    Specifies the line number within the resource that was clicked.

### setThemeChangeHandler()

Chrome 99+

```typescript
chrome.devtools.panels.setThemeChangeHandler(
  callback?: function,
): void
```

Specifies the function to be called when the current theme changes in DevTools. To unset the handler, either call the method with no parameters or pass `null` as the parameter.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (theme: Theme) => void
  ```

  <br />

  - theme [Theme](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels#type-Theme)

    Current theme in DevTools.

<br />