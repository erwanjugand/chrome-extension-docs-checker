refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

Use the `chrome.tabs` API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.

<br />

<br />

<br />

## Overview

The Tabs API not only offers features for manipulating and managing tabs, but can also detect the
[language](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-detectLanguage) of the tab, take a [screenshot](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-captureVisibleTab), and
[communicate](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-sendMessage) with a tab's content scripts.

> [!NOTE]
> **Note:** The Tabs API can be used by the service worker and extension pages, but not content scripts.

## Permissions

Most features do not require any permissions to use. For example: [creating](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-create) a new tab,
[reloading](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-reload) a tab, [navigating](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-update) to another URL, etc.

There are three permissions developers should be aware of when working with the Tabs API.

The "tabs" permission
:   This permission does not give access to the `chrome.tabs` namespace. Instead, it
    grants an extension the ability to call [`tabs.query()`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-query) against four
    sensitive properties on [`tabs.Tab`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) instances: `url`, `pendingUrl`, `title`, and
    `favIconUrl`.

Host permissions
:   [Host permissions](https://developer.chrome.com/docs/extensions/mv3/match_patterns) allow an extension to read and query a matching tab's four sensitive
    `tabs.Tab` properties. They can also interact directly with the matching tabs using methods such
    as [`tabs.captureVisibleTab()`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-captureVisibleTab),
    [`tabs.executeScript()`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-executeScript), [`tabs.insertCSS()`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-insertCSS), and
    [`tabs.removeCSS()`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-removeCSS).

The "activeTab" permission
:   [`activeTab`](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab) grants an extension temporary host permission for the current tab in
    response to a user invocation. Unlike host permissions, `activeTab` does not trigger any warnings.

## Manifest

The following are examples of how to declare each permission in the [manifest](https://developer.chrome.com/docs/extensions/mv3/manifest):

      {
        "name": "My extension",
        ...
        "permissions": [
          "tabs"
        ],
        ...
      }


      {
        "name": "My extension",
        ...
        "host_permissions": [
          "http://*/*",
          "https://*/*"
        ],
        ...
      }


      {
        "name": "My extension",
        ...
        "permissions": [
          "activeTab"
        ],
        ...
      }


## Use cases

The following sections demonstrate some common use cases.

### Opening an extension page in a new tab

A common pattern for extensions is to open an onboarding page in a new tab when the extension is
installed. The following example shows how to do this.

background.js:

    chrome.runtime.onInstalled.addListener(({reason}) => {
      if (reason === 'install') {
        chrome.tabs.create({
          url: "onboarding.html"
        });
      }
    });

> [!TIP]
> **Success:** This example doesn't require any [permissions](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#manifest).

### Get the current tab

This example demonstrates how an extension's service worker can retrieve the active tab from the
currently-focused window (or most recently-focused window, if no Chrome windows are focused). This
can usually be thought of as the user's current tab.

      async function getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
      }


      function getCurrentTab(callback) {
        let queryOptions = { active: true, lastFocusedWindow: true };
        chrome.tabs.query(queryOptions, ([tab]) => {
          if (chrome.runtime.lastError)
          console.error(chrome.runtime.lastError);
          // `tab` will either be a `tabs.Tab` instance or `undefined`.
          callback(tab);
        });
      }


### Mute the specified tab

This example shows how an extension can toggle the muted state for a given tab.

      async function toggleMuteState(tabId) {
        const tab = await chrome.tabs.get(tabId);
        const muted = !tab.mutedInfo.muted;
        await chrome.tabs.update(tabId, {muted});
        console.log(`Tab ${tab.id} is ${muted ? "muted" : "unmuted"}`);
      }


      function toggleMuteState(tabId) {
        chrome.tabs.get(tabId, async (tab) => {
          let muted = !tab.mutedInfo.muted;
          await chrome.tabs.update(tabId, { muted });
          console.log(`Tab ${tab.id} is ${ muted ? "muted" : "unmuted" }`);
        });
      }


### Move the current tab to the first position when clicked

This example shows how to move a tab while a drag may or may not be in progress. While this example
uses `chrome.tabs.move`, you can use the same waiting pattern for other calls that modify tabs while
a drag is in progress.

      chrome.tabs.onActivated.addListener(moveToFirstPosition);

      async function moveToFirstPosition(activeInfo) {
        try {
          await chrome.tabs.move(activeInfo.tabId, {index: 0});
          console.log("Success.");
        } catch (error) {
          if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
            setTimeout(() => moveToFirstPosition(activeInfo), 50);
          } else {
            console.error(error);
          }
        }
      }

> [!TIP]
> **Success:** Using catch(error) in a Promise context is a way to ensure that an error that otherwise populates chrome.runtime.lastError is not unchecked.


      chrome.tabs.onActivated.addListener(moveToFirstPositionMV2);

      function moveToFirstPositionMV2(activeInfo) {
        chrome.tabs.move(activeInfo.tabId, { index: 0 }, () => {
          if (chrome.runtime.lastError) {
            const error = chrome.runtime.lastError;
            if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
              setTimeout(() => moveToFirstPositionMV2(activeInfo), 50);
            } else {
              console.error(error);
            }
          } else {
            console.log("Success.");
          }
        });
      }


### Pass a message to a selected tab's content script

This example demonstrates how an extension's service worker can communicate with content scripts in specific browser tabs using `tabs.sendMessage()`.

    function sendMessageToActiveTab(message) {
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, message);
      // TODO: Do something with the response.
    }

## Extension examples

For more Tabs API extensions demos, explore any of the following:

- [Manifest V2 - Tabs API extensions](https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/_archive/mv2/api/tabs/).
- [Manifest V3 - Tabs Manager](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.tabs-manager).

<br />

## Types

### MutedInfo

Chrome 46+

The tab's muted state and the reason for the last state change.

#### Properties

- extensionId string optional

  The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
- muted boolean

  Whether the tab is muted (prevented from playing sound). The tab may be muted even if it has not played or is not currently playing sound. Equivalent to whether the 'muted' audio indicator is showing.
- reason [MutedInfoReason](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-MutedInfoReason) optional

  The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.

### MutedInfoReason

Chrome 46+

An event that caused a muted state change.

#### Enum

"user"   
A user input action set the muted state.
"capture"   
Tab capture was started, forcing a muted state change.
"extension"   
An extension, identified by the extensionId field, set the muted state.

<br />

### Tab

#### Properties

- active boolean

  Whether the tab is active in its window. Does not necessarily mean the window is focused.
- audible boolean optional
  Chrome 45+

  Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
- autoDiscardable boolean
  Chrome 54+

  Whether the tab can be discarded automatically by the browser when resources are low.
- discarded boolean
  Chrome 54+

  Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
- favIconUrl string optional

  The URL of the tab's favicon. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. It may also be an empty string if the tab is loading.
- frozen boolean
  Chrome 132+

  Whether the tab is frozen. A frozen tab cannot execute tasks, including event handlers or timers. It is visible in the tab strip and its content is loaded in memory. It is unfrozen on activation.
- groupId number
  Chrome 88+

  The ID of the group that the tab belongs to.
- height number optional

  The height of the tab in pixels.
- highlighted boolean

  Whether the tab is highlighted.
- id number optional

  The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a tab may not be assigned an ID; for example, when querying foreign tabs using the [`sessions`](https://developer.chrome.com/docs/extensions/mv2/sessions/) API, in which case a session ID may be present. Tab ID can also be set to `chrome.tabs.TAB_ID_NONE` for apps and devtools windows.
- incognito boolean

  Whether the tab is in an incognito window.
- index number

  The zero-based index of the tab within its window.
- lastAccessed number
  Chrome 121+

  The last time the tab became active in its window as the number of milliseconds since epoch.
- mutedInfo [MutedInfo](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-MutedInfo) optional
  Chrome 46+

  The tab's muted state and the reason for the last state change.
- openerTabId number optional

  The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
- pendingUrl string optional
  Chrome 79+

  The URL the tab is navigating to, before it has committed. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page and there is a pending navigation.
- pinned boolean

  Whether the tab is pinned.
- selected boolean
  Deprecated

  Please use [`tabs.Tab.highlighted`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#property-Tab-highlighted).

  <br />

  Whether the tab is selected.
- sessionId string optional

  The session ID used to uniquely identify a tab obtained from the [`sessions`](https://developer.chrome.com/docs/extensions/mv2/sessions/) API.
- splitViewId number optional
  Chrome 140+

  The ID of the Split View that the tab belongs to.
- status [TabStatus](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-TabStatus) optional

  The tab's loading status.
- title string optional

  The title of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page.
- url string optional

  The last committed URL of the main frame of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. May be an empty string if the tab has not yet committed. See also [`Tab.pendingUrl`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#property-Tab-pendingUrl).
- width number optional

  The width of the tab in pixels.
- windowId number

  The ID of the window that contains the tab.

### TabStatus

Chrome 44+

The tab's loading status.

#### Enum

"unloaded"   
"loading"   
"complete"   

<br />

### WindowType

Chrome 44+

The type of window.

#### Enum

"normal"   
"popup"   
"panel"   
"app"   
"devtools"   

<br />

### ZoomSettings

Defines how zoom changes in a tab are handled and at what scope.

#### Properties

- defaultZoomFactor number optional
  Chrome 43+

  Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
- mode [ZoomSettingsMode](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-ZoomSettingsMode) optional

  Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`.
- scope [ZoomSettingsScope](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-ZoomSettingsScope) optional

  Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise.

### ZoomSettingsMode

Chrome 44+

Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`.

#### Enum

"automatic"   
Zoom changes are handled automatically by the browser.
"manual"   
Overrides the automatic handling of zoom changes. The `onZoomChange` event will still be dispatched, and it is the extension's responsibility to listen for this event and manually scale the page. This mode does not support `per-origin` zooming, and thus ignores the `scope` zoom setting and assumes `per-tab`.
"disabled"   
Disables all zooming in the tab. The tab reverts to the default zoom level, and all attempted zoom changes are ignored.

<br />

### ZoomSettingsScope

Chrome 44+

Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise.

#### Enum

"per-origin"   
Zoom changes persist in the zoomed page's origin, i.e., all other tabs navigated to that same origin are zoomed as well. Moreover, `per-origin` zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they are all zoomed to the same zoom factor. The `per-origin` scope is only available in the `automatic` mode.
"per-tab"   
Zoom changes only take effect in this tab, and zoom changes in other tabs do not affect the zooming of this tab. Also, `per-tab` zoom changes are reset on navigation; navigating a tab always loads pages with their `per-origin` zoom factors.

<br />

## Properties

### MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND

Chrome 92+

The maximum number of times that [`captureVisibleTab`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-captureVisibleTab) can be called per second. [`captureVisibleTab`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-captureVisibleTab) is expensive and should not be called too often.

#### Value

2   

### SPLIT_VIEW_ID_NONE

Chrome 140+

An ID that represents the absence of a split tab.

#### Value

-1   

### TAB_ID_NONE

Chrome 46+

An ID that represents the absence of a browser tab.

#### Value

-1   

### TAB_INDEX_NONE

Chrome 123+

An index that represents the absence of a tab index in a tab_strip.

#### Value

-1   

## Methods

### captureVisibleTab()

Promise

```typescript
chrome.tabs.captureVisibleTab(
  windowId?: number,
  options?: ImageDetails,
  callback?: function,
): Promise<string>
```

Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the [\<all_urls\>](https://developer.chrome.com/extensions/develop/concepts/declare-permissions) permission or the [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab) permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.

#### Parameters

- windowId number optional

  The target window. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
- options [ImageDetails](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-ImageDetails) optional
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (dataUrl: string) => void
  ```

  <br />

  - dataUrl string

    A data URL that encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML `img` element for display.

#### Returns

- Promise\<string\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### connect()

```typescript
chrome.tabs.connect(
  tabId: number,
  connectInfo?: object,
): runtime.Port
```

Connects to the content script(s) in the specified tab. The [`runtime.onConnect`](https://developer.chrome.com/docs/extensions/mv2/runtime/#event-onConnect) event is fired in each content script running in the specified tab for the current extension. For more details, see [Content Script Messaging](https://developer.chrome.com/docs/extensions/messaging).

#### Parameters

- tabId number
- connectInfo object optional
  - documentId string optional
    Chrome 106+

    Open a port to a specific [document](https://developer.chrome.com/docs/extensions/reference/webNavigation/#document_ids) identified by `documentId` instead of all frames in the tab.
  - frameId number optional

    Open a port to a specific [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) identified by `frameId` instead of all frames in the tab.
  - name string optional

    Is passed into onConnect for content scripts that are listening for the connection event.

#### Returns

- [runtime.Port](https://developer.chrome.com/docs/extensions/mv2/runtime/#type-Port)

  A port that can be used to communicate with the content scripts running in the specified tab. The port's [`runtime.Port`](https://developer.chrome.com/docs/extensions/mv2/runtime/#type-Port) event is fired if the tab closes or does not exist.

### create()

Promise

```typescript
chrome.tabs.create(
  createProperties: object,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab>
```

Creates a new tab.

#### Parameters

- createProperties object
  - active boolean optional

    Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see [`windows.update`](https://developer.chrome.com/docs/extensions/mv2/windows/#method-update)). Defaults to `true`.
  - index number optional

    The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window.
  - openerTabId number optional

    The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
  - pinned boolean optional

    Whether the tab should be pinned. Defaults to `false`
  - selected boolean optional
    Deprecated

    Please use *active*.

    <br />

    Whether the tab should become the selected tab in the window. Defaults to `true`
  - splitWithTabId number optional
    Chrome 155+

    The ID of an existing tab to create a split view with. If specified, the split-with tab must meet the following conditions:
    - It must not be an already split tab.
    - It must be in the same window as the newly created tab.
    - If `windowId` is specified, it must be the same as the split-with tab's window ID.
    - If `index` is specified, it must be an index adjacent to the split-with tab and will affect the relative positioning of the newly created tab.
  - url string optional

    The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page.
  - windowId number optional

    The window in which to create the new tab. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tab: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)

    The created tab.

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### createSplit()

Promise Chrome 155+

```typescript
chrome.tabs.createSplit(
  tabIds: [number, number],
  callback?: function,
): Promise<number>
```

Splits two existing tabs into a Split View.

#### Parameters

- tabIds \[number, number\]

  An array of exactly two tab IDs to pair into a Split View. All tabs must meet the following conditions:

  They must be adjacent.
  They must not already be in a split view.
  They must have matching `windowId`, `pinned`, and `groupId` states.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (splitViewId: number) => void
  ```

  <br />

  - splitViewId number

    The ID of the newly created Split View containing the tabs specified.

#### Returns

- Promise\<number\>


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### detectLanguage()

Promise

```typescript
chrome.tabs.detectLanguage(
  tabId?: number,
  callback?: function,
): Promise<string>
```

Detects the primary language of the content in a tab.

#### Parameters

- tabId number optional

  Defaults to the active tab of the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (language: string) => void
  ```

  <br />

  - language string

    An ISO language code such as `en` or `fr`. For a complete list of languages supported by this method, see [kLanguageInfoTable](https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc). The second to fourth columns are checked and the first non-NULL value is returned, except for Simplified Chinese for which `zh-CN` is returned. For an unknown/undefined language, `und` is returned.

#### Returns

- Promise\<string\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### discard()

Promise Chrome 54+

```typescript
chrome.tabs.discard(
  tabId?: number,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab | undefined>
```

Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.

#### Parameters

- tabId number optional

  The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tab?: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) optional

    The discarded tab, if it was successfully discarded; undefined otherwise.

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) \| undefined\>
  Chrome 88+

  Resolves after the operation is completed.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### duplicate()

Promise

```typescript
chrome.tabs.duplicate(
  tabId: number,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab | undefined>
```

Duplicates a tab.

#### Parameters

- tabId number

  The ID of the tab to duplicate.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tab?: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) optional

    Details about the duplicated tab. The `url`, `pendingUrl`, `title` and `favIconUrl` properties are only included on the [`tabs.Tab`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) object if the extension has the `"tabs"` permission or has host permissions for the page.

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) \| undefined\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### executeScript()

Promise ≤ MV2 Deprecated since Chrome 91

```typescript
chrome.tabs.executeScript(
  tabId?: number,
  details: InjectDetails,
  callback?: function,
): Promise<any[] | undefined>
```

Replaced by [`scripting.executeScript`](https://developer.chrome.com/docs/extensions/mv2/scripting/#method-executeScript) in Manifest V3.

<br />

Injects JavaScript code into a page. For details, see the [programmatic injection](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#programmatic) section of the content scripts doc.

#### Parameters

- tabId number optional

  The ID of the tab in which to run the script; defaults to the active tab of the current window.
- details [InjectDetails](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-InjectDetails)

  Details of the script to run. Either the code or the file property must be set, but both may not be set at the same time.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result?: any[]) => void
  ```

  <br />

  - result any\[\] optional

    The result of the script in every injected frame.

#### Returns

- Promise\<any\[\] \| undefined\>
  Chrome 88+

  Resolves after all the JavaScript has been executed.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### get()

Promise

```typescript
chrome.tabs.get(
  tabId: number,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab>
```

Retrieves details about the specified tab.

#### Parameters

- tabId number
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tab: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getAllInWindow()

Promise ≤ MV2 Deprecated

```typescript
chrome.tabs.getAllInWindow(
  windowId?: number,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab[]>
```

Please use [`tabs.query`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-query) `{windowId: windowId}`.

<br />

Gets details about all tabs in the specified window.

#### Parameters

- windowId number optional

  Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tabs: Tab[]) => void
  ```

  <br />

  - tabs [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\[\]

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\[\]\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getCurrent()

Promise

```typescript
chrome.tabs.getCurrent(
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab | undefined>
```

Gets the tab that this script call is being made from. Returns `undefined` if called from a non-tab context (for example, a background page or popup view).

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tab?: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) optional

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) \| undefined\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getSelected()

Promise ≤ MV2 Deprecated

```typescript
chrome.tabs.getSelected(
  windowId?: number,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab>
```

Please use [`tabs.query`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#method-query) `{active: true}`.

<br />

Gets the tab that is selected in the specified window.

#### Parameters

- windowId number optional

  Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tab: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getZoom()

Promise

```typescript
chrome.tabs.getZoom(
  tabId?: number,
  callback?: function,
): Promise<number>
```

Gets the current zoom factor of a specified tab.

#### Parameters

- tabId number optional

  The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (zoomFactor: number) => void
  ```

  <br />

  - zoomFactor number

    The tab's current zoom factor.

#### Returns

- Promise\<number\>
  Chrome 88+

  Resolves with the tab's current zoom factor after it has been fetched.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getZoomSettings()

Promise

```typescript
chrome.tabs.getZoomSettings(
  tabId?: number,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-ZoomSettings>
```

Gets the current zoom settings of a specified tab.

#### Parameters

- tabId number optional

  The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (zoomSettings: ZoomSettings) => void
  ```

  <br />

  - zoomSettings [ZoomSettings](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-ZoomSettings)

    The tab's current zoom settings.

#### Returns

- Promise\<[ZoomSettings](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-ZoomSettings)\>
  Chrome 88+

  Resolves with the tab's current zoom settings.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### goBack()

Promise Chrome 72+

```typescript
chrome.tabs.goBack(
  tabId?: number,
  callback?: function,
): Promise<void>
```

Go back to the previous page, if one is available.

#### Parameters

- tabId number optional

  The ID of the tab to navigate back; defaults to the selected tab of the current window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### goForward()

Promise Chrome 72+

```typescript
chrome.tabs.goForward(
  tabId?: number,
  callback?: function,
): Promise<void>
```

Go foward to the next page, if one is available.

#### Parameters

- tabId number optional

  The ID of the tab to navigate forward; defaults to the selected tab of the current window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### group()

Promise Chrome 88+

```typescript
chrome.tabs.group(
  options: object,
  callback?: function,
): Promise<number>
```

Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.

#### Parameters

- options object
  - createProperties object optional

    Configurations for creating a group. Cannot be used if groupId is already specified.
    - windowId number optional

      The window of the new group. Defaults to the current window.
  - groupId number optional

    The ID of the group to add the tabs to. If not specified, a new group will be created.
  - tabIds number \| \[number, ...number\[\]\]

    The tab ID or list of tab IDs to add to the specified group.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (groupId: number) => void
  ```

  <br />

  - groupId number

    The ID of the group that the tabs were added to.

#### Returns

- Promise\<number\>


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### highlight()

Promise

```typescript
chrome.tabs.highlight(
  highlightInfo: object,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/windows#type-Window.Window>
```

Highlights the given tabs and focuses on the first of group. Will appear to do nothing if the specified tab is currently active.

#### Parameters

- highlightInfo object
  - tabs number \| number\[\]

    One or more tab indices to highlight.
  - windowId number optional

    The window that contains the tabs.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (window: Window) => void
  ```

  <br />

  - window [Window](https://developer.chrome.com/docs/extensions/mv2/windows/#type-Window)

    Contains details about the window whose tabs were highlighted.

#### Returns

- Promise\<[windows.Window](https://developer.chrome.com/docs/extensions/mv2/windows/#type-Window)\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### insertCSS()

Promise ≤ MV2 Deprecated since Chrome 91

```typescript
chrome.tabs.insertCSS(
  tabId?: number,
  details: InjectDetails,
  callback?: function,
): Promise<void>
```

Replaced by [`scripting.insertCSS`](https://developer.chrome.com/docs/extensions/mv2/scripting/#method-insertCSS) in Manifest V3.

<br />

Injects CSS into a page. Styles inserted with this method can be removed with [`scripting.removeCSS`](https://developer.chrome.com/docs/extensions/mv2/scripting/#method-removeCSS). For details, see the [programmatic injection](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#programmatic) section of the content scripts doc.

#### Parameters

- tabId number optional

  The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
- details [InjectDetails](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-InjectDetails)

  Details of the CSS text to insert. Either the code or the file property must be set, but both may not be set at the same time.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+

  Resolves when all the CSS has been inserted.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### move()

Promise

```typescript
chrome.tabs.move(
  tabIds: number | number[],
  moveProperties: object,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab | Tab[]>
```

Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.

#### Parameters

- tabIds number \| number\[\]

  The tab ID or list of tab IDs to move.
- moveProperties object
  - index number

    The position to move the window to. Use `-1` to place the tab at the end of the window.
  - windowId number optional

    Defaults to the window the tab is currently in.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tabs: Tab | Tab[]) => void
  ```

  <br />

  - tabs [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) \| [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\[\]

    Details about the moved tabs.

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) \| [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\[\]\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### query()

Promise

```typescript
chrome.tabs.query(
  queryInfo: object,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab[]>
```

Gets all tabs that have the specified properties, or all tabs if no properties are specified.

#### Parameters

- queryInfo object
  - active boolean optional

    Whether the tabs are active in their windows.
  - audible boolean optional
    Chrome 45+

    Whether the tabs are audible.
  - autoDiscardable boolean optional
    Chrome 54+

    Whether the tabs can be discarded automatically by the browser when resources are low.
  - currentWindow boolean optional

    Whether the tabs are in the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
  - discarded boolean optional
    Chrome 54+

    Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
  - frozen boolean optional
    Chrome 132+

    Whether the tabs are frozen. A frozen tab cannot execute tasks, including event handlers or timers. It is visible in the tab strip and its content is loaded in memory. It is unfrozen on activation.
  - groupId number optional
    Chrome 88+

    The ID of the group that the tabs are in, or [`tabGroups.TAB_GROUP_ID_NONE`](https://developer.chrome.com/docs/extensions/mv2/tabGroups/#property-TAB_GROUP_ID_NONE) for ungrouped tabs.
  - highlighted boolean optional

    Whether the tabs are highlighted.
  - index number optional

    The position of the tabs within their windows.
  - lastFocusedWindow boolean optional

    Whether the tabs are in the last focused window.
  - muted boolean optional
    Chrome 45+

    Whether the tabs are muted.
  - pinned boolean optional

    Whether the tabs are pinned.
  - splitViewId number optional
    Chrome 140+

    The ID of the Split View that the tabs are in, or [`tabs.SPLIT_VIEW_ID_NONE`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#property-SPLIT_VIEW_ID_NONE) for tabs that aren't in a Split View.
  - status [TabStatus](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-TabStatus) optional

    The tab loading status.
  - title string optional

    Match page titles against a pattern. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page.
  - url string \| string\[\] optional

    Match tabs against one or more [URL patterns](https://developer.chrome.com/docs/extensions/match_patterns). Fragment identifiers are not matched. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page.
  - windowId number optional

    The ID of the parent window, or [`windows.WINDOW_ID_CURRENT`](https://developer.chrome.com/docs/extensions/mv2/windows/#property-WINDOW_ID_CURRENT) for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
  - windowType [WindowType](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-WindowType) optional

    The type of window the tabs are in.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: Tab[]) => void
  ```

  <br />

  - result [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\[\]

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)\[\]\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### reload()

Promise

```typescript
chrome.tabs.reload(
  tabId?: number,
  reloadProperties?: object,
  callback?: function,
): Promise<void>
```

Reload a tab.

#### Parameters

- tabId number optional

  The ID of the tab to reload; defaults to the selected tab of the current window.
- reloadProperties object optional
  - bypassCache boolean optional

    Whether to bypass local caching. Defaults to `false`.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### remove()

Promise

```typescript
chrome.tabs.remove(
  tabIds: number | number[],
  callback?: function,
): Promise<void>
```

Closes one or more tabs.

#### Parameters

- tabIds number \| number\[\]

  The tab ID or list of tab IDs to close.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### removeCSS()

Promise Chrome 87+ ≤ MV2 Deprecated since Chrome 91

```typescript
chrome.tabs.removeCSS(
  tabId?: number,
  details: DeleteInjectionDetails,
  callback?: function,
): Promise<void>
```

Replaced by [`scripting.removeCSS`](https://developer.chrome.com/docs/extensions/mv2/scripting/#method-removeCSS) in Manifest V3.

<br />

Removes from a page CSS that was previously injected by a call to [`scripting.insertCSS`](https://developer.chrome.com/docs/extensions/mv2/scripting/#method-insertCSS).

#### Parameters

- tabId number optional

  The ID of the tab from which to remove the CSS; defaults to the active tab of the current window.
- details [DeleteInjectionDetails](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-DeleteInjectionDetails)

  Details of the CSS text to remove. Either the code or the file property must be set, but both may not be set at the same time.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+

  Resolves when all the CSS has been removed.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### sendMessage()

Promise

```typescript
chrome.tabs.sendMessage(
  tabId: number,
  message: any,
  options?: object,
  callback?: function,
): Promise<any>
```

Sends a single message to the content script(s) in the specified tab. The [`runtime.onMessage`](https://developer.chrome.com/docs/extensions/mv2/runtime/#event-onMessage) event is fired in each content script running in the specified tab for the current extension.

#### Parameters

- tabId number
- message any

  The message to send. This message should be a JSON-ifiable object.
- options object optional
  - documentId string optional
    Chrome 106+

    Send a message to a specific [document](https://developer.chrome.com/docs/extensions/reference/webNavigation/#document_ids) identified by `documentId` instead of all frames in the tab.
  - frameId number optional

    Send a message to a specific [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) identified by `frameId` instead of all frames in the tab.
- callback function optional
  Chrome 99+


  The `callback` parameter looks like:

  ```typescript
  (response: any) => void
  ```

  <br />

  - response any

    The JSON response object sent by the handler of the message.

#### Returns

- Promise\<any\>
  Chrome 99+

  Promise that resolves with the response from the content script. If an error occurs while connecting to the specified tab, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### sendRequest()

Promise ≤ MV2 Deprecated

```typescript
chrome.tabs.sendRequest(
  tabId: number,
  request: any,
  callback?: function,
): Promise<any>
```

Please use [`runtime.sendMessage`](https://developer.chrome.com/docs/extensions/mv2/runtime/#method-sendMessage).

<br />

Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The [`extension.onRequest`](https://developer.chrome.com/docs/extensions/mv2/extension/#event-onRequest) event is fired in each content script running in the specified tab for the current extension.

#### Parameters

- tabId number
- request any
- callback function optional
  Chrome 99+


  The `callback` parameter looks like:

  ```typescript
  (response: any) => void
  ```

  <br />

  - response any

    The JSON response object sent by the handler of the request. If an error occurs while connecting to the specified tab, the promise will be rejected.

#### Returns

- Promise\<any\>
  Chrome 99+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setZoom()

Promise

```typescript
chrome.tabs.setZoom(
  tabId?: number,
  zoomFactor: number,
  callback?: function,
): Promise<void>
```

Zooms a specified tab.

#### Parameters

- tabId number optional

  The ID of the tab to zoom; defaults to the active tab of the current window.
- zoomFactor number

  The new zoom factor. A value of `0` sets the tab to its current default zoom factor. Values greater than `0` specify a (possibly non-default) zoom factor for the tab.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+

  Resolves after the zoom factor has been changed.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setZoomSettings()

Promise

```typescript
chrome.tabs.setZoomSettings(
  tabId?: number,
  zoomSettings: ZoomSettings,
  callback?: function,
): Promise<void>
```

Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.

#### Parameters

- tabId number optional

  The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
- zoomSettings [ZoomSettings](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-ZoomSettings)

  Defines how zoom changes are handled and at what scope.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 88+

  Resolves after the zoom settings are changed.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### ungroup()

Promise Chrome 88+

```typescript
chrome.tabs.ungroup(
  tabIds: number | [number, ...number[]],
  callback?: function,
): Promise<void>
```

Removes one or more tabs from their respective groups. If any groups become empty, they are deleted.

#### Parameters

- tabIds number \| \[number, ...number\[\]\]

  The tab ID or list of tab IDs to remove from their respective groups.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### unsplit()

Promise Chrome 155+

```typescript
chrome.tabs.unsplit(
  splitViewId: number,
  callback?: function,
): Promise<void>
```

Separates the tabs in a Split View into independent tabs.

#### Parameters

- splitViewId number

  The ID of the Split View to separate.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### update()

Promise

```typescript
chrome.tabs.update(
  tabId?: number,
  updateProperties: object,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab | undefined>
```

Modifies the properties of a tab. Properties that are not specified in `updateProperties` are not modified.

#### Parameters

- tabId number optional

  Defaults to the selected tab of the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
- updateProperties object
  - active boolean optional

    Whether the tab should be active. Does not affect whether the window is focused (see [`windows.update`](https://developer.chrome.com/docs/extensions/mv2/windows/#method-update)).
  - autoDiscardable boolean optional
    Chrome 54+

    Whether the tab should be discarded automatically by the browser when resources are low.
  - highlighted boolean optional

    Adds or removes the tab from the current selection.
  - muted boolean optional
    Chrome 45+

    Whether the tab should be muted.
  - openerTabId number optional

    The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
  - pinned boolean optional

    Whether the tab should be pinned.
  - selected boolean optional
    Deprecated

    Please use *highlighted*.

    <br />

    Whether the tab should be selected.
  - url string optional

    A URL to navigate the tab to. JavaScript URLs are not supported; use [`scripting.executeScript`](https://developer.chrome.com/docs/extensions/mv2/scripting/#method-executeScript) instead.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (tab?: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) optional

    Details about the updated tab. The `url`, `pendingUrl`, `title` and `favIconUrl` properties are only included on the [`tabs.Tab`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) object if the extension has the `"tabs"` permission or has host permissions for the page.

#### Returns

- Promise\<[Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab) \| undefined\>
  Chrome 88+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onActivated

```typescript
chrome.tabs.onActivated.addListener(
  callback: function,
)
```

Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events so as to be notified when a URL is set.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (activeInfo: object) => void
  ```

  <br />

  - activeInfo object
    - tabId number

      The ID of the tab that has become active.
    - windowId number

      The ID of the window the active tab changed inside of.

### onActiveChanged

≤ MV2 Deprecated

```typescript
chrome.tabs.onActiveChanged.addListener(
  callback: function,
)
```

Please use [`tabs.onActivated`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#event-onActivated).

<br />

Fires when the selected tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to [`tabs.onUpdated`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#event-onUpdated) events so as to be notified when a URL is set.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tabId: number, selectInfo: object) => void
  ```

  <br />

  - tabId number
  - selectInfo object
    - windowId number

      The ID of the window the selected tab changed inside of.

### onAttached

```typescript
chrome.tabs.onAttached.addListener(
  callback: function,
)
```

Fired when a tab is attached to a window; for example, because it was moved between windows.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tabId: number, attachInfo: object) => void
  ```

  <br />

  - tabId number
  - attachInfo object
    - newPosition number
    - newWindowId number

### onCreated

```typescript
chrome.tabs.onCreated.addListener(
  callback: function,
)
```

Fired when a tab is created. Note that the tab's URL and tab group membership may not be set at the time this event is fired, but you can listen to onUpdated events so as to be notified when a URL is set or the tab is added to a tab group.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tab: Tab) => void
  ```

  <br />

  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)

### onDetached

```typescript
chrome.tabs.onDetached.addListener(
  callback: function,
)
```

Fired when a tab is detached from a window; for example, because it was moved between windows.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tabId: number, detachInfo: object) => void
  ```

  <br />

  - tabId number
  - detachInfo object
    - oldPosition number
    - oldWindowId number

### onHighlightChanged

≤ MV2 Deprecated

```typescript
chrome.tabs.onHighlightChanged.addListener(
  callback: function,
)
```

Please use [`tabs.onHighlighted`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#event-onHighlighted).

<br />

Fired when the highlighted or selected tabs in a window changes.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (selectInfo: object) => void
  ```

  <br />

  - selectInfo object
    - tabIds number\[\]

      All highlighted tabs in the window.
    - windowId number

      The window whose tabs changed.

### onHighlighted

```typescript
chrome.tabs.onHighlighted.addListener(
  callback: function,
)
```

Fired when the highlighted or selected tabs in a window changes.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (highlightInfo: object) => void
  ```

  <br />

  - highlightInfo object
    - tabIds number\[\]

      All highlighted tabs in the window.
    - windowId number

      The window whose tabs changed.

### onMoved

```typescript
chrome.tabs.onMoved.addListener(
  callback: function,
)
```

Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response to the manually-moved tab. This event is not fired when a tab is moved between windows; for details, see [`tabs.onDetached`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#event-onDetached).

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tabId: number, moveInfo: object) => void
  ```

  <br />

  - tabId number
  - moveInfo object
    - fromIndex number
    - toIndex number
    - windowId number

### onRemoved

```typescript
chrome.tabs.onRemoved.addListener(
  callback: function,
)
```

Fired when a tab is closed.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tabId: number, removeInfo: object) => void
  ```

  <br />

  - tabId number
  - removeInfo object
    - isWindowClosing boolean

      True when the tab was closed because its parent window was closed.
    - windowId number

      The window whose tab is closed.

### onReplaced

```typescript
chrome.tabs.onReplaced.addListener(
  callback: function,
)
```

Fired when a tab is replaced with another tab due to prerendering or instant.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (addedTabId: number, removedTabId: number) => void
  ```

  <br />

  - addedTabId number
  - removedTabId number

### onSelectionChanged

≤ MV2 Deprecated

```typescript
chrome.tabs.onSelectionChanged.addListener(
  callback: function,
)
```

Please use [`tabs.onActivated`](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#event-onActivated).

<br />

Fires when the selected tab in a window changes.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tabId: number, selectInfo: object) => void
  ```

  <br />

  - tabId number
  - selectInfo object
    - windowId number

      The ID of the window the selected tab changed inside of.

### onUpdated

```typescript
chrome.tabs.onUpdated.addListener(
  callback: function,
)
```

Fired when a tab is updated.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (tabId: number, changeInfo: object, tab: Tab) => void
  ```

  <br />

  - tabId number
  - changeInfo object
    - audible boolean optional
      Chrome 45+

      The tab's new audible state.
    - autoDiscardable boolean optional
      Chrome 54+

      The tab's new auto-discardable state.
    - discarded boolean optional
      Chrome 54+

      The tab's new discarded state.
    - favIconUrl string optional

      The tab's new favicon URL.
    - frozen boolean optional
      Chrome 132+

      The tab's new frozen state.
    - groupId number optional
      Chrome 88+

      The tab's new group.
    - mutedInfo [MutedInfo](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-MutedInfo) optional
      Chrome 46+

      The tab's new muted state and the reason for the change.
    - pinned boolean optional

      The tab's new pinned state.
    - splitViewId number optional
      Chrome 140+

      The tab's new Split View.
    - status [TabStatus](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-TabStatus) optional

      The tab's loading status.
    - title string optional
      Chrome 48+

      The tab's new title.
    - url string optional

      The tab's URL if it has changed.
  - tab [Tab](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-Tab)

### onZoomChange

```typescript
chrome.tabs.onZoomChange.addListener(
  callback: function,
)
```

Fired when a tab is zoomed.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (ZoomChangeInfo: object) => void
  ```

  <br />

  - ZoomChangeInfo object
    - newZoomFactor number
    - oldZoomFactor number
    - tabId number
    - zoomSettings [ZoomSettings](https://developer.chrome.com/docs/extensions/mv2/reference/tabs#type-ZoomSettings)

<br />