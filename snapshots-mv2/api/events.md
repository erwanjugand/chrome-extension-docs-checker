refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

The `chrome.events` namespace contains common types used by APIs dispatching events to notify you when something interesting happens.

<br />

<br />

<br />

<br />

An `Event` is an object that allows you to be notified when something interesting happens. Here's an
example of using the `chrome.alarms.onAlarm` event to be notified whenever an alarm has elapsed:

    chrome.alarms.onAlarm.addListener(function(alarm) {
      appendToLog('alarms.onAlarm --'
                  + ' name: '          + alarm.name
                  + ' scheduledTime: ' + alarm.scheduledTime);
    });

As the example shows, you register for notification using `addListener()`. The argument to
`addListener()` is always a function that you define to handle the event, but the parameters to the
function depend on which event you're handling. Checking the documentation for [`alarms.onAlarm`](https://developer.chrome.com/docs/extensions/reference/alarms#event-onAlarm),
you can see that the function has a single parameter: an [`alarms.Alarm`](https://developer.chrome.com/docs/extensions/reference/alarms#type-Alarm) object that has details
about the elapsed alarm.

Example APIs using Events: [alarms](https://developer.chrome.com/docs/extensions/reference/alarms), [i18n](https://developer.chrome.com/docs/extensions/reference/i18n), [identity](https://developer.chrome.com/docs/extensions/reference/identity), [runtime](https://developer.chrome.com/docs/extensions/reference/runtime). Most [chrome
APIs](https://developer.chrome.com/docs/extensions/reference) do.

## Declarative Event Handlers

The declarative event handlers provide a means to define rules consisting of declarative conditions
and actions. Conditions are evaluated in the browser rather than the JavaScript engine which reduces
roundtrip latencies and allows for very high efficiency.

Declarative event handlers are used for example in the [Declarative Web Request API](https://developer.chrome.com/docs/extensions/reference/declarativeWebRequest) and
[Declarative Content API](https://developer.chrome.com/docs/extensions/reference/declarativeContent). This page describes the underlying concepts of all declarative event
handlers.

### Rules

The simplest possible rule consists of one or more conditions and one or more actions:

    var rule = {
      conditions: [ /* my conditions */ ],
      actions: [ /* my actions */ ]
    };

If any of the conditions is fulfilled, all actions are executed.

In addition to conditions and actions you may give each rule an identifier, which simplifies
unregistering previously registered rules, and a priority to define precedences among rules.
Priorities are only considered if rules conflict each other or need to be executed in a specific
order. Actions are executed in descending order of the priority of their rules.

    var rule = {
      id: "my rule",  // optional, will be generated if not set.
      priority: 100,  // optional, defaults to 100.
      conditions: [ /* my conditions */ ],
      actions: [ /* my actions */ ]
    };

### Event objects

Event objects may support rules. These event objects don't call a callback function when
events happen but test whether any registered rule has at least one fulfilled condition and execute
the actions associated with this rule. Event objects supporting the declarative API have three
relevant methods: [`events.Event.addRules`](https://developer.chrome.com/docs/extensions/mv2/reference/events#method-Event-addRules), [`events.Event.removeRules`](https://developer.chrome.com/docs/extensions/mv2/reference/events#method-Event-removeRules), and
[`events.Event.getRules`](https://developer.chrome.com/docs/extensions/mv2/reference/events#method-Event-getRules).

### Adding rules

To add rules call the `addRules()` function of the event object. It takes an array of rule instances
as its first parameter and a callback function that is called on completion.

    var rule_list = [rule1, rule2, ...];
    function addRules(rule_list, function callback(details) {...});

If the rules were inserted successfully, the `details` parameter contains an array of inserted rules
appearing in the same order as in the passed `rule_list` where the optional parameters `id` and
`priority` were filled with the generated values. If any rule is invalid, e.g., because it contained
an invalid condition or action, none of the rules are added and the [runtime.lastError](https://developer.chrome.com/docs/extensions/reference/runtime#property-lastError) variable
is set when the callback function is called. Each rule in `rule_list` must contain a unique
identifier that is not currently used by another rule or an empty identifier.

> [!NOTE]
> **Note:** **Note:** Rules are persistent across browsing sessions. Therefore, you should install rules during extension installation time using the [`runtime.onInstalled`](https://developer.chrome.com/docs/extensions/mv2/reference/runtime#event-onInstalled) event. Note that this event is also triggered when an extension is updated. Therefore, you should first clear previously installed rules and then register new rules.

### Removing rules

To remove rules call the `removeRules()` function. It accepts an optional array of rule identifiers
as its first parameter and a callback function as its second parameter.

    var rule_ids = ["id1", "id2", ...];
    function removeRules(rule_ids, function callback() {...});

If `rule_ids` is an array of identifiers, all rules having identifiers listed in the array are
removed. If `rule_ids` lists an identifier, that is unknown, this identifier is silently ignored. If
`rule_ids` is `undefined`, all registered rules of this extension are removed. The `callback()`
function is called when the rules were removed.

### Retrieving rules

To retrieve a list of currently registered rules, call the `getRules()` function. It accepts an
optional array of rule identifiers with the same semantics as `removeRules` and a callback function.

    var rule_ids = ["id1", "id2", ...];
    function getRules(rule_ids, function callback(details) {...});

The `details` parameter passed to the `callback()` function refers to an array of rules including
filled optional parameters.

### Performance

To achieve maximum performance, you should keep the following guidelines in mind.

**Register and unregister rules in bulk.** After each registration or unregistration, Chrome needs to
update internal data structures. This update is an expensive operation.

Instead of:

    var rule1 = {...};
    var rule2 = {...};
    chrome.declarativeWebRequest.onRequest.addRules([rule1]);
    chrome.declarativeWebRequest.onRequest.addRules([rule2]);

prefer:

    var rule1 = {...};
    var rule2 = {...};
    chrome.declarativeWebRequest.onRequest.addRules([rule1, rule2]);

**Prefer substring matching over regular expressions in an [events.UrlFilter](https://developer.chrome.com/docs/extensions/mv2/reference/events#type-UrlFilter).**
Substring based matching is extremely fast.

Instead of:

    var match = new chrome.declarativeWebRequest.RequestMatcher({
        url: {urlMatches: "example.com/[^?]*foo" } });

prefer:

    var match = new chrome.declarativeWebRequest.RequestMatcher({
        url: {hostSuffix: "example.com", pathContains: "foo"} });

If many rules that share the same actions, merge the rules into one.
Rules trigger their actions as soon as a single condition is fulfilled. This speeds up the
matching and reduces memory consumption for duplicate action sets.

Instead of:

    var condition1 = new chrome.declarativeWebRequest.RequestMatcher({
        url: { hostSuffix: 'example.com' } });
    var condition2 = new chrome.declarativeWebRequest.RequestMatcher({
        url: { hostSuffix: 'foobar.com' } });
    var rule1 = { conditions: [condition1],
                  actions: [new chrome.declarativeWebRequest.CancelRequest()]};
    var rule2 = { conditions: [condition2],
                  actions: [new chrome.declarativeWebRequest.CancelRequest()]};
    chrome.declarativeWebRequest.onRequest.addRules([rule1, rule2]);

prefer:

      var rule = { conditions: [condition1, condition2],
                    actions: [new chrome.declarativeWebRequest.CancelRequest()]};
      chrome.declarativeWebRequest.onRequest.addRules([rule]);

## Filtered events

Filtered events are a mechanism that allows listeners to specify a subset of events that they are
interested in. A listener that uses a filter won't be invoked for events that don't pass the
filter, which makes the listening code more declarative and efficient. A [service worker](https://developer.chrome.com/docs/extensions/mv3/service_workers) need
not be woken up to handle events it doesn't care about.

Filtered events are intended to allow a transition from manual filtering code like this:

    chrome.webNavigation.onCommitted.addListener(function(e) {
      if (hasHostSuffix(e.url, 'google.com') ||
          hasHostSuffix(e.url, 'google.com.au')) {
        // ...
      }
    });

into this:

    chrome.webNavigation.onCommitted.addListener(function(e) {
      // ...
    }, {url: [{hostSuffix: 'google.com'},
              {hostSuffix: 'google.com.au'}]});

Events support specific filters that are meaningful to that event. The list of filters that an event
supports will be listed in the documentation for that event in the "filters" section.

When matching URLs (as in the example above), event filters support the same URL matching
capabilities as expressible with a [`events.UrlFilter`](https://developer.chrome.com/docs/extensions/mv2/reference/events#type-UrlFilter), except for scheme and port matching.

<br />

## Types

### Event

An object which allows the addition and removal of listeners for a Chrome event.

#### Properties

- addListener void

  Registers an event listener *callback* to an event.


  The `addListener` function looks like:

  ```typescript
  (callback: H) => {...}
  ```

  <br />

  - callback H

    Called when an event occurs. The parameters of this function depend on the type of event.
- addRules void

  Registers rules to handle events.


  The `addRules` function looks like:

  ```typescript
  (rules: Rule<anyany>[], callback?: function) => {...}
  ```

  <br />

  - rules [Rule](https://developer.chrome.com/docs/extensions/mv2/reference/events#type-Rule)\<anyany\>\[\]

    Rules to be registered. These do not replace previously registered rules.
  - callback function optional


    The `callback` parameter looks like:

    ```typescript
    (rules: Rule<anyany>[]) => void
    ```

    <br />

    - rules [Rule](https://developer.chrome.com/docs/extensions/mv2/reference/events#type-Rule)\<anyany\>\[\]

      Rules that were registered, the optional parameters are filled with values.
- getRules void

  Returns currently registered rules.


  The `getRules` function looks like:

  ```typescript
  (ruleIdentifiers?: string[], callback: function) => {...}
  ```

  <br />

  - ruleIdentifiers string\[\] optional

    If an array is passed, only rules with identifiers contained in this array are returned.
  - callback function


    The `callback` parameter looks like:

    ```typescript
    (rules: Rule<anyany>[]) => void
    ```

    <br />

    - rules [Rule](https://developer.chrome.com/docs/extensions/mv2/reference/events#type-Rule)\<anyany\>\[\]

      Rules that were registered, the optional parameters are filled with values.
- hasListener void


  The `hasListener` function looks like:

  ```typescript
  (callback: H) => {...}
  ```

  <br />

  - callback H

    Listener whose registration status shall be tested.
  - returnsboolean

    True if *callback* is registered to the event.
- hasListeners void


  The `hasListeners` function looks like:

  ```typescript
  () => {...}
  ```

  <br />

  - returnsboolean

    True if any event listeners are registered to the event.
- removeListener void

  Deregisters an event listener *callback* from an event.


  The `removeListener` function looks like:

  ```typescript
  (callback: H) => {...}
  ```

  <br />

  - callback H

    Listener that shall be unregistered.
- removeRules void

  Unregisters currently registered rules.


  The `removeRules` function looks like:

  ```typescript
  (ruleIdentifiers?: string[], callback?: function) => {...}
  ```

  <br />

  - ruleIdentifiers string\[\] optional

    If an array is passed, only rules with identifiers contained in this array are unregistered.
  - callback function optional


    The `callback` parameter looks like:

    ```typescript
    () => void
    ```

    <br />

### Rule

Description of a declarative rule for handling events.

#### Properties

- actions any\[\]

  List of actions that are triggered if one of the conditions is fulfilled.
- conditions any\[\]

  List of conditions that can trigger the actions.
- id string optional

  Optional identifier that allows referencing this rule.
- priority number optional

  Optional priority of this rule. Defaults to 100.
- tags string\[\] optional

  Tags can be used to annotate rules and perform operations on sets of rules.

### UrlFilter

Filters URLs for various criteria. See [event filtering](https://developer.chrome.com/docs/extensions/reference/events/#filtered). All criteria are case sensitive.

#### Properties

- cidrBlocks string\[\] optional
  Chrome 123+

  Matches if the host part of the URL is an IP address and is contained in any of the CIDR blocks specified in the array.
- hostContains string optional

  Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.
- hostEquals string optional

  Matches if the host name of the URL is equal to a specified string.
- hostPrefix string optional

  Matches if the host name of the URL starts with a specified string.
- hostSuffix string optional

  Matches if the host name of the URL ends with a specified string.
- originAndPathMatches string optional

  Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
- pathContains string optional

  Matches if the path segment of the URL contains a specified string.
- pathEquals string optional

  Matches if the path segment of the URL is equal to a specified string.
- pathPrefix string optional

  Matches if the path segment of the URL starts with a specified string.
- pathSuffix string optional

  Matches if the path segment of the URL ends with a specified string.
- ports (number \| number\[\])\[\] optional

  Matches if the port of the URL is contained in any of the specified port lists. For example `[80, 443, [1000, 1200]]` matches all requests on port 80, 443 and in the range 1000-1200.
- queryContains string optional

  Matches if the query segment of the URL contains a specified string.
- queryEquals string optional

  Matches if the query segment of the URL is equal to a specified string.
- queryPrefix string optional

  Matches if the query segment of the URL starts with a specified string.
- querySuffix string optional

  Matches if the query segment of the URL ends with a specified string.
- schemes string\[\] optional

  Matches if the scheme of the URL is equal to any of the schemes specified in the array.
- urlContains string optional

  Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.
- urlEquals string optional

  Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.
- urlMatches string optional

  Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
- urlPrefix string optional

  Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.
- urlSuffix string optional

  Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.

<br />