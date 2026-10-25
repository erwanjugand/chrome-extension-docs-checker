<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.fileBrowserHandler` API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.

<br />

## Concepts and usage

The ChromeOS file browser comes up when the user either presses Alt+Shift+M or connects an external storage device, such as an SD card, USB key, external drive, or digital camera. Besides showing the files on external devices, the file browser can also display files that the user has previously saved to the system.

When the user selects one or more files, the file browser adds buttons representing the valid handlers for those files. For example, in the following screenshot, selecting a file with a ".png" suffix results in an "Save to Gallery" button that the user can click.
![A ChromeOS file browser.](https://developer.chrome.com/static/docs/extensions/reference/api/fileBrowserHandler/images/filebrowserhandler.png) A ChromeOS file browser.

<br />

## Permissions

`fileBrowserHandler`  

<br />

You must declare the `"fileBrowserHandler"` permission in the [extension manifest](https://developer.chrome.com/extensions/reference/manifest).

<br />

## Availability

ChromeOS only Foreground only

<br />

<br />

You must use the `"file_browser_handlers"` field to register the extension as a handler of at least one file type. You should also provide a 16 by 16 icon to be displayed on the button. For example:

    {
      "name": "My extension",
      ...
      "file_browser_handlers": [
        {
          "id": "upload",
          "default_title": "Save to Gallery", // What the button will display
          "file_filters": [
            "filesystem:*.jpg",  // To match all files, use "filesystem:*.*"
            "filesystem:*.jpeg",
            "filesystem:*.png"
          ]
        }
      ],
      "permissions" : [
        "fileBrowserHandler"
      ],
      "icons": {
        "16": "icon16.png",
        "48": "icon48.png",
        "128": "icon128.png"
      },
      ...
    }

> [!NOTE]
> **Note:** You can specify locale-specific strings for the value of "default_title". See [Internationalization (i18n)](https://developer.chrome.com/extensions/i18n) for details.

### Implement a file browser handler

To use this API, you must implement a function that handles the `onExecute` event of `browser.fileBrowserHandler`. Your function will be called whenever the user clicks the button that represents your file browser handler. In your function, use the [File System API](https://developer.mozilla.org/docs/Web/API/FileSystemFileEntry) to get access to the file contents. Here is an example:

    browser.fileBrowserHandler.onExecute.addListener(async (id, details) => {
      if (id !== 'upload') {
        return;  // check if you have multiple file_browser_handlers
      }

      for (const entry of detail.entries) {
        // the FileSystemFileEntry doesn't have a Promise API, wrap in one
        const file = await new Promise((resolve, reject) => {
          entry.file(resolve, reject);
        });
        const buffer = await file.arrayBuffer();
        // do something with buffer
      }
    });

Your event handler is passed two arguments:

`id`
:   The `id` value from the manifest file. If your extension implements multiple handlers, you can check the ID value to see which handler has been triggered.

`details`
:   An object describing the event. You can get the file or files that the user has selected from the `entries` field of this object, which is an array of `FileSystemFileEntry` objects.

<br />

## Types

### FileHandlerExecuteEventDetails

Event details payload for fileBrowserHandler.onExecute event.

#### Properties

- entries any\[\]

  Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser).
- tab_id number optional

  The ID of the tab that raised this event. Tab IDs are unique within a browser session.

## Events

### onExecute

```typescript
chrome.fileBrowserHandler.onExecute.addListener(
  callback: function,
)
```

Fired when file system action is executed from ChromeOS file browser.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (id: string, details: FileHandlerExecuteEventDetails) => void
  ```

  <br />

  - id string
  - details [FileHandlerExecuteEventDetails](https://developer.chrome.com/docs/extensions/reference/api/fileBrowserHandler#type-FileHandlerExecuteEventDetails)

<br />