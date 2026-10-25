<br />

<br />

## Description

The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.

<br />

<br />

<br />

![A screenshot showing suggestions related to the keyword 'Chromium Search'](https://developer.chrome.com/static/docs/extensions/mv2/reference/omnibox/images/omnibox.png)

When the user enters your extension's keyword, the user starts interacting solely with your
extension. Each keystroke is sent to your extension, and you can provide suggestions in response.

The suggestions can be richly formatted in a variety of ways. When the user accepts a suggestion,
your extension is notified and can take action.

<br />

## Manifest

The following keys must be declared [in the manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use this API.
`"omnibox"`  

<br />

You must include an `"omnibox.keyword"` field in the [manifest](https://developer.chrome.com/docs/extensions/reference/manifest) to use the omnibox API. You
should also specify a 16 by 16-pixel icon, which will be displayed in the address bar when suggesting
that users enter keyword mode.

For example:

    {
      "name": "Aaron's omnibox extension",
      "version": "1.0",
      "omnibox": { "keyword" : "aaron" },
      "icons": {
        "16": "16-full-color.png"
      },
      "background": {
        "persistent": false,
        "scripts": ["background.js"]
      }
    }

> [!NOTE]
> **Note:** Chrome automatically creates a grayscale version of your 16x16-pixel icon. You should provide a full-color version so that it can also be used in other situations that require color. For example, the [context menus API](https://developer.chrome.com/docs/extensions/reference/api/contextMenus) also uses a 16x16-pixel icon, but it is displayed in color.

## Examples

To try this API, install the [omnibox API example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/omnibox) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples)
repository.

<br />

## Types

### DefaultSuggestResult

A suggest result.

#### Properties

- description string

  The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match.

### DescriptionStyleType

Chrome 44+

The style type.

#### Enum

"url"   
"match"   
"dim"   

<br />

### OnInputEnteredDisposition

Chrome 44+

The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.

#### Enum

"currentTab"   
"newForegroundTab"   
"newBackgroundTab"   

<br />

### SuggestResult

A suggest result.

#### Properties

- content string

  The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry.
- deletable boolean optional
  Chrome 63+

  Whether the suggest result can be deleted by the user.
- description string

  The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. You must escape the five predefined entities to display them as text: stackoverflow.com/a/1091953/89484

## Methods

### setDefaultSuggestion()

```typescript
chrome.omnibox.setDefaultSuggestion(
  suggestion: DefaultSuggestResult,
): Promise<void>
```

Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.

#### Parameters

- suggestion [DefaultSuggestResult](https://developer.chrome.com/docs/extensions/reference/api/omnibox#type-DefaultSuggestResult)

  A partial SuggestResult object, without the 'content' parameter.

#### Returns

- Promise\<void\>
  Chrome 100+

## Events

### onDeleteSuggestion

Chrome 63+

```typescript
chrome.omnibox.onDeleteSuggestion.addListener(
  callback: function,
)
```

User has deleted a suggested result.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (text: string) => void
  ```

  <br />

  - text string

### onInputCancelled

```typescript
chrome.omnibox.onInputCancelled.addListener(
  callback: function,
)
```

User has ended the keyword input session without accepting the input.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

### onInputChanged

```typescript
chrome.omnibox.onInputChanged.addListener(
  callback: function,
)
```

User has changed what is typed into the omnibox.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (text: string, suggest: function) => void
  ```

  <br />

  - text string
  - suggest function


    The `suggest` parameter looks like:

    ```typescript
    (suggestResults: SuggestResult[]) => void
    ```

    <br />

    - suggestResults [SuggestResult](https://developer.chrome.com/docs/extensions/reference/api/omnibox#type-SuggestResult)\[\]

      Array of suggest results

### onInputEntered

```typescript
chrome.omnibox.onInputEntered.addListener(
  callback: function,
)
```

User has accepted what is typed into the omnibox.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (text: string, disposition: OnInputEnteredDisposition) => void
  ```

  <br />

  - text string
  - disposition [OnInputEnteredDisposition](https://developer.chrome.com/docs/extensions/reference/api/omnibox#type-OnInputEnteredDisposition)

### onInputStarted

```typescript
chrome.omnibox.onInputStarted.addListener(
  callback: function,
)
```

User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

<br />