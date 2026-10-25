An integer specifying the version of the manifest file format your package requires. This key is required. For example:

    "manifest_version": 3

Supported values for this key are:

- `3`: Use the [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview) format and associated feature set.

The current version is Manifest V3. The Chrome Web Store no longer accepts manifest V2 extensions
(see [Manifest V2 support timeline](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset) for more details). There will be other manifest
versions in the future (V4 and beyond), but these aren't scheduled yet.