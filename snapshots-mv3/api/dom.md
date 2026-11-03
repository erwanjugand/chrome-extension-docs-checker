<br />

<br />

## Description

Use the `chrome.dom` API to access special DOM APIs for Extensions

<br />

<br />

<br />

## Availability

Chrome 88+ browser.\* since Chrome 148

<br />

<br />

<br />

## Methods

### openOrClosedShadowRoot()

```typescript
browser.dom.openOrClosedShadowRoot(
  element: HTMLElement,
): object
```

Gets the open shadow root or the closed shadow root hosted by the specified element. If the element doesn't attach the shadow root, it will return null.

#### Parameters

- element HTMLElement

#### Returns

- object

  See <https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot>

<br />