refresh date: 2026-09-25
robots: noindex

Most extensions need access to one or more Chrome Extensions APIs to function.
This API reference describes the APIs available for use in extensions and
presents example use cases.

[accessibilityFeatures](https://developer.chrome.com/docs/extensions/mv2/reference/accessibilityFeatures)
:

    Use the `chrome.accessibilityFeatures` API to manage Chrome's accessibility features. This API relies on the [ChromeSetting prototype of the type API](https://developer.chrome.com/docs/extensions/reference/types/#ChromeSetting) for getting and setting individual accessibility features. In order to get feature states the extension must request `accessibilityFeatures.read` permission. For modifying feature state, the extension needs `accessibilityFeatures.modify` permission. Note that `accessibilityFeatures.modify` does not imply `accessibilityFeatures.read` permission.


[alarms](https://developer.chrome.com/docs/extensions/mv2/reference/alarms)
:

    Use the `chrome.alarms` API to schedule code to run periodically or at a specified time in the future.


[audio](https://developer.chrome.com/docs/extensions/mv2/reference/audio)
:
    Chrome 59+ ChromeOS only

    The `chrome.audio` API is provided to allow users to get information about and control the audio devices attached to the system. This API is currently only available in kiosk mode for ChromeOS.


[bookmarks](https://developer.chrome.com/docs/extensions/mv2/reference/bookmarks)
:

    Use the `chrome.bookmarks` API to create, organize, and otherwise manipulate bookmarks. Also see [Override Pages](https://developer.chrome.com/docs/extensions/override), which you can use to create a custom Bookmark Manager page.


[browserAction](https://developer.chrome.com/docs/extensions/mv2/reference/browserAction)
:
    ≤ MV2

    Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its [icon](https://developer.chrome.com/docs/extensions/reference/browserAction/#icon), a browser action can have a [tooltip](https://developer.chrome.com/docs/extensions/reference/browserAction/#tooltip), a [badge](https://developer.chrome.com/docs/extensions/reference/browserAction/#badge), and a [popup](https://developer.chrome.com/docs/extensions/reference/browserAction/#popup).


[browsingData](https://developer.chrome.com/docs/extensions/mv2/reference/browsingData)
:

    Use the `chrome.browsingData` API to remove browsing data from a user's local profile.


[certificateProvider](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider)
:
    Chrome 46+ ChromeOS only

    Use this API to expose certificates to the platform which can use these certificates for TLS authentications.


[commands](https://developer.chrome.com/docs/extensions/mv2/reference/commands)
:

    Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.


[contentSettings](https://developer.chrome.com/docs/extensions/mv2/reference/contentSettings)
:

    Use the `chrome.contentSettings` API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.


[contextMenus](https://developer.chrome.com/docs/extensions/mv2/reference/contextMenus)
:

    Use the `chrome.contextMenus` API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.


[cookies](https://developer.chrome.com/docs/extensions/mv2/reference/cookies)
:

    Use the `chrome.cookies` API to query and modify cookies, and to be notified when they change.


[debugger](https://developer.chrome.com/docs/extensions/mv2/reference/debugger)
:

    The `chrome.debugger` API serves as an alternate transport for Chrome's [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol). Use `chrome.debugger` to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, and more. Use the [`Debuggee`](https://developer.chrome.com/docs/extensions/mv2/reference#type-Debuggee) property `tabId` to target tabs with `sendCommand` and route events by `tabId` from `onEvent` callbacks.


[declarativeContent](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeContent)
:

    Use the `chrome.declarativeContent` API to take actions depending on the content of a page, without requiring permission to read the page's content.


[declarativeNetRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest)
:
    Chrome 84+

    The `chrome.declarativeNetRequest` API is used to block or modify network requests by specifying declarative rules. This lets extensions modify network requests without intercepting them and viewing their content, thus providing more privacy.


[declarativeWebRequest](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeWebRequest)
:
    Beta channel ≤ MV2

    ***Note:** this API is deprecated. Check out the [`declarativeNetRequest`](https://developer.chrome.com/docs/extensions/mv2/reference/declarativeNetRequest) API instead.* Use the `chrome.declarativeWebRequest` API to intercept, block, or modify requests in-flight. It is significantly faster than the [`chrome.webRequest` API](https://developer.chrome.com/docs/extensions/mv2/reference/webRequest) because you can register rules that are evaluated in the browser rather than the JavaScript engine, which reduces roundtrip latencies and allows higher efficiency.


[desktopCapture](https://developer.chrome.com/docs/extensions/mv2/reference/desktopCapture)
:

    The Desktop Capture API captures the content of the screen, individual windows, or individual tabs.


[devtools.inspectedWindow](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/inspectedWindow)
:

    Use the `chrome.devtools.inspectedWindow` API to interact with the inspected window: obtain the tab ID for the inspected page, evaluate the code in the context of the inspected window, reload the page, or obtain the list of resources within the page.


[devtools.network](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/network)
:

    Use the `chrome.devtools.network` API to retrieve the information about network requests displayed by the Developer Tools in the Network panel.


[devtools.panels](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/panels)
:

    Use the `chrome.devtools.panels` API to integrate your extension into Developer Tools window UI: create your own panels, access existing panels, and add sidebars.


[devtools.performance](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/performance)
:
    Chrome 129+

    Use the `chrome.devtools.performance` API to listen to recording status updates in the Performance panel in DevTools.


[devtools.recorder](https://developer.chrome.com/docs/extensions/mv2/reference/devtools/recorder)
:
    Chrome 105+

    Use the `chrome.devtools.recorder` API to customize the Recorder panel in DevTools.


[dns](https://developer.chrome.com/docs/extensions/mv2/reference/dns)
:
    Dev channel

    Use the `chrome.dns` API for dns resolution.


[documentScan](https://developer.chrome.com/docs/extensions/mv2/reference/documentScan)
:
    Chrome 44+ ChromeOS only

    Use the `chrome.documentScan` API to discover and retrieve images from attached document scanners.


[dom](https://developer.chrome.com/docs/extensions/mv2/reference/dom)
:
    Chrome 88+

    Use the `chrome.dom` API to access special DOM APIs for Extensions


[downloads](https://developer.chrome.com/docs/extensions/mv2/reference/downloads)
:

    Use the `chrome.downloads` API to programmatically initiate, monitor, manipulate, and search for downloads.


[enterprise.deviceAttributes](https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/deviceAttributes)
:
    Chrome 46+ ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

    Use the `chrome.enterprise.deviceAttributes` API to read device attributes. Note: This API is only available to extensions force-installed by enterprise policy.


[enterprise.hardwarePlatform](https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/hardwarePlatform)
:
    Chrome 71+ [Requires policy](https://support.google.com/chrome/a/answer/9296680)

    Use the `chrome.enterprise.hardwarePlatform` API to get the manufacturer and model of the hardware platform where the browser runs. Note: This API is only available to extensions installed by enterprise policy.


[enterprise.login](https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/login)
:
    Chrome 139+ ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

    Use the `chrome.enterprise.login` API to exit Managed Guest sessions. Note: This API is only available to extensions installed by enterprise policy in ChromeOS Managed Guest sessions.


[enterprise.networkingAttributes](https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/networkingAttributes)
:
    Chrome 85+ ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

    Use the `chrome.enterprise.networkingAttributes` API to read information about your current network. Note: This API is only available to extensions force-installed by enterprise policy.


[enterprise.platformKeys](https://developer.chrome.com/docs/extensions/mv2/reference/enterprise/platformKeys)
:
    ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

    Use the `chrome.enterprise.platformKeys` API to generate keys and install certificates for these keys. The certificates will be managed by the platform and can be used for TLS authentication, network access or by other extension through chrome.platformKeys.


[events](https://developer.chrome.com/docs/extensions/mv2/reference/events)
:

    The `chrome.events` namespace contains common types used by APIs dispatching events to notify you when something interesting happens.


[extension](https://developer.chrome.com/docs/extensions/mv2/reference/extension)
:

    The `chrome.extension` API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in [Message Passing](https://developer.chrome.com/docs/extensions/messaging).


[extensionTypes](https://developer.chrome.com/docs/extensions/mv2/reference/extensionTypes)
:

    The `chrome.extensionTypes` API contains type declarations for Chrome extensions.


[fileBrowserHandler](https://developer.chrome.com/docs/extensions/mv2/reference/fileBrowserHandler)
:
    ChromeOS only Foreground only

    Use the `chrome.fileBrowserHandler` API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.


[fileSystemProvider](https://developer.chrome.com/docs/extensions/mv2/reference/fileSystemProvider)
:
    ChromeOS only

    Use the `chrome.fileSystemProvider` API to create file systems, that can be accessible from the file manager on Chrome OS.


[fontSettings](https://developer.chrome.com/docs/extensions/mv2/reference/fontSettings)
:

    Use the `chrome.fontSettings` API to manage Chrome's font settings.


[gcm](https://developer.chrome.com/docs/extensions/mv2/reference/gcm)
:

    Use `chrome.gcm` to enable apps and extensions to send and receive messages through [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (FCM).


[history](https://developer.chrome.com/docs/extensions/mv2/reference/history)
:

    Use the `chrome.history` API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see [Override Pages](https://developer.chrome.com/extensions/develop/ui/override-chrome-pages).


[i18n](https://developer.chrome.com/docs/extensions/mv2/reference/i18n)
:

    Use the `chrome.i18n` infrastructure to implement internationalization across your whole app or extension.


[identity](https://developer.chrome.com/docs/extensions/mv2/reference/identity)
:

    Use the `chrome.identity` API to get OAuth2 access tokens.


[idle](https://developer.chrome.com/docs/extensions/mv2/reference/idle)
:

    Use the `chrome.idle` API to detect when the machine's idle state changes.


[input.ime](https://developer.chrome.com/docs/extensions/mv2/reference/input/ime)
:
    ChromeOS only

    Use the `chrome.input.ime` API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.


[instanceID](https://developer.chrome.com/docs/extensions/mv2/reference/instanceID)
:
    Chrome 44+

    Use `chrome.instanceID` to access the Instance ID service.


[loginState](https://developer.chrome.com/docs/extensions/mv2/reference/loginState)
:
    Chrome 78+ ChromeOS only

    Use the `chrome.loginState` API to read and monitor the login state.


[management](https://developer.chrome.com/docs/extensions/mv2/reference/management)
:

    The `chrome.management` API provides ways to manage installed apps and extensions.


[mimeHandler](https://developer.chrome.com/docs/extensions/mv2/reference/mimeHandler)
:
    Chrome 151+

    Use the `chrome.mimeHandler` API to handle MIME type streams in third-party extensions.


[notifications](https://developer.chrome.com/docs/extensions/mv2/reference/notifications)
:

    Use the `chrome.notifications` API to create rich notifications using templates and show these notifications to users in the system tray.


[omnibox](https://developer.chrome.com/docs/extensions/mv2/reference/omnibox)
:

    The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.


[pageAction](https://developer.chrome.com/docs/extensions/mv2/reference/pageAction)
:
    ≤ MV2

    Use the `chrome.pageAction` API to put icons in the main Google Chrome toolbar, to the right of the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. Page actions appear grayed out when inactive.


[pageCapture](https://developer.chrome.com/docs/extensions/mv2/reference/pageCapture)
:

    Use the `chrome.pageCapture` API to save a tab as MHTML.


[permissions](https://developer.chrome.com/docs/extensions/mv2/reference/permissions)
:

    Use the `chrome.permissions` API to request [declared optional permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.


[platformKeys](https://developer.chrome.com/docs/extensions/mv2/reference/platformKeys)
:
    Chrome 45+ ChromeOS only

    Use the `chrome.platformKeys` API to access client certificates managed by the platform. If the user or policy grants the permission, an extension can use such a certficate in its custom authentication protocol. E.g. this allows usage of platform managed certificates in third party VPNs (see [chrome.vpnProvider](https://developer.chrome.com/docs/extensions/mv2/reference/vpnProvider)).


[power](https://developer.chrome.com/docs/extensions/mv2/reference/power)
:

    Use the `chrome.power` API to override the system's power management features.


[printerProvider](https://developer.chrome.com/docs/extensions/mv2/reference/printerProvider)
:
    Chrome 44+

    The `chrome.printerProvider` API exposes events used by print manager to query printers controlled by extensions, to query their capabilities and to submit print jobs to these printers.


[printing](https://developer.chrome.com/docs/extensions/mv2/reference/printing)
:
    Chrome 81+ ChromeOS only

    Use the `chrome.printing` API to send print jobs to printers installed on Chromebook.


[printingMetrics](https://developer.chrome.com/docs/extensions/mv2/reference/printingMetrics)
:
    Chrome 79+ ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

    Use the `chrome.printingMetrics` API to fetch data about printing usage.


[privacy](https://developer.chrome.com/docs/extensions/mv2/reference/privacy)
:

    Use the `chrome.privacy` API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the [ChromeSetting prototype of the type API](https://developer.chrome.com/docs/extensions/reference/types/#ChromeSetting) for getting and setting Chrome's configuration.


[processes](https://developer.chrome.com/docs/extensions/mv2/reference/processes)
:
    Dev channel

    Use the `chrome.processes` API to interact with the browser's processes.


[proxy](https://developer.chrome.com/docs/extensions/mv2/reference/proxy)
:

    Use the `chrome.proxy` API to manage Chrome's proxy settings. This API relies on the [ChromeSetting prototype of the type API](https://developer.chrome.com/docs/extensions/reference/api/types#type-ChromeSetting) for getting and setting the proxy configuration.


[publicSuffix](https://developer.chrome.com/docs/extensions/mv2/reference/publicSuffix)
:
    Chrome 153+

    Use the `chrome.publicSuffix` API to query the browser's Public Suffix List (PSL).


[runtime](https://developer.chrome.com/docs/extensions/mv2/reference/runtime)
:

    Use the `chrome.runtime` API to retrieve the service worker, return details about the manifest, and listen for and respond to events in the extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.


[search](https://developer.chrome.com/docs/extensions/mv2/reference/search)
:
    Chrome 87+

    Use the `chrome.search` API to search via the default provider.


[sessions](https://developer.chrome.com/docs/extensions/mv2/reference/sessions)
:

    Use the `chrome.sessions` API to query and restore tabs and windows from a browsing session.


[storage](https://developer.chrome.com/docs/extensions/mv2/reference/storage)
:

    Use the `chrome.storage` API to store, retrieve, and track changes to user data.


[system.cpu](https://developer.chrome.com/docs/extensions/mv2/reference/system/cpu)
:

    Use the `system.cpu` API to query CPU metadata.


[system.display](https://developer.chrome.com/docs/extensions/mv2/reference/system/display)
:

    Use the `system.display` API to query display metadata.


[system.memory](https://developer.chrome.com/docs/extensions/mv2/reference/system/memory)
:

    The `chrome.system.memory` API.


[system.storage](https://developer.chrome.com/docs/extensions/mv2/reference/system/storage)
:

    Use the `chrome.system.storage` API to query storage device information and be notified when a removable storage device is attached and detached.


[systemLog](https://developer.chrome.com/docs/extensions/mv2/reference/systemLog)
:
    Chrome 125+ ChromeOS only [Requires policy](https://support.google.com/chrome/a/answer/9296680)

    Use the `chrome.systemLog` API to record Chrome system logs from extensions.


[tabCapture](https://developer.chrome.com/docs/extensions/mv2/reference/tabCapture)
:

    Use the `chrome.tabCapture` API to interact with tab media streams.


[tabs](https://developer.chrome.com/docs/extensions/mv2/reference/tabs)
:

    Use the `chrome.tabs` API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.


[topSites](https://developer.chrome.com/docs/extensions/mv2/reference/topSites)
:

    Use the `chrome.topSites` API to access the top sites (i.e. most visited sites) that are displayed on the new tab page. These do not include shortcuts customized by the user.


[tts](https://developer.chrome.com/docs/extensions/mv2/reference/tts)
:

    Use the `chrome.tts` API to play synthesized text-to-speech (TTS). See also the related [`ttsEngine`](https://developer.chrome.com/docs/extensions/mv2/reference/ttsEngine) API, which allows an extension to implement a speech engine.


[ttsEngine](https://developer.chrome.com/docs/extensions/mv2/reference/ttsEngine)
:

    Use the `chrome.ttsEngine` API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the [`tts`](https://developer.chrome.com/docs/extensions/mv2/reference/tts) API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.


[types](https://developer.chrome.com/docs/extensions/mv2/reference/types)
:

    The `chrome.types` API contains type declarations for Chrome.


[vpnProvider](https://developer.chrome.com/docs/extensions/mv2/reference/vpnProvider)
:
    Chrome 43+ ChromeOS only

    Use the `chrome.vpnProvider` API to implement a VPN client.


[wallpaper](https://developer.chrome.com/docs/extensions/mv2/reference/wallpaper)
:
    Chrome 43+ ChromeOS only

    Use the `chrome.wallpaper` API to change the ChromeOS wallpaper.


[webNavigation](https://developer.chrome.com/docs/extensions/mv2/reference/webNavigation)
:

    Use the `chrome.webNavigation` API to receive notifications about the status of navigation requests in-flight.


[webRequest](https://developer.chrome.com/docs/extensions/mv2/reference/webRequest)
:

    Use the `chrome.webRequest` API to observe and analyze traffic and to intercept, block, or modify requests in-flight.


[windows](https://developer.chrome.com/docs/extensions/mv2/reference/windows)
:

    Use the `chrome.windows` API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.