The `"externally_connectable"` manifest property declares which extensions and web pages can
connect to your extension using [`runtime.connect()`](https://developer.chrome.com/docs/extensions/reference/runtime#method-connect) and [`runtime.sendMessage()`](https://developer.chrome.com/docs/extensions/reference/runtime#method-sendMessage).

For a tutorial on message passing, see [cross-extension messaging](https://developer.chrome.com/docs/extensions/develop/concepts/messaging#external) and [sending messages
from web pages](https://developer.chrome.com/docs/extensions/develop/concepts/messaging#external-webpage).

## Connect without externally_connectable

If the `externally_connectable` key is ***not*** declared in your extension's manifest, all extensions can connect, but no web pages can connect. As a consequence, when updating your manifest to use
`externally_connectable`, if `"ids": ["*"]` is not specified, then other extensions will
lose the ability to connect to your extension. This may be an unintended consequence, so keep it in
mind.

## Manifest

    {
      "name": "My externally connectable extension",
      "externally_connectable": {
        "ids": [
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
          ...
        ],
        // If this field is not specified, no web pages can connect.
        "matches": [
          "https://*.google.com/*",
          "*://*.chromium.org/*",
          ...
        ],
        "accepts_tls_channel_id": false
      },
      ...
    }

## Reference

The `"externally_connectable"` manifest key includes the following *optional* properties:

`"ids"`
:   The IDs of extensions that are allowed to connect. If left empty or unspecified, no extensions or apps can connect. The wildcard `"*"` will allow all extensions and apps to connect.

`"matches"`
:   The [match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns) for *web pages* that are allowed to
    connect. If left empty or unspecified, no web pages can connect.

`"accepts_tls_channel_id"`
:   Enables the extension to use the TLS channel ID of the web page connecting to it. The web page must also opt to send the [TLS channel ID](https://developer.chrome.com/docs/extensions/runtime#property-MessageSender-tlsChannelId) to the extension by setting
    `includeTlsChannelId` to `true` in runtime.connect's [connectInfo](https://developer.chrome.com/docs/extensions/reference/runtime#type-connect-connectInfo) or runtime.sendMessage's [options](https://developer.chrome.com/docs/extensions/reference/runtime#property-sendMessage-options-includeTlsChannelId). If set to `false`,
    [runtime.MessageSender.tlsChannelId](https://developer.chrome.com/docs/extensions/runtime#property-MessageSender-tlsChannelId) will never be set under any circumstance.

This does not affect content scripts.