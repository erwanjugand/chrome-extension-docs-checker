<br />

<br />

## Description

Use the `chrome.devtools.performance` API to listen to recording status updates in the Performance panel in DevTools.

<br />

See [DevTools APIs summary](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools) for general introduction to using Developer Tools APIs.

<br />

<br />

## Availability

Chrome 129+

<br />

Starting from Chrome 128, you can listen to notifications of the recording status of the Performance panel.

<br />

## Concepts and usage

The browser.devtools.performance API allows developers to interact with the recording features of the **[Performance panel](https://developer.chrome.com/docs/devtools/performance)** panel in Chrome DevTools. You can use this API to get notifications when recording starts or stops.

Two events are available:

- [onProfilingStarted](https://developer.chrome.com/docs/extensions/reference/api/devtools/performance#event-onProfilingStarted): This event is fired when the **Performance** panel begins recording performance data.
- [onProfilingStopped](https://developer.chrome.com/docs/extensions/reference/api/devtools/performance#event-onProfilingStopped): This event is fired when the **Performance** panel stops recording performance data. stance that associates the current stack trace with the cre Both events don't have any associated parameters.

By listening to these events, developers can create extensions that react to the recording status in the **Performance** panel, providing additional automation during performance profiling.

## Examples

This is how you can use the API to listen to recording status updates


    browser.devtools.performance.onProfilingStarted.addListener(() => {
      // Profiling started listener implementation
    });

    browser.devtools.performance.onProfilingStopped.addListener(() => {
      // Profiling stopped listener implementation
    })

<br />

## Events

### onProfilingStarted

```typescript
chrome.devtools.performance.onProfilingStarted.addListener(
  callback: function,
)
```

Fired when the Performance panel starts recording.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

### onProfilingStopped

```typescript
chrome.devtools.performance.onProfilingStopped.addListener(
  callback: function,
)
```

Fired when the Performance panel stops recording.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

<br />