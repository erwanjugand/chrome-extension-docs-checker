refresh date: 2026-09-25
robots: noindex

<br />

<br />

## Description

The `chrome.declarativeNetRequest` API is used to block or modify network requests by specifying declarative rules. This lets extensions modify network requests without intercepting them and viewing their content, thus providing more privacy.

<br />

<br />

## Permissions

`declarativeNetRequest`  
`declarativeNetRequestWithHostAccess`  

<br />

`declarativeNetRequestFeedback`  
[`host_permissions`](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#host-permissions)  

> [!CAUTION]
> One or more of these permissions [trigger a warning](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings#permissions_with_warnings). The \`declarativeNetRequest\` and \`declarativeNetRequestWithHostAccess\` permissions provide the same capabilities, and both require host permissions; however, the latter prevents host permission warnings.

<br />

## Availability

Chrome 84+

<br />

## Manifest

In addition to the permissions described above, certain types of rulesets, static rulesets specifically, require declaring the `"declarative_net_request"` manifest key, which should be a dictionary with a single key called `"rule_resources"`. This key is an array containing dictionaries of type `Ruleset`, as shown below. (Note that the name 'Ruleset' does not appear in the manifest's JSON since it is merely an array.) [Static rulesets](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#rules) are explained later in this document.

    {
      "name": "My extension",
      ...

      "declarative_net_request" : {
        "rule_resources" : [{
          "id": "ruleset_1",
          "enabled": true,
          "path": "rules_1.json"
        }, {
          "id": "ruleset_2",
          "enabled": false,
          "path": "rules_2.json"
        }]
      },
      "permissions": [
        "declarativeNetRequest",
        "declarativeNetRequestFeedback",
      ],
      "host_permissions": [
        "http://www.blogger.com/*",
        "http://*.google.com/*"
      ],
      ...
    }

## Concepts and usage

To use this API, specify one or more rulesets. A ruleset contains an array of rules. A single rule does one of the following:

- Block a network request.
- Upgrade the schema (http to https).
- Prevent a request from getting blocked by negating any matching blocked rules.
- Redirect a network request.
- Modify request or response headers.

There are three types of rulesets, managed in slightly different ways.

Dynamic
:   Persist across browser sessions and extension upgrades and are managed using JavaScript while an extension is in use.

Session
:   Cleared when the browser shuts down and when a new version of the extension is installed. Session rules are managed using JavaScript while an extension is in use.

Static
:   Packaged, installed, and updated when an extension is installed or upgraded. Static rules are stored in JSON-formatted rule files and listed in the manifest file.

The next few sections explain ruleset types in detail.

### Dynamic and session-scoped rulesets

Dynamic and session rulesets are managed using JavaScript while an extension is in use.

- Dynamic rules persist across browser sessions and extension upgrades.
- Session rules are cleared when the browser shuts down and when a new version of the extension is installed.

There is only one each of these ruleset types. An extension can add or remove rules to them dynamically by calling [`updateDynamicRules()`](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest#method-updateDynamicRules) and [`updateSessionRules()`](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest#method-updateSessionRules), provided the rule limits aren't exceeded. For information on rule limits, see [Rule limits](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#limits). You can see [an example of this](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#update-dynamic-rule-examples) under [code examples](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#code-examples).

### Static rulesets

Unlike dynamic and session rules, static rules are packaged, installed, and updated when an extension is installed or upgraded. They're stored in rule files in JSON format, which are indicated to the extension using the `"declarative_net_request"` and `"rule_resources"` keys [as described above](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#manifest), as well as one or more [`Ruleset`](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest#type-Ruleset) dictionaries. A `Ruleset` dictionary contains a path to the rule file, an ID for the ruleset contained in the file, and whether the ruleset is enabled or disabled. The last two are important when you enable or disable a ruleset programmatically.

    {
      ...
      "declarative_net_request" : {
        "rule_resources" : [{
          "id": "ruleset_1",
          "enabled": true,
          "path": "rules_1.json"
        },
        ...
        ]
      }
      ...
    }

To test rule files, [load your extension unpacked](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics#load-unpacked). Errors and warnings about invalid static rules are only displayed for unpacked extensions. Invalid static rules in packed extensions are ignored.

### Enable and disable static rules and rulesets

Both individual static rules and complete static rulesets may be enabled or disabled at runtime.

The set of enabled static rules and rulesets is persisted across browser sessions. Neither are persisted across extension updates, meaning that only rules you chose to leave in your rule files are available after an update.

For performance reasons there are also limits to the number of rules and rulesets that may be enabled at one time. Call [`getAvailableStaticRuleCount()`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#method-getAvailableStaticRuleCount) to check the number of additional rules that may be enabled. For information on rule limits, see [Rule limits](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#limits).

To enable or disable static *rules* , call [`updateStaticRules()`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#method-updateStaticRules). This method takes an [`UpdateStaticRulesOptions`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-UpdateStaticRulesOptions) object, which contains arrays of IDs of rules to enable or disable. The IDs are defined using the `"id"` key of the `Ruleset` dictionary.

To enable or disable static *rulesets* , call [`updateEnabledRulesets()`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#method-updateEnabledRulesets). This method takes an [`UpdateRulesetOptions`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-UpdateRulesetOptions) object, which contains arrays of IDs of rulesets to enable or disable. The IDs are defined using the `"id"` key of the `Ruleset` dictionary.

### Build rules

Regardless of type, a rule starts with four fields as shown below. While the `"id"` and `"priority"` keys take a number, the [`"action"`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-Rule-action) and [`"condition"`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-Rule-condition) keys may provide several blocking and redirecting conditions. The following rule blocks all script requests originating from `"foo.com"` to any URL with `"abc"` as a substring.

    {
      "id" : 1,
      "priority": 1,
      "action" : { "type" : "block" },
      "condition" : {
        "urlFilter" : "abc",
        "initiatorDomains" : ["foo.com"],
        "resourceTypes" : ["script"]
      }
    }

### urlFilter matching characters

A rule's `"condition"` key allows a `"urlFilter"` key for acting on URLs under a specified domain. You create patterns using [pattern matching tokens](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest#property-RuleCondition-urlFilter). A few examples are shown below.

| `urlFilter` | Matches | Does not match |
|---|---|---|
| `"abc"` | https://abcd.com https://example.com/abcd | https://ab.com |
| `"abc*d"` | https://abcd.com https://example.com/abcxyzd | https://abc.com |
| `"||a.example.com"` | https://a.example.com/ https://b.a.example.com/xyz | https://example.com/ |
| `"|https*"` | https://example.com | http://example.com/ http://https.com |
| `"example*^123|"` | https://example.com/123 http://abc.com/example?123 | https://example.com/1234 https://abc.com/example0123 |

### Rule prioritization

Rules are triggered by requests sent from web pages. If multiple rules match a particular request, then the rules must be prioritized. This section explains how they're prioritized. Prioritization happens in two stages.

1. Priority is determined for rules within an extension.
2. If more than one extension can apply a rule to a request, priority is determined for all extensions that match a particular request.

Thinking of matching this way: whatever rule a particular extension prioritizes will then be prioritized against rules from other extensions.

> [!CAUTION]
> **Caution:**Avoid writing rules with the same action and priority that must run in a particular order. Rules with the same action and priority (e.g., redirect rules with priority 1) are executed in an arbitrary order which is not defined and can change between runs or browser versions, even when spread between multiple types of ruleset (e.g, a static rule and a session rule). This is the case across browsers.

#### Rule prioritization within an extension

Within a single extension, prioritization is worked out using the following process:

1. The rule with the highest developer-defined priority (in other words, the `"priority"` field) is returned.
2. If there is more than one rule with the highest developer-defined priority, rules are prioritized using the `"action"` field, in the following order:

   1. `allow`
   2. `allowAllRequests`
   3. `block`
   4. `upgradeScheme`
   5. `redirect`
3. If the action type is not `block` or `redirect`, any matching `modifyHeaders` rules are evaluated. Be aware that if there are any rules with a developer-defined priority lower than the priority specified for `allow` and `allowAllRequests`, such rules are ignored.

4. If multiple rules modify the same header, modification is determined by the developer-defined `"priority"` field and by the specified operations.

   - If a rule appends to a header, then lower priority rules can only append to that header. Set and remove operations are not allowed.
   - If a rule sets a header, then lower priority rules can only append to that header. No other modifications are allowed.
   - If a rule removes a header, then lower priority rules cannot further modify the header.

#### Rule prioritization between extensions

If only one extension has a rule that matches a request, that rule is applied. But if more than one extension matches a request, the following process is used:

1. Rules are prioritized using the `"action"` field, in the following order:

   1. `block`
   2. `redirect` or `upgradeScheme`
   3. `allow` or `allowAllRequests`
2. If more than one rule matches, the most recently installed extension gets priority.

### Rule limits

There is a performance overhead to loading and evaluating rules in the browser,
so some limits apply when using the API. Limits depend on the type of
rule you're using.

#### Static rules

Static rules are those specified in rule files declared in the manifest file. An extension can specify up to 50 static [rulesets](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) as part of the `"rule_resources"` manifest key, but only 10 of these rulesets can be enabled at a time. The latter is called the [`MAX_NUMBER_OF_ENABLED_STATIC_RULESETS`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-MAX_NUMBER_OF_ENABLED_STATIC_RULESETS). Collectively, those rulesets are guaranteed at least 30,000 rules. This is called the [`GUARANTEED_MINIMUM_STATIC_RULES`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-GUARANTEED_MINIMUM_STATIC_RULES).

The number of rules available after that depends on how many rules are enabled by all the extensions installed on a user's browser. You can find this number at runtime by calling [`getAvailableStaticRuleCount()`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#method-getAvailableStaticRuleCount). You can see [an example of this](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#update-static-rulesets) under [code examples](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#code-examples).

#### Dynamic and session rules

The limits applied to dynamic and session rules are simpler than static rules. The total number of both cannot exceed 5000. This is called the [`MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES).

#### Rules that use regex

All types of rules can use regular expressions; however, the total number of regex rules of each type cannot exceed 1000. This is called the [MAX_NUMBER_OF_REGEX_RULES](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-MAX_NUMBER_OF_REGEX_RULES).

Additionally, each rule must be less than 2KB once compiled. This roughly correlates with the complexity of the rule. If you try to load a rule that exceeds this limit, you will see a warning like the one below and the rule will be ignored.

    rules_1.json: Rule with id 1 specified a more complex regex than allowed
    as part of the "regexFilter" key.

### Interactions with service workers

A declarativeNetRequest only applies to requests that reach the network stack. This includes responses from the HTTP cache, but may not include responses that go through a service worker's `onfetch` handler. declarativeNetRequest won't affect responses generated by the service worker or retrieved from `CacheStorage`, but it will affect calls to `fetch()` made in a service worker.

### Web accessible resources

A declarativeNetRequest rule cannot redirect from a public resource request to a resource that is not web accessible. Doing so triggers an error. This is true even if the specified web accessible resource is owned by the redirecting extension. To declare resources for declarativeNetRequest, use the manifest's [`"web_accessible_resources"`](https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources) array.

## Examples

### Code examples

#### Update dynamic rules

The following example shows how to call `updateDynamicRules()`. The procedure for `updateSessionRules()` is the same.

    // Get arrays containing new and old rules
    const newRules = await getNewRules();
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    const oldRuleIds = oldRules.map(rule => rule.id);

    // Use the arrays to update the dynamic rules
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: oldRuleIds,
      addRules: newRules
    });

#### Update static rulesets

The following example shows how to enable and disable rulesets while considering the number of available and the maximum number of enabled static rulesets. You would do this when the number of static rules you need exceeds the number allowed. For this to work, some of your rulesets should be installed with some of your rulesets disabled (setting `"Enabled"` to `false` within the manifest file).

    async function updateStaticRules(enableRulesetIds, disableCandidateIds) {
      // Create the options structure for the call to updateEnabledRulesets()
      let options = { enableRulesetIds: enableRulesetIds }
      // Get the number of enabled static rules
      const enabledStaticCount = await chrome.declarativeNetRequest.getEnabledRulesets();
      // Compare rule counts to determine if anything needs to be disabled so that
      // new rules can be enabled
      const proposedCount = enableRulesetIds.length;
      if (enabledStaticCount + proposedCount > chrome.declarativeNetRequest.MAX_NUMBER_OF_ENABLED_STATIC_RULESETS) {
        options.disableRulesetIds = disableCandidateIds
      }
      // Update the enabled static rules
      await chrome.declarativeNetRequest.updateEnabledRulesets(options);
    }

### Rule examples

The examples below illustrate how Chrome prioritizes rules in an extension. When reviewing them, you may want to open the [prioritization](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#implementation-matching-algorithm) rules in a separate window.

#### The "priority" key

These examples require [host permission](https://developer.chrome.com/docs/extensions/mv3/declare_permissions) to `*://*.example.com/*`.

To work out the priority of a particular URL, look at the (developer-defined) `"priority"` key, the `"action"` key and the `"urlFilter"` key. These examples refer to the example rule file shown below them.

Navigation to https://google.com
:   Two rules cover this URL: the rules with IDs 1 and 4. The rule with ID 1 applies because `"block"` actions have a higher priority than `"redirect"` actions. The remaining rules do not apply because they are for longer URLs.

Navigation to https://google.com/1234
:   Because of the longer URL, the rule with ID 2 now matches in addition to the rules with IDs 1 and 4. The rule with ID 2 applies because `"allow"` has a higher priority than `"block"` and `"redirect"`.

Navigation to https://google.com/12345
:   All four rules match this URL. The rule with ID 3 applies because its developer-defined priority is the highest of the group.

    [
      {
        "id": 1,
        "priority": 1,
        "action": { "type": "block" },
        "condition": {"urlFilter": "google.com", "resourceTypes": ["main_frame"] }
      },
      {
        "id": 2,
        "priority": 1,
        "action": { "type": "allow" },
        "condition": { "urlFilter": "google.com/123", "resourceTypes": ["main_frame"] }
      },
      {
        "id": 3,
        "priority": 2,
        "action": { "type": "block" },
        "condition": { "urlFilter": "google.com/12345", "resourceTypes": ["main_frame"] }
      },
      {
        "id": 4,
        "priority": 1,
        "action": { "type": "redirect", "redirect": { "url": "https://example.com" } },
        "condition": { "urlFilter": "google.com", "resourceTypes": ["main_frame"] }
      },
    ]

#### Redirects

The example below requires [host permission](https://developer.chrome.com/docs/extensions/mv3/declare_permissions) to `*://*.example.com/*`.

The following example shows how to redirect a request from example.com to a page within the extension itself. The extension path `/a.jpg` resolves to `chrome-extension://EXTENSION_ID/a.jpg`, where `EXTENSION_ID` is the ID of your extension. For this to work the manifest should declare `/a.jpg` as a [web accessible resource](https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources).

    {
      "id": 1,
      "priority": 1,
      "action": { "type": "redirect", "redirect": { "extensionPath": "/a.jpg" } },
      "condition": {
        "urlFilter": "https://www.example.com",
        "resourceTypes": ["main_frame"]
      }
    }

The following uses the `"transform"` key to redirect to a subdomain of example.com. It uses a domain name anchor ("\|\|") to intercept requests with any scheme from example.com. The `"scheme"` key in `"transform"` specifies that redirects to the subdomain will always use "https".

    {
      "id": 1,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "transform": { "scheme": "https", "host": "new.example.com" }
        }
      },
      "condition": {
        "urlFilter": "||example.com",
        "resourceTypes": ["main_frame"]
      }
    }

The following example uses regular expressions to redirect from `https://www.abc.xyz.com/path` to `https://abc.xyz.com/path`. In the `"regexFilter"` key, notice how periods are escaped and that the capturing group selects either "abc" or "def". The `"regexSubstitution"` key specifies the first returned match of the regular expression using "\\1". In this case, "abc" is captured from the redirected URL and placed in the substitution.

    {
      "id": 1,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "regexSubstitution": "https://\\1.xyz.com/"
        }
      },
      "condition": {
        "regexFilter": "^https://www\\.(abc|def)\\.xyz\\.com/",
        "resourceTypes": [
          "main_frame"
        ]
      }
    }

#### Headers

The following example removes all cookies from both a main frame and any sub frames.

    {
      "id": 1,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "requestHeaders": [{ "header": "cookie", "operation": "remove" }]
      },
      "condition": { "resourceTypes": ["main_frame", "sub_frame"] }
    }

<br />

## Types

### DomainType

This describes whether the request is first or third party to the frame in which it originated. A request is said to be first party if it has the same domain (eTLD+1) as the frame in which the request originated.

#### Enum

"firstParty"   
The network request is first party to the frame in which it originated.
"thirdParty"   
The network request is third party to the frame in which it originated.

<br />

### ExtensionActionOptions

Chrome 88+

#### Properties

- displayActionCountAsBadgeText boolean optional

  Whether to automatically display the action count for a page as the extension's badge text. This preference is persisted across sessions.
- tabUpdate [TabActionCountUpdate](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-TabActionCountUpdate) optional
  Chrome 89+

  Details of how the tab's action count should be adjusted.

### GetDisabledRuleIdsOptions

Chrome 111+

#### Properties

- rulesetId string

  The id corresponding to a static [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset).

### GetRulesFilter

Chrome 111+

#### Properties

- ruleIds number\[\] optional

  If specified, only rules with matching IDs are included.

### HeaderInfo

Chrome 128+

#### Properties

- excludedValues string\[\] optional

  If specified, this condition is not matched if the header exists but its value contains at least one element in this list. This uses the same match pattern syntax as `values`.
- header string

  The name of the header. This condition matches on the name only if both `values` and `excludedValues` are not specified.
- values string\[\] optional

  If specified, this condition matches if the header's value matches at least one pattern in this list. This supports case-insensitive header value matching plus the following constructs:

  **'\*'** : Matches any number of characters.

  **'?'** : Matches zero or one character(s).

  '\*' and '?' can be escaped with a backslash, e.g. '\\\*' and '\\?'

### HeaderOperation

Chrome 86+

This describes the possible operations for a "modifyHeaders" rule.

#### Enum

"append"   
Adds a new entry for the specified header. When modifying the headers of a request, this operation is only supported for [specific headers](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#header_modification).
"set"   
Sets a new value for the specified header, removing any existing headers with the same name.
"remove"   
Removes all entries for the specified header.

<br />

### IsRegexSupportedResult

Chrome 87+

#### Properties

- isSupported boolean
- reason [UnsupportedRegexReason](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-UnsupportedRegexReason) optional

  Specifies the reason why the regular expression is not supported. Only provided if `isSupported` is false.

### MatchedRule

#### Properties

- ruleId number

  A matching rule's ID.
- rulesetId string

  ID of the [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) this rule belongs to. For a rule originating from the set of dynamic rules, this will be equal to [`DYNAMIC_RULESET_ID`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-DYNAMIC_RULESET_ID).

### MatchedRuleInfo

#### Properties

- rule [MatchedRule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-MatchedRule)
- tabId number

  The tabId of the tab from which the request originated if the tab is still active. Else -1.
- timeStamp number

  The time the rule was matched. Timestamps will correspond to the Javascript convention for times, i.e. number of milliseconds since the epoch.

### MatchedRuleInfoDebug

#### Properties

- request [RequestDetails](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RequestDetails)

  Details about the request for which the rule was matched.
- rule [MatchedRule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-MatchedRule)

### MatchedRulesFilter

#### Properties

- minTimeStamp number optional

  If specified, only matches rules after the given timestamp.
- tabId number optional

  If specified, only matches rules for the given tab. Matches rules not associated with any active tab if set to -1.

### ModifyHeaderInfo

Chrome 86+

#### Properties

- header string

  The name of the header to be modified.
- operation [HeaderOperation](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-HeaderOperation)

  The operation to be performed on a header.
- value string optional

  The new value for the header. Must be specified for `append` and `set` operations.

### QueryKeyValue

#### Properties

- key string
- replaceOnly boolean optional
  Chrome 94+

  If true, the query key is replaced only if it's already present. Otherwise, the key is also added if it's missing. Defaults to false.
- value string

### QueryTransform

#### Properties

- addOrReplaceParams [QueryKeyValue](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-QueryKeyValue)\[\] optional

  The list of query key-value pairs to be added or replaced.
- removeParams string\[\] optional

  The list of query keys to be removed.

### Redirect

#### Properties

- extensionPath string optional

  Path relative to the extension directory. Should start with '/'.
- regexSubstitution string optional

  Substitution pattern for rules which specify a `regexFilter`. The first match of `regexFilter` within the url will be replaced with this pattern. Within `regexSubstitution`, backslash-escaped digits (\\1 to \\9) can be used to insert the corresponding capture groups. \\0 refers to the entire matching text.
- transform [URLTransform](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-URLTransform) optional

  Url transformations to perform.
- url string optional

  The redirect url. Redirects to JavaScript urls are not allowed.

### RegexOptions

Chrome 87+

#### Properties

- isCaseSensitive boolean optional

  Whether the `regex` specified is case sensitive. Default is true.
- regex string

  The regular expresson to check.
- requireCapturing boolean optional

  Whether the `regex` specified requires capturing. Capturing is only required for redirect rules which specify a `regexSubstition` action. The default is false.

### RequestDetails

#### Properties

- documentId string optional
  Chrome 106+

  The unique identifier for the frame's document, if this request is for a frame.
- documentLifecycle [DocumentLifecycle](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-DocumentLifecycle) optional
  Chrome 106+

  The lifecycle of the frame's document, if this request is for a frame.
- frameId number

  The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
- frameType [FrameType](https://developer.chrome.com/docs/extensions/mv2/extensionTypes/#type-FrameType) optional
  Chrome 106+

  The type of the frame, if this request is for a frame.
- initiator string optional

  The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
- method string

  Standard HTTP method.
- parentDocumentId string optional
  Chrome 106+

  The unique identifier for the frame's parent document, if this request is for a frame and has a parent.
- parentFrameId number

  ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
- requestId string

  The ID of the request. Request IDs are unique within a browser session.
- tabId number

  The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
- type [ResourceType](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-ResourceType)

  The resource type of the request.
- url string

  The URL of the request.

### RequestMethod

Chrome 91+

This describes the HTTP request method of a network request.

#### Enum

"connect"   
"delete"   
"get"   
"head"   
"options"   
"patch"   
"post"   
"put"   
"other"   

<br />

### ResourceType

This describes the resource type of the network request.

#### Enum

"main_frame"   
"sub_frame"   
"stylesheet"   
"script"   
"image"   
"font"   
"object"   
"xmlhttprequest"   
"ping"   
"csp_report"   
"media"   
"websocket"   
"webtransport"   
"webbundle"   
"other"   

<br />

### Rule

#### Properties

- action [RuleAction](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RuleAction)

  The action to take if this rule is matched.
- condition [RuleCondition](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RuleCondition)

  The condition under which this rule is triggered.
- id number

  An id which uniquely identifies a rule. Mandatory and should be \>= 1.
- priority number optional

  Rule priority. Defaults to 1. When specified, should be \>= 1.

### RuleAction

#### Properties

- redirect [Redirect](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Redirect) optional

  Describes how the redirect should be performed. Only valid for redirect rules.
- requestHeaders [ModifyHeaderInfo](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-ModifyHeaderInfo)\[\] optional
  Chrome 86+

  The request headers to modify for the request. Only valid if RuleActionType is "modifyHeaders".
- responseHeaders [ModifyHeaderInfo](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-ModifyHeaderInfo)\[\] optional
  Chrome 86+

  The response headers to modify for the request. Only valid if RuleActionType is "modifyHeaders".
- type [RuleActionType](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RuleActionType)

  The type of action to perform.

### RuleActionType

Describes the kind of action to take if a given RuleCondition matches.

#### Enum

"block"   
Block the network request.
"redirect"   
Redirect the network request.
"allow"   
Allow the network request. The request won't be intercepted if there is an allow rule which matches it.
"upgradeScheme"   
Upgrade the network request url's scheme to https if the request is http or ftp.
"modifyHeaders"   
Modify request/response headers from the network request.
"allowAllRequests"   
Allow all requests within a frame hierarchy, including the frame request itself.

<br />

### RuleCondition

#### Properties

- domainType [DomainType](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-DomainType) optional

  Specifies whether the network request is first-party or third-party to the domain from which it originated. If omitted, all requests are accepted.
- domains string\[\] optional
  Deprecated since Chrome 101

  Use [`initiatorDomains`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-RuleCondition-initiatorDomains) instead

  <br />

  The rule will only match network requests originating from the list of `domains`.
- excludedDomains string\[\] optional
  Deprecated since Chrome 101

  Use [`excludedInitiatorDomains`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-RuleCondition-excludedInitiatorDomains) instead

  <br />

  The rule will not match network requests originating from the list of `excludedDomains`.
- excludedInitiatorDomains string\[\] optional
  Chrome 101+

  The rule will not match network requests originating from the list of `excludedInitiatorDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `initiatorDomains`.

  Notes:
  - Sub-domains like "a.example.com" are also allowed.
  - The entries must consist of only ascii characters.
  - Use punycode encoding for internationalized domains.
  - This matches against the request initiator and not the request url.
  - Sub-domains of the listed domains are also excluded.
- excludedRequestDomains string\[\] optional
  Chrome 101+

  The rule will not match network requests when the domains matches one from the list of `excludedRequestDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `requestDomains`.

  Notes:
  - Sub-domains like "a.example.com" are also allowed.
  - The entries must consist of only ascii characters.
  - Use punycode encoding for internationalized domains.
  - Sub-domains of the listed domains are also excluded.
- excludedRequestMethods [RequestMethod](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RequestMethod)\[\] optional
  Chrome 91+

  List of request methods which the rule won't match. Only one of `requestMethods` and `excludedRequestMethods` should be specified. If neither of them is specified, all request methods are matched.
- excludedResourceTypes [ResourceType](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-ResourceType)\[\] optional

  List of resource types which the rule won't match. Only one of `resourceTypes` and `excludedResourceTypes` should be specified. If neither of them is specified, all resource types except "main_frame" are blocked.
- excludedResponseHeaders [HeaderInfo](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-HeaderInfo)\[\] optional
  Chrome 128+

  Rule does not match if the request matches any response header condition in this list (if specified). If both `excludedResponseHeaders` and `responseHeaders` are specified, then the `excludedResponseHeaders` property takes precedence.
- excludedTabIds number\[\] optional
  Chrome 92+

  List of [`tabs.Tab.id`](https://developer.chrome.com/docs/extensions/mv2/tabs/#property-Tab-id) which the rule should not match. An ID of [`tabs.TAB_ID_NONE`](https://developer.chrome.com/docs/extensions/mv2/tabs/#property-TAB_ID_NONE) excludes requests which don't originate from a tab. Only supported for session-scoped rules.
- excludedTopDomains string\[\] optional
  Chrome 145+

  The rule will not match network requests when the associated top-level frame's domain matches one from the list of `excludedTopDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `topDomains`.

  Notes:
  - Sub-domains like "a.example.com" are also allowed.
  - The entries must consist of only ascii characters.
  - Use punycode encoding for internationalized domains.
  - Sub-domains of the listed domains are also excluded.
  - For requests with no associated top-level frame (e.g. ServiceWorker initiated requests, the request initiator's domain is considered instead.
- initiatorDomains string\[\] optional
  Chrome 101+

  The rule will only match network requests originating from the list of `initiatorDomains`. If the list is omitted, the rule is applied to requests from all domains. An empty list is not allowed.

  Notes:
  - Sub-domains like "a.example.com" are also allowed.
  - The entries must consist of only ascii characters.
  - Use punycode encoding for internationalized domains.
  - This matches against the request initiator and not the request url.
  - Sub-domains of the listed domains are also matched.
- isUrlFilterCaseSensitive boolean optional

  Whether the `urlFilter` or `regexFilter` (whichever is specified) is case sensitive. Default is false.
- regexFilter string optional

  Regular expression to match against the network request url. This follows the [RE2 syntax](https://github.com/google/re2/wiki/Syntax).

  Note: Only one of `urlFilter` or `regexFilter` can be specified.

  Note: The `regexFilter` must be composed of only ASCII characters. This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.
- requestDomains string\[\] optional
  Chrome 101+

  The rule will only match network requests when the domain matches one from the list of `requestDomains`. If the list is omitted, the rule is applied to requests from all domains. An empty list is not allowed.

  Notes:
  - Sub-domains like "a.example.com" are also allowed.
  - The entries must consist of only ascii characters.
  - Use punycode encoding for internationalized domains.
  - Sub-domains of the listed domains are also matched.
- requestMethods [RequestMethod](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RequestMethod)\[\] optional
  Chrome 91+

  List of HTTP request methods which the rule can match. An empty list is not allowed.

  Note: Specifying a `requestMethods` rule condition will also exclude non-HTTP(s) requests, whereas specifying `excludedRequestMethods` will not.
- resourceTypes [ResourceType](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-ResourceType)\[\] optional

  List of resource types which the rule can match. An empty list is not allowed.

  Note: this must be specified for `allowAllRequests` rules and may only include the `sub_frame` and `main_frame` resource types.
- responseHeaders [HeaderInfo](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-HeaderInfo)\[\] optional
  Chrome 128+

  Rule matches if the request matches any response header condition in this list (if specified).
- tabIds number\[\] optional
  Chrome 92+

  List of [`tabs.Tab.id`](https://developer.chrome.com/docs/extensions/mv2/tabs/#property-Tab-id) which the rule should match. An ID of [`tabs.TAB_ID_NONE`](https://developer.chrome.com/docs/extensions/mv2/tabs/#property-TAB_ID_NONE) matches requests which don't originate from a tab. An empty list is not allowed. Only supported for session-scoped rules.
- topDomains string\[\] optional
  Chrome 145+

  The rule will only match network requests when the associated top-level frame's domain matches one from the list of `topDomains`. If the list is omitted, the rule is applied to requests associated with all top-level frame domains. An empty list is not allowed.

  Notes:
  - Sub-domains like "a.example.com" are also allowed.
  - The entries must consist of only ascii characters.
  - Use punycode encoding for internationalized domains.
  - Sub-domains of the listed domains are also matched.
  - For requests with no associated top-level frame (e.g. ServiceWorker initiated requests, the request initiator's domain is considered instead.
- urlFilter string optional

  The pattern which is matched against the network request url. Supported constructs:

  **'\*'** : Wildcard: Matches any number of characters.

  **'\|'** : Left/right anchor: If used at either end of the pattern, specifies the beginning/end of the url respectively.

  **'\|\|'** : Domain name anchor: If used at the beginning of the pattern, specifies the start of a (sub-)domain of the URL.

  **'\^'** : Separator character: This matches anything except a letter, a digit, or one of the following: `_`, `-`, `.`, or `%`. This also match the end of the URL.

  Therefore `urlFilter` is composed of the following parts: (optional Left/Domain name anchor) + pattern + (optional Right anchor).

  If omitted, all urls are matched. An empty string is not allowed.

  A pattern beginning with `||*` is not allowed. Use `*` instead.

  Note: Only one of `urlFilter` or `regexFilter` can be specified.

  Note: The `urlFilter` must be composed of only ASCII characters. This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8. For example, when the request url is http://abc.рф?q=ф, the `urlFilter` will be matched against the url http://abc.xn--p1ai/?q=%D1%84.

### RuleConditionKeys

Chrome 145+

#### Enum

"urlFilter"   
"regexFilter"   
"isUrlFilterCaseSensitive"   
"initiatorDomains"   
"excludedInitiatorDomains"   
"requestDomains"   
"excludedRequestDomains"   
"topDomains"   
"excludedTopDomains"   
"domains"   
"excludedDomains"   
"resourceTypes"   
"excludedResourceTypes"   
"requestMethods"   
"excludedRequestMethods"   
"domainType"   
"tabIds"   
"excludedTabIds"   
"responseHeaders"   
"excludedResponseHeaders"   

<br />

### Ruleset

#### Properties

- enabled boolean

  Whether the ruleset is enabled by default.
- id string

  A non-empty string uniquely identifying the ruleset. IDs beginning with '_' are reserved for internal use.
- path string

  The path of the JSON ruleset relative to the extension directory.

### RulesMatchedDetails

#### Properties

- rulesMatchedInfo [MatchedRuleInfo](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-MatchedRuleInfo)\[\]

  Rules matching the given filter.

### TabActionCountUpdate

Chrome 89+

#### Properties

- increment number

  The amount to increment the tab's action count by. Negative values will decrement the count.
- tabId number

  The tab for which to update the action count.

### TestMatchOutcomeResult

Chrome 103+

#### Properties

- matchedRules [MatchedRule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-MatchedRule)\[\]

  The rules (if any) that match the hypothetical request.

### TestMatchRequestDetails

Chrome 103+

#### Properties

- initiator string optional

  The initiator URL (if any) for the hypothetical request.
- method [RequestMethod](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RequestMethod) optional

  Standard HTTP method of the hypothetical request. Defaults to "get" for HTTP requests and is ignored for non-HTTP requests.
- responseHeaders object optional
  Chrome 129+

  The headers provided by a hypothetical response if the request does not get blocked or redirected before it is sent. Represented as an object which maps a header name to a list of string values. If not specified, the hypothetical response would return empty response headers, which can match rules which match on the non-existence of headers. E.g. `{"content-type": ["text/html; charset=utf-8", "multipart/form-data"]}`
- tabId number optional

  The ID of the tab in which the hypothetical request takes place. Does not need to correspond to a real tab ID. Default is -1, meaning that the request isn't related to a tab.
- topUrl string optional
  Chrome 145+

  The associated top-level frame URL (if any) for the request.
- type [ResourceType](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-ResourceType)

  The resource type of the hypothetical request.
- url string

  The URL of the hypothetical request.

### UnsupportedRegexReason

Chrome 87+

Describes the reason why a given regular expression isn't supported.

#### Enum

"syntaxError"   
The regular expression is syntactically incorrect, or uses features not available in the [RE2 syntax](https://github.com/google/re2/wiki/Syntax).
"memoryLimitExceeded"   
The regular expression exceeds the memory limit.

<br />

### UpdateRuleOptions

Chrome 87+

#### Properties

- addRules [Rule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Rule)\[\] optional

  Rules to add.
- removeRuleIds number\[\] optional

  IDs of the rules to remove. Any invalid IDs will be ignored.

### UpdateRulesetOptions

Chrome 87+

#### Properties

- disableRulesetIds string\[\] optional

  The set of ids corresponding to a static [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) that should be disabled.
- enableRulesetIds string\[\] optional

  The set of ids corresponding to a static [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) that should be enabled.

### UpdateStaticRulesOptions

Chrome 111+

#### Properties

- disableRuleIds number\[\] optional

  Set of ids corresponding to rules in the [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) to disable.
- enableRuleIds number\[\] optional

  Set of ids corresponding to rules in the [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) to enable.
- rulesetId string

  The id corresponding to a static [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset).

### URLTransform

#### Properties

- fragment string optional

  The new fragment for the request. Should be either empty, in which case the existing fragment is cleared; or should begin with '#'.
- host string optional

  The new host for the request.
- password string optional

  The new password for the request.
- path string optional

  The new path for the request. If empty, the existing path is cleared.
- port string optional

  The new port for the request. If empty, the existing port is cleared.
- query string optional

  The new query for the request. Should be either empty, in which case the existing query is cleared; or should begin with '?'.
- queryTransform [QueryTransform](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-QueryTransform) optional

  Add, remove or replace query key-value pairs.
- scheme string optional

  The new scheme for the request. Allowed values are "http", "https", "ftp" and "chrome-extension".
- username string optional

  The new username for the request.

## Properties

### DYNAMIC_RULESET_ID

Ruleset ID for the dynamic rules added by the extension.

#### Value

"_dynamic"   

### GETMATCHEDRULES_QUOTA_INTERVAL

Time interval within which `MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL getMatchedRules` calls can be made, specified in minutes. Additional calls will fail immediately and set [`runtime.lastError`](https://developer.chrome.com/docs/extensions/mv2/runtime/#property-lastError). Note: `getMatchedRules` calls associated with a user gesture are exempt from the quota.

#### Value

10   

### GUARANTEED_MINIMUM_STATIC_RULES

Chrome 89+

The minimum number of static rules guaranteed to an extension across its enabled static rulesets. Any rules above this limit will count towards the [global static rule limit](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#global-static-rule-limit).

#### Value

30000   

### MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL

The number of times `getMatchedRules` can be called within a period of `GETMATCHEDRULES_QUOTA_INTERVAL`.

#### Value

20   

### MAX_NUMBER_OF_DYNAMIC_RULES

The maximum number of dynamic rules that an extension can add.

#### Value

30000   

### MAX_NUMBER_OF_ENABLED_STATIC_RULESETS

Chrome 94+

The maximum number of static `Rulesets` an extension can enable at any one time.

#### Value

50   

### MAX_NUMBER_OF_REGEX_RULES

The maximum number of regular expression rules that an extension can add. This limit is evaluated separately for the set of dynamic rules and those specified in the rule resources file.

#### Value

1000   

### MAX_NUMBER_OF_SESSION_RULES

Chrome 120+

The maximum number of session scoped rules that an extension can add.

#### Value

5000   

### MAX_NUMBER_OF_STATIC_RULESETS

The maximum number of static `Rulesets` an extension can specify as part of the `"rule_resources"` manifest key.

#### Value

100   

### MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES

Chrome 120+

The maximum number of "unsafe" dynamic rules that an extension can add.

#### Value

5000   

### MAX_NUMBER_OF_UNSAFE_SESSION_RULES

Chrome 120+

The maximum number of "unsafe" session scoped rules that an extension can add.

#### Value

5000   

### SESSION_RULESET_ID

Chrome 90+

Ruleset ID for the session-scoped rules added by the extension.

#### Value

"_session"   

## Methods

### getAvailableStaticRuleCount()

Promise Chrome 89+

```typescript
chrome.declarativeNetRequest.getAvailableStaticRuleCount(
  callback?: function,
): Promise<number>
```

Returns the number of static rules an extension can enable before the [global static rule limit](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#global-static-rule-limit) is reached.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (count: number) => void
  ```

  <br />

  - count number

#### Returns

- Promise\<number\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getDisabledRuleIds()

Promise Chrome 111+

```typescript
chrome.declarativeNetRequest.getDisabledRuleIds(
  options: GetDisabledRuleIdsOptions,
  callback?: function,
): Promise<number[]>
```

Returns the list of static rules in the given [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) that are currently disabled.

#### Parameters

- options [GetDisabledRuleIdsOptions](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-GetDisabledRuleIdsOptions)

  Specifies the ruleset to query.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (disabledRuleIds: number[]) => void
  ```

  <br />

  - disabledRuleIds number\[\]

#### Returns

- Promise\<number\[\]\>

  Promise that resolves with a list of ids that correspond to the disabled rules in that ruleset.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getDynamicRules()

Promise

```typescript
chrome.declarativeNetRequest.getDynamicRules(
  filter?: GetRulesFilter,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Rule[]>
```

Returns the current set of dynamic rules for the extension. Callers can optionally filter the list of fetched rules by specifying a `filter`.

#### Parameters

- filter [GetRulesFilter](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-GetRulesFilter) optional
  Chrome 111+

  An object to filter the list of fetched rules.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (rules: Rule[]) => void
  ```

  <br />

  - rules [Rule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Rule)\[\]

#### Returns

- Promise\<[Rule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Rule)\[\]\>
  Chrome 91+

  Promise that resolves with the set of dynamic rules. The Promise may be rejected in case of transient internal errors.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getEnabledRulesets()

Promise

```typescript
chrome.declarativeNetRequest.getEnabledRulesets(
  callback?: function,
): Promise<string[]>
```

Returns the ids for the current set of enabled static rulesets.

#### Parameters

- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (rulesetIds: string[]) => void
  ```

  <br />

  - rulesetIds string\[\]

#### Returns

- Promise\<string\[\]\>
  Chrome 91+

  Promise that resolves with a list of ids, where each id corresponds to an enabled static [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset).


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getMatchedRules()

Promise

```typescript
chrome.declarativeNetRequest.getMatchedRules(
  filter?: MatchedRulesFilter,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RulesMatchedDetails>
```

Returns all rules matched for the extension. Callers can optionally filter the list of matched rules by specifying a `filter`. This method is only available to extensions with the `"declarativeNetRequestFeedback"` permission or having the `"activeTab"` permission granted for the `tabId` specified in `filter`. Note: Rules not associated with an active document that were matched more than five minutes ago will not be returned.

#### Parameters

- filter [MatchedRulesFilter](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-MatchedRulesFilter) optional

  An object to filter the list of matched rules.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (details: RulesMatchedDetails) => void
  ```

  <br />

  - details [RulesMatchedDetails](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RulesMatchedDetails)

#### Returns

- Promise\<[RulesMatchedDetails](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RulesMatchedDetails)\>
  Chrome 91+

  Promise that resolves once the list of matched rules has been fetched. In case of an error, the Promise will be rejected. This can happen for multiple reasons, such as insufficient permissions, or exceeding the quota.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### getSessionRules()

Promise Chrome 90+

```typescript
chrome.declarativeNetRequest.getSessionRules(
  filter?: GetRulesFilter,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Rule[]>
```

Returns the current set of session scoped rules for the extension. Callers can optionally filter the list of fetched rules by specifying a `filter`.

#### Parameters

- filter [GetRulesFilter](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-GetRulesFilter) optional
  Chrome 111+

  An object to filter the list of fetched rules.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (rules: Rule[]) => void
  ```

  <br />

  - rules [Rule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Rule)\[\]

#### Returns

- Promise\<[Rule](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Rule)\[\]\>
  Chrome 91+

  Promise that resolves with the set of session scoped rules.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### isRegexSupported()

Promise Chrome 87+

```typescript
chrome.declarativeNetRequest.isRegexSupported(
  regexOptions: RegexOptions,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-IsRegexSupportedResult>
```

Checks if the given regular expression will be supported as a `regexFilter` rule condition.

#### Parameters

- regexOptions [RegexOptions](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-RegexOptions)

  The regular expression to check.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: IsRegexSupportedResult) => void
  ```

  <br />

  - result [IsRegexSupportedResult](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-IsRegexSupportedResult)

#### Returns

- Promise\<[IsRegexSupportedResult](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-IsRegexSupportedResult)\>
  Chrome 91+

  Promise that resolves with details consisting of whether the regular expression is supported and the reason if not.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setExtensionActionOptions()

Promise Chrome 88+

```typescript
chrome.declarativeNetRequest.setExtensionActionOptions(
  options: ExtensionActionOptions,
  callback?: function,
): Promise<void>
```

Configures if the action count for tabs should be displayed as the extension action's badge text and provides a way for that action count to be incremented.

#### Parameters

- options [ExtensionActionOptions](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-ExtensionActionOptions)
- callback function optional
  Chrome 89+


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 91+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### testMatchOutcome()

Promise Chrome 103+

```typescript
chrome.declarativeNetRequest.testMatchOutcome(
  request: TestMatchRequestDetails,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-TestMatchOutcomeResult>
```

Checks if any of the extension's declarativeNetRequest rules would match a hypothetical request. Note: Only available for unpacked extensions as this is only intended to be used during extension development.

#### Parameters

- request [TestMatchRequestDetails](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-TestMatchRequestDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (result: TestMatchOutcomeResult) => void
  ```

  <br />

  - result [TestMatchOutcomeResult](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-TestMatchOutcomeResult)

#### Returns

- Promise\<[TestMatchOutcomeResult](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-TestMatchOutcomeResult)\>

  Promise that resolves with the details of matched rules.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### updateDynamicRules()

Promise

```typescript
chrome.declarativeNetRequest.updateDynamicRules(
  options: UpdateRuleOptions,
  callback?: function,
): Promise<void>
```

Modifies the current set of dynamic rules for the extension. The rules with IDs listed in `options.removeRuleIds` are first removed, and then the rules given in `options.addRules` are added. Notes:

- This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
- These rules are persisted across browser sessions and across extension updates.
- Static rules specified as part of the extension package can not be removed using this function.
- [`MAX_NUMBER_OF_DYNAMIC_RULES`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-MAX_NUMBER_OF_DYNAMIC_RULES) is the maximum number of dynamic rules an extension can add. The number of [unsafe rules](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#safe_rules) must not exceed [`MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES).

#### Parameters

- options [UpdateRuleOptions](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-UpdateRuleOptions)
  Chrome 87+
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 91+

  Promise that resolves once the update is complete. In case of an error, the promise will be rejected and no change will be made to the rule set. This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, internal errors, and others.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### updateEnabledRulesets()

Promise

```typescript
chrome.declarativeNetRequest.updateEnabledRulesets(
  options: UpdateRulesetOptions,
  callback?: function,
): Promise<void>
```

Updates the set of enabled static rulesets for the extension. The rulesets with IDs listed in `options.disableRulesetIds` are first removed, and then the rulesets listed in `options.enableRulesetIds` are added.
Note that the set of enabled static rulesets is persisted across sessions but not across extension updates, i.e. the `rule_resources` manifest key will determine the set of enabled static rulesets on each extension update.

#### Parameters

- options [UpdateRulesetOptions](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-UpdateRulesetOptions)
  Chrome 87+
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 91+

  Promise that resolves once the update is complete. In case of an error, the promise will be rejected and no change will be made to the set of enabled rulesets. This can happen for multiple reasons, such as invalid ruleset IDs, rule count limit exceeded, or internal errors.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### updateSessionRules()

Promise Chrome 90+

```typescript
chrome.declarativeNetRequest.updateSessionRules(
  options: UpdateRuleOptions,
  callback?: function,
): Promise<void>
```

Modifies the current set of session scoped rules for the extension. The rules with IDs listed in `options.removeRuleIds` are first removed, and then the rules given in `options.addRules` are added. Notes:

- This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
- These rules are not persisted across sessions and are backed in memory.
- [`MAX_NUMBER_OF_SESSION_RULES`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#property-MAX_NUMBER_OF_SESSION_RULES) is the maximum number of session rules an extension can add.

#### Parameters

- options [UpdateRuleOptions](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-UpdateRuleOptions)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 91+

  Promise that resolves once the update is complete. In case of an error, the promise will be rejected and no change will be made to the rule set. This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, and others.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### updateStaticRules()

Promise Chrome 111+

```typescript
chrome.declarativeNetRequest.updateStaticRules(
  options: UpdateStaticRulesOptions,
  callback?: function,
): Promise<void>
```

Disables and enables individual static rules in a [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset). Changes to rules belonging to a disabled [`Ruleset`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-Ruleset) will take effect the next time that it becomes enabled.

#### Parameters

- options [UpdateStaticRulesOptions](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-UpdateStaticRulesOptions)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>

  Promise that resolves when the update is complete. In case of an error, the promise will be rejected and no change will be made to the enabled static rules.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onRuleMatchedDebug

```typescript
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
  callback: function,
)
```

Fired when a rule is matched with a request. Only available for unpacked extensions with the `"declarativeNetRequestFeedback"` permission as this is intended to be used for debugging purposes only.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (info: MatchedRuleInfoDebug) => void
  ```

  <br />

  - info [MatchedRuleInfoDebug](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest#type-MatchedRuleInfoDebug)

<br />