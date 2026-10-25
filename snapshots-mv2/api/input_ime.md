refresh date: 2026-09-25
robots: noindex

<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use the `chrome.input.ime` API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.

<br />

<br />

## Permissions

`input`  

<br />

<br />

## Availability

ChromeOS only

<br />

## Manifest

You must declare the "input" permission in the [extension manifest](https://developer.chrome.com/docs/extensions/mv3/manifest) to use the input.ime API. For
example:

    {
      "name": "My extension",
      ...
      "permissions": [
        "input"
      ],
      ...
    }

## Examples

The following code creates an IME that converts typed letters to upper case.

    var context_id = -1;

    chrome.input.ime.onFocus.addListener(function(context) {
      context_id = context.contextID;
    });

    chrome.input.ime.onKeyEvent.addListener(
      function(engineID, keyData) {
        if (keyData.type == "keydown" && keyData.key.match(/^[a-z]$/)) {
          chrome.input.ime.commitText({"contextID": context_id,
                                        "text": keyData.key.toUpperCase()});
          return true;
        } else {
          return false;
        }
      }
    );

<br />

## Types

### AssistiveWindowButton

Chrome 85+

ID of buttons in assistive window.

#### Enum

"undo"   
"addToDictionary"   

<br />

### AssistiveWindowProperties

Chrome 85+

Properties of the assistive window.

#### Properties

- announceString string optional

  Strings for ChromeVox to announce.
- type "undo"   
- visible boolean

  Sets true to show AssistiveWindow, sets false to hide.

### AssistiveWindowType

Chrome 85+

Type of assistive window.

#### Value

"undo"   

### AutoCapitalizeType

Chrome 69+

The auto-capitalize type of the text field.

#### Enum

"characters"   
"words"   
"sentences"   

<br />

### InputContext

Describes an input Context

#### Properties

- autoCapitalize [AutoCapitalizeType](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-AutoCapitalizeType)
  Chrome 69+

  The auto-capitalize type of the text field.
- autoComplete boolean

  Whether the text field wants auto-complete.
- autoCorrect boolean

  Whether the text field wants auto-correct.
- contextID number

  This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called.
- shouldDoLearning boolean
  Chrome 68+

  Whether text entered into the text field should be used to improve typing suggestions for the user.
- spellCheck boolean

  Whether the text field wants spell-check.
- type [InputContextType](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-InputContextType)

  Type of value this text field edits, (Text, Number, URL, etc)

### InputContextType

Chrome 44+

Type of value this text field edits, (Text, Number, URL, etc)

#### Enum

"text"   
"search"   
"tel"   
"url"   
"email"   
"number"   
"password"   
"null"   

<br />

### KeyboardEvent

See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent

#### Properties

- altKey boolean optional

  Whether or not the ALT key is pressed.
- altgrKey boolean optional
  Chrome 79+

  Whether or not the ALTGR key is pressed.
- capsLock boolean optional

  Whether or not the CAPS_LOCK is enabled.
- code string

  Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state.
- ctrlKey boolean optional

  Whether or not the CTRL key is pressed.
- extensionId string optional

  The extension ID of the sender of this keyevent.
- key string

  Value of the key being pressed
- keyCode number optional

  The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed.
- requestId string optional

  (Deprecated) The ID of the request. Use the `requestId` param from the `onKeyEvent` event instead.
- shiftKey boolean optional

  Whether or not the SHIFT key is pressed.
- type [KeyboardEventType](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-KeyboardEventType)

  One of keyup or keydown.

### KeyboardEventType

Chrome 44+

#### Enum

"keyup"   
"keydown"   

<br />

### MenuItem

A menu item used by an input method to interact with the user from the language menu.

#### Properties

- checked boolean optional

  Indicates this item should be drawn with a check.
- enabled boolean optional

  Indicates this item is enabled.
- id string

  String that will be passed to callbacks referencing this MenuItem.
- label string optional

  Text displayed in the menu for this item.
- style [MenuItemStyle](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-MenuItemStyle) optional

  The type of menu item.
- visible boolean optional

  Indicates this item is visible.

### MenuItemStyle

Chrome 44+

The type of menu item. Radio buttons between separators are considered grouped.

#### Enum

"check"   
"radio"   
"separator"   

<br />

### MenuParameters

Chrome 88+

#### Properties

- engineID string

  ID of the engine to use.
- items [MenuItem](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-MenuItem)\[\]

  MenuItems to add or update. They will be added in the order they exist in the array.

### MouseButton

Chrome 44+

Which mouse buttons was clicked.

#### Enum

"left"   
"middle"   
"right"   

<br />

### ScreenType

Chrome 44+

The screen type under which the IME is activated.

#### Enum

"normal"   
"login"   
"lock"   
"secondary-login"   

<br />

### UnderlineStyle

Chrome 44+

The type of the underline to modify this segment.

#### Enum

"underline"   
"doubleUnderline"   
"noUnderline"   

<br />

### WindowPosition

Chrome 44+

Where to display the candidate window. If set to 'cursor', the window follows the cursor. If set to 'composition', the window is locked to the beginning of the composition.

#### Enum

"cursor"   
"composition"   

<br />

## Methods

### clearComposition()

Promise

```typescript
chrome.input.ime.clearComposition(
  parameters: object,
  callback?: function,
): Promise<boolean>
```

Clear the current composition. If this extension does not own the active IME, this fails.

#### Parameters

- parameters object
  - contextID number

    ID of the context where the composition will be cleared
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 111+

  Resolves when the operation completes with a boolean indicating if the text was accepted or not. On failure, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### commitText()

Promise

```typescript
chrome.input.ime.commitText(
  parameters: object,
  callback?: function,
): Promise<boolean>
```

Commits the provided text to the current input.

#### Parameters

- parameters object
  - contextID number

    ID of the context where the text will be committed
  - text string

    The text to commit
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 111+

  Resolves when the operation completes with a boolean indicating if the text was accepted or not. On failure, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### deleteSurroundingText()

Promise

```typescript
chrome.input.ime.deleteSurroundingText(
  parameters: object,
  callback?: function,
): Promise<void>
```

Deletes the text around the caret.

#### Parameters

- parameters object
  - contextID number

    ID of the context where the surrounding text will be deleted.
  - engineID string

    ID of the engine receiving the event.
  - length number

    The number of characters to be deleted
  - offset number

    The offset from the caret position where deletion will start. This value can be negative.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 111+

  Resolves when the operation completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### hideInputView()

```typescript
chrome.input.ime.hideInputView(): void
```

Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing.

### keyEventHandled()

```typescript
chrome.input.ime.keyEventHandled(
  requestId: string,
  response: boolean,
): void
```

Indicates that the key event received by onKeyEvent is handled. This should only be called if the onKeyEvent listener is asynchronous.

#### Parameters

- requestId string

  Request id of the event that was handled. This should come from keyEvent.requestId
- response boolean

  True if the keystroke was handled, false if not

### sendKeyEvents()

Promise

```typescript
chrome.input.ime.sendKeyEvents(
  parameters: object,
  callback?: function,
): Promise<void>
```

Sends the key events. This function is expected to be used by virtual keyboards. When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.

#### Parameters

- parameters object
  - contextID number

    ID of the context where the key events will be sent, or zero to send key events to non-input field.
  - keyData [KeyboardEvent](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-KeyboardEvent)\[\]

    Data on the key event.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 111+

  Resolves when the operation completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setAssistiveWindowButtonHighlighted()

Promise Chrome 86+

```typescript
chrome.input.ime.setAssistiveWindowButtonHighlighted(
  parameters: object,
  callback?: function,
): Promise<void>
```

Highlights/Unhighlights a button in an assistive window.

#### Parameters

- parameters object
  - announceString string optional

    The text for the screenreader to announce.
  - buttonID [AssistiveWindowButton](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-AssistiveWindowButton)

    The ID of the button
  - contextID number

    ID of the context owning the assistive window.
  - highlighted boolean

    Whether the button should be highlighted.
  - windowType "undo"   

    The window type the button belongs to.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 111+

  Resolves when the operation completes. On failure, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setAssistiveWindowProperties()

Promise Chrome 85+

```typescript
chrome.input.ime.setAssistiveWindowProperties(
  parameters: object,
  callback?: function,
): Promise<boolean>
```

Shows/Hides an assistive window with the given properties.

#### Parameters

- parameters object
  - contextID number

    ID of the context owning the assistive window.
  - properties [AssistiveWindowProperties](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-AssistiveWindowProperties)

    Properties of the assistive window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 111+

  Resolves when the operation completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setCandidates()

Promise

```typescript
chrome.input.ime.setCandidates(
  parameters: object,
  callback?: function,
): Promise<boolean>
```

Sets the current candidate list. This fails if this extension doesn't own the active IME

#### Parameters

- parameters object
  - candidates object\[\]

    List of candidates to show in the candidate window
    - annotation string optional

      Additional text describing the candidate
    - candidate string

      The candidate
    - id number

      The candidate's id
    - label string optional

      Short string displayed to next to the candidate, often the shortcut key or index
    - parentId number optional

      The id to add these candidates under
    - usage object optional

      The usage or detail description of word.
      - body string

        The body string of detail description.
      - title string

        The title string of details description.
  - contextID number

    ID of the context that owns the candidate window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 111+

  Resolves when the operation completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setCandidateWindowProperties()

Promise

```typescript
chrome.input.ime.setCandidateWindowProperties(
  parameters: object,
  callback?: function,
): Promise<boolean>
```

Sets the properties of the candidate window. This fails if the extension doesn't own the active IME

#### Parameters

- parameters object
  - engineID string

    ID of the engine to set properties on.
  - properties object
    - auxiliaryText string optional

      Text that is shown at the bottom of the candidate window.
    - auxiliaryTextVisible boolean optional

      True to display the auxiliary text, false to hide it.
    - currentCandidateIndex number optional
      Chrome 84+

      The index of the current chosen candidate out of total candidates.
    - cursorVisible boolean optional

      True to show the cursor, false to hide it.
    - pageSize number optional

      The number of candidates to display per page.
    - totalCandidates number optional
      Chrome 84+

      The total number of candidates for the candidate window.
    - vertical boolean optional

      True if the candidate window should be rendered vertical, false to make it horizontal.
    - visible boolean optional

      True to show the Candidate window, false to hide it.
    - windowPosition [WindowPosition](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-WindowPosition) optional

      Where to display the candidate window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 111+

  Resolves when the operation completes.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setComposition()

Promise

```typescript
chrome.input.ime.setComposition(
  parameters: object,
  callback?: function,
): Promise<boolean>
```

Set the current composition. If this extension does not own the active IME, this fails.

#### Parameters

- parameters object
  - contextID number

    ID of the context where the composition text will be set
  - cursor number

    Position in the text of the cursor.
  - segments object\[\] optional

    List of segments and their associated types.
    - end number

      Index of the character to end this segment after.
    - start number

      Index of the character to start this segment at
    - style [UnderlineStyle](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-UnderlineStyle)

      The type of the underline to modify this segment.
  - selectionEnd number optional

    Position in the text that the selection ends at.
  - selectionStart number optional

    Position in the text that the selection starts at.
  - text string

    Text to set
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 111+

  Resolves when the operation completes with a boolean indicating if the text was accepted or not. On failure, the promise will be rejected.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setCursorPosition()

Promise

```typescript
chrome.input.ime.setCursorPosition(
  parameters: object,
  callback?: function,
): Promise<boolean>
```

Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.

#### Parameters

- parameters object
  - candidateID number

    ID of the candidate to select.
  - contextID number

    ID of the context that owns the candidate window.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (success: boolean) => void
  ```

  <br />

  - success boolean

#### Returns

- Promise\<boolean\>
  Chrome 111+

  Resolves when the operation completes


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setMenuItems()

Promise

```typescript
chrome.input.ime.setMenuItems(
  parameters: MenuParameters,
  callback?: function,
): Promise<void>
```

Adds the provided menu items to the language menu when this IME is active.

#### Parameters

- parameters [MenuParameters](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-MenuParameters)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 111+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### updateMenuItems()

Promise

```typescript
chrome.input.ime.updateMenuItems(
  parameters: MenuParameters,
  callback?: function,
): Promise<void>
```

Updates the state of the MenuItems specified

#### Parameters

- parameters [MenuParameters](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-MenuParameters)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 111+

  Resolves when the operation completes


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onActivate

```typescript
chrome.input.ime.onActivate.addListener(
  callback: function,
)
```

This event is sent when an IME is activated. It signals that the IME will be receiving onKeyPress events.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (engineID: string, screen: ScreenType) => void
  ```

  <br />

  - engineID string
  - screen [ScreenType](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-ScreenType)

### onAssistiveWindowButtonClicked

Chrome 85+

```typescript
chrome.input.ime.onAssistiveWindowButtonClicked.addListener(
  callback: function,
)
```

This event is sent when a button in an assistive window is clicked.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (details: object) => void
  ```

  <br />

  - details object
    - buttonID [AssistiveWindowButton](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-AssistiveWindowButton)

      The ID of the button clicked.
    - windowType [AssistiveWindowType](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-AssistiveWindowType)

      The type of the assistive window.

### onBlur

```typescript
chrome.input.ime.onBlur.addListener(
  callback: function,
)
```

This event is sent when focus leaves a text box. It is sent to all extensions that are listening to this event, and enabled by the user.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (contextID: number) => void
  ```

  <br />

  - contextID number

### onCandidateClicked

```typescript
chrome.input.ime.onCandidateClicked.addListener(
  callback: function,
)
```

This event is sent if this extension owns the active IME.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (engineID: string, candidateID: number, button: MouseButton) => void
  ```

  <br />

  - engineID string
  - candidateID number
  - button [MouseButton](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-MouseButton)

### onDeactivated

```typescript
chrome.input.ime.onDeactivated.addListener(
  callback: function,
)
```

This event is sent when an IME is deactivated. It signals that the IME will no longer be receiving onKeyPress events.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (engineID: string) => void
  ```

  <br />

  - engineID string

### onFocus

```typescript
chrome.input.ime.onFocus.addListener(
  callback: function,
)
```

This event is sent when focus enters a text box. It is sent to all extensions that are listening to this event, and enabled by the user.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (context: InputContext) => void
  ```

  <br />

  - context [InputContext](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-InputContext)

### onInputContextUpdate

```typescript
chrome.input.ime.onInputContextUpdate.addListener(
  callback: function,
)
```

This event is sent when the properties of the current InputContext change, such as the the type. It is sent to all extensions that are listening to this event, and enabled by the user.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (context: InputContext) => void
  ```

  <br />

  - context [InputContext](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-InputContext)

### onKeyEvent

```typescript
chrome.input.ime.onKeyEvent.addListener(
  callback: function,
)
```

Fired when a key event is sent from the operating system. The event will be sent to the extension if this extension owns the active IME. The listener function should return true if the event was handled false if it was not. If the event will be evaluated asynchronously, this function must return undefined and the IME must later call keyEventHandled() with the result.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (engineID: string, keyData: KeyboardEvent, requestId: string) => boolean | undefined
  ```

  <br />

  - engineID string
  - keyData [KeyboardEvent](https://developer.chrome.com/docs/extensions/mv2/reference/input_ime#type-KeyboardEvent)
  - requestId string
  - returnsboolean \| undefined

### onMenuItemActivated

```typescript
chrome.input.ime.onMenuItemActivated.addListener(
  callback: function,
)
```

Called when the user selects a menu item

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (engineID: string, name: string) => void
  ```

  <br />

  - engineID string
  - name string

### onReset

```typescript
chrome.input.ime.onReset.addListener(
  callback: function,
)
```

This event is sent when chrome terminates ongoing text input session.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (engineID: string) => void
  ```

  <br />

  - engineID string

### onSurroundingTextChanged

```typescript
chrome.input.ime.onSurroundingTextChanged.addListener(
  callback: function,
)
```

Called when the editable string around caret is changed or when the caret position is moved. The text length is limited to 100 characters for each back and forth direction.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (engineID: string, surroundingInfo: object) => void
  ```

  <br />

  - engineID string
  - surroundingInfo object
    - anchor number

      The beginning position of the selection. This value indicates caret position if there is no selection.
    - focus number

      The ending position of the selection. This value indicates caret position if there is no selection.
    - offset number
      Chrome 46+

      The offset position of `text`. Since `text` only includes a subset of text around the cursor, offset indicates the absolute position of the first character of `text`.
    - text string

      The text around the cursor. This is only a subset of all text in the input field.

<br />