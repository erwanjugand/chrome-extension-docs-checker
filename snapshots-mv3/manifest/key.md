This value maintains the unique ID of an extension, or theme when it is loaded
during development.
[Video](https://www.youtube.com/watch?v=cHzsNU84u6g)

The following are some common use cases:

- To configure a server to only accept requests from your Chrome Extension origin.
- So that other extensions or websites can [send messages](https://developer.chrome.com/docs/extensions/mv3/messaging#external-webpage) to your extension.
- So that a website can access the [`web_accessible_resources`](https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources) of your extension.

## Keep a consistent extension ID

Preserving a single ID is essential during development. To keep a consistent ID, follow these steps:

### Upload extension to the developer dashboard

Package the extension directory into a `.zip` file and upload it to the [Chrome Developer
Dashboard](https://chrome.google.com/webstore/developer/dashboard) without publishing it:

1. On the Developer Dashboard, click **Add new item**.
2. Click **Browse files**, select the extension's zip file, and upload it.
3. Go to the **Package** tab and click **View public key**.

![View public key button in Package tab](https://developer.chrome.com/static/images/docs/extensions/reusing-prod-extension-id/developer-dashboard.png) View public key button in Package tab

When the dialog is open, follow these steps:

1. Copy the code in between `---BEGIN PUBLIC KEY---` and `---END PUBLIC KEY---`.
2. Remove the newlines in order to make it a single line of text.

![Public key dialog window](https://developer.chrome.com/static/images/docs/extensions/reusing-prod-extension-id/public-key-popup.png) Public key dialog window

Add the code to the `manifest.json` under the [`"key"`](https://developer.chrome.com/docs/extensions/reference/manifest/key) field.
This way the extension will use the same ID.

    { // manifest.json
      "manifest_version": 3,
    ...
      "key": "ThisKeyIsGoingToBeVeryLong/go8GGC2u3UD9WI3MkmBgyiDPP2OreImEQhPvwpliioUMJmERZK3zPAx72z8MDvGp7Fx7ZlzuZpL4yyp4zXBI+MUhFGoqEh32oYnm4qkS4JpjWva5Ktn4YpAWxd4pSCVs8I4MZms20+yx5OlnlmWQEwQiiIwPPwG1e1jRw0Ak5duPpE3uysVGZXkGhC5FyOFM+oVXwc1kMqrrKnQiMJ3lgh59LjkX4z1cDNX3MomyUMJ+I+DaWC2VdHggB74BNANSd+zkPQeNKg3o7FetlDJya1bk8ofdNBARxHFMBtMXu/ONfCT3Q2kCY9gZDRktmNRiHG/1cXhkIcN1RWrbsCkwIDAQAB",
    }

### Compare IDs

Open the Extensions Management page at `chrome://extensions`, ensure **Developer mode** is enabled,
and upload the unpackaged extension directory. Compare the extension ID on the extensions management
page to the Item ID in the Developer Dashboard. They should match.

![The ID of the
extension match](https://developer.chrome.com/static/images/docs/extensions/reusing-prod-extension-id/the-id-the-extension-mat.png)