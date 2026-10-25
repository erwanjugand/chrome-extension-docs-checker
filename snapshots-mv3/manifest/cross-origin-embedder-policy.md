The `cross_origin_embedder_policy` manifest key lets the extension specify a value for the
[Cross-Origin-Embedder-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) (COEP) response header for requests to the extension's
origin. This includes the extension's service worker, popup, options page, tabs that are open to an extension resource, etc.

Together with [cross_origin_opener_policy](https://developer.chrome.com/docs/extensions/mv3/manifest/cross_origin_opener_policy), this key allows the extension to opt
into [cross-origin isolation](https://developer.chrome.com/docs/extensions/mv3/cross-origin-isolation).

## Manifest declaration

> [!NOTE]
> **Note:** This key was introduced in Chrome 93.

The `cross_origin_embedder_policy` manifest key contains an object with one
property named `value` that takes a string. Chrome uses this string as the value of the
`Cross-Origin-Embedder-Policy` header when serving resources from the extension's origin. For
example:

    {
        ...
        "cross_origin_embedder_policy": {
          "value": "require-corp"
        },
        ...
    }

See the [Cross-origin isolation overview](https://developer.chrome.com/docs/extensions/mv3/cross-origin-isolation) for more information about this feature.