To access most extension APIs and features, you must declare permissions in your
extension's [manifest](https://developer.chrome.com/docs/extensions/reference/manifest). Some permissions
trigger warnings that users must allow to continue using the extension.

For more information on how permissions work, see [Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions). For best
practices for using permissions with warnings, see [Permission warning guidelines](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings).

The following is a list of all available permissions and any warnings triggered
by specific permissions.

`"accessibilityFeatures.modify"`
:   Lets extensions modify accessibility feature states when using the
    `chrome.accessibilityFeatures` API.


    Warning displayed: *Change your accessibility settings.*

`"accessibilityFeatures.read"`
:   Lets extensions read accessibility states when using the
    `chrome.accessibilityFeatures` API.


    Warning displayed: *Read your accessibility settings.*

`"activeTab"`
:   Gives temporary access to the active tab through a user gesture. For details,
    see [`activeTab`](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab).

`"alarms"`
:   Gives access to the
    [`chrome.alarms`](https://developer.chrome.com/docs/extensions/reference/api/alarms) API.

`"audio"`
:   Gives access to the
    [`chrome.audio`](https://developer.chrome.com/docs/extensions/reference/api/audio) API.

`"background"`
:   Makes Chrome start up early (as soon as the user logs into their computer,
    before they launch Chrome), and shut down late (even after its last window is
    closed, until the user explicitly quits Chrome).

`"bookmarks"`
:   Gives access to the
    [`chrome.bookmarks`](https://developer.chrome.com/docs/extensions/reference/api/bookmarks) API.


    Warning displayed: *Read and change your bookmarks.*

`"browsingData"`
:   Gives access to the
    [`chrome.browsingData`](https://developer.chrome.com/docs/extensions/reference/api/browsingData) API.

`"certificateProvider"`
:   Gives access to the [`chrome.certificateProvider`](https://developer.chrome.com/docs/extensions/reference/api/certificateProvider)
    API.

`"clipboardRead"`
:   Lets the extension paste items from the clipboard using the web platform [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API).


    Warning displayed: *Read data you copy and paste.*

`"clipboardWrite"`
:   Lets the extension cut and copy items to the clipboard using the web platform [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API).


    Warning displayed: *Modify data you copy and paste.*

`"contentSettings"`
:   Gives access to the
    [`chrome.contentSettings`](https://developer.chrome.com/docs/extensions/reference/api/contentSettings)
    API.


    Warning displayed: *Change your settings that control websites' access to
    features such as cookies, JavaScript, plugins, geolocation, microphone, camera
    etc.*

`"contextMenus"`
:   Gives access to the
    [`chrome.contextMenus`](https://developer.chrome.com/docs/extensions/reference/api/contextMenus) API.

`"cookies"`
:   Gives access to the
    [`chrome.cookies`](https://developer.chrome.com/docs/extensions/reference/api/cookies) API.

`"debugger"`
:   Gives access to the
    [`chrome.debugger`](https://developer.chrome.com/docs/extensions/reference/api/debugger) API.


    Warnings displayed:  

    - *Access the page debugger backend.*
    - *Read and change all your data on all websites.*

`"declarativeContent"`
:   Gives access to the
    [`chrome.declarativeContent`](https://developer.chrome.com/docs/extensions/reference/api/declarativeContent)
    API.

`"declarativeNetRequest"`
:   Gives access to the
    [`chrome.declarativeNetRequest`](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest)
    API.


    Warning displayed: *Block content on any page.*

`"declarativeNetRequestWithHostAccess"`
:   Gives access to the [`chrome.declarativeNetRequest`](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest)
    API but requires host permissions for all actions.

`"declarativeNetRequestFeedback"`
:   Gives permission to write errors and warnings to the DevTools console when
    using the [`chrome.declarativeNetRequest`](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest)
    API. This permission is for use with unpacked extensions and is ignored for
    extensions installed from the Chrome Web Store.


    Warning displayed: *Read your browsing history.*

`"dns"`
:   Gives access to the `chrome.dns` API.

`"desktopCapture"`
:   Gives access to the
    [`chrome.desktopCapture`](https://developer.chrome.com/docs/extensions/reference/api/desktopCapture)
    API.


    Warning displayed: *Capture content of your screen.*

`"documentScan"`
:   Gives access to the
    [`chrome.documentScan`](https://developer.chrome.com/docs/extensions/reference/api/documentScan) API.

`"downloads"`
:   Gives access to the
    [`chrome.downloads`](https://developer.chrome.com/docs/extensions/reference/api/downloads) API.


    Warning displayed: *Manage your downloads.*

`"downloads.open"`
:   Allows the use of [`chrome.downloads.open()`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-open).


    Warning displayed: *Manage your downloads.*

`"downloads.ui"`
:   Allows the use of [`chrome.downloads.setUiOptions()`](https://developer.chrome.com/docs/extensions/reference/api/downloads#method-setUiOptions).


    Warning displayed: *Manage your downloads.*

`"enterprise.deviceAttributes"`
:   Gives access to the [`chrome.enterprise.deviceAttributes`](https://developer.chrome.com/docs/extensions/reference/api/enterprise/deviceAttributes)
    API.

`"enterprise.hardwarePlatform"`
:   Gives access to the [`chrome.enterprise.hardwarePlatform`](https://developer.chrome.com/docs/extensions/reference/api/enterprise/hardwarePlatform)
    API.

`"enterprise.networkingAttributes"`
:   Gives access to the [`chrome.enterprise.networkingAttributes`](https://developer.chrome.com/docs/extensions/reference/api/enterprise/networkingAttributes)
    API.

`"enterprise.platformKeys"`
:   Gives access to the [`chrome.enterprise.platformKeys`](https://developer.chrome.com/docs/extensions/reference/api/enterprise/platformKeys)
    API.

`"favicon"`
:   Grants access to the [Favicon](https://developer.chrome.com/docs/extensions/how-to/ui/favicons) API.


    Warning displayed: *Read the icons of the
    websites you visit.*

`"fileBrowserHandler"`
:   Gives access to the [`chrome.fileBrowserHandler`](https://developer.chrome.com/docs/extensions/reference/api/fileBrowserHandler)
    API.

`"fileSystemProvider"`
:   Gives access to the [`chrome.fileSystemProvider`](https://developer.chrome.com/docs/extensions/reference/api/fileSystemProvider)
    API.

`"fontSettings"`
:   Gives access to the
    [`chrome.fontSettings`](https://developer.chrome.com/docs/extensions/reference/api/fontSettings) API.

`"gcm"`
:   Gives access to the [`chrome.gcm`](https://developer.chrome.com/docs/extensions/reference/api/gcm) and
    [`chrome.instanceID`](https://developer.chrome.com/docs/extensions/reference/api/instanceID) APIs.

`"geolocation"`
:   Allows the extension to use the geolocation API without prompting the user for
    permission.


    Warning displayed: *Detect your physical location.*

`"history"`
:   Gives access to the
    [`chrome.history`](https://developer.chrome.com/docs/extensions/reference/api/history) API.


    Warning displayed: *Read and change your browsing history on all signed-in
    devices.*

`"identity"`
:   Gives access to the
    [`chrome.identity`](https://developer.chrome.com/docs/extensions/reference/api/identity) API.

`"identity.email"`
:   Gives access to the user's email address through the
    [`chrome.identity`](https://developer.chrome.com/docs/extensions/reference/api/identity) API.


    Warning displayed: *Know your email address.*

`"idle"`
:   Gives access to the [`chrome.idle`](https://developer.chrome.com/docs/extensions/reference/api/idle) API.

`"loginState"`
:   Gives access to the
    [`chrome.loginState`](https://developer.chrome.com/docs/extensions/reference/api/loginState) API.

`"management"`
:   Gives access to the
    [`chrome.management`](https://developer.chrome.com/docs/extensions/reference/api/management) API.


    Warning displayed: *Manage your apps, extensions, and themes.*

`"nativeMessaging"`
:   Gives access to the [native messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging) API.


    Warning displayed: *Communicate with cooperating native applications.*

`"notifications"`
:   Gives access to the
    [`chrome.notifications`](https://developer.chrome.com/docs/extensions/reference/api/notifications) API.


    Warning displayed: *Display notifications.*

`"offscreen"`
:   Gives access to the
    [`chrome.offscreen`](https://developer.chrome.com/docs/extensions/reference/api/offscreen) API.

`"pageCapture"`
:   Gives access to the
    [`chrome.pageCapture`](https://developer.chrome.com/docs/extensions/reference/api/pageCapture) API.


    Warning displayed: *Read and change all your data on all websites.*

`"platformKeys"`
:   Gives access to the
    [`chrome.platformKeys`](https://developer.chrome.com/docs/extensions/reference/api/platformKeys) API.

`"power"`
:   Gives access to the
    [`chrome.power`](https://developer.chrome.com/docs/extensions/reference/api/power) API.

`"printerProvider"`
:   Gives access to the
    [`chrome.printerProvider`](https://developer.chrome.com/docs/extensions/reference/api/printerProvider)
    API.

`"printing"`
:   Gives access to the
    [`chrome.printing`](https://developer.chrome.com/docs/extensions/reference/api/printing) API.

`"printingMetrics"`
:   Gives access to the
    [`chrome.printingMetrics`](https://developer.chrome.com/docs/extensions/reference/api/printingMetrics)
    API.

`"privacy"`
:   Gives access to the
    [`chrome.privacy`](https://developer.chrome.com/docs/extensions/reference/api/privacy) API.


    Warning displayed: *Change your privacy-related settings.*

`"processes"`
:   Gives access to the [`chrome.processes`](https://developer.chrome.com/docs/extensions/reference/api/processes) API.

`"proxy"`
:   Gives access to the [`chrome.proxy`](https://developer.chrome.com/docs/extensions/reference/api/proxy)
    API.


    Warning displayed: *Read and change all your data on all websites.*

`"readingList"`
:   Gives access to the
    [`chrome.readingList`](https://developer.chrome.com/docs/extensions/reference/api/readingList) API.


    Warning displayed: *Read and change entries in the reading list.*

`"runtime"`
:   Gives access to [`runtime.connectNative()`](https://developer.chrome.com/docs/extensions/reference/api/runtime#method-connectNative)
    and [`runtime.sendNativeMessage()`](https://developer.chrome.com/docs/extensions/reference/api/runtime#method-sendNativeMessage).
    For all other features of the `runtime` namespace, no permission is required.

`"scripting"`
:   Gives access to the
    [`chrome.scripting`](https://developer.chrome.com/docs/extensions/reference/api/scripting) API.

`"search"`
:   Gives access to the
    [`chrome.search`](https://developer.chrome.com/docs/extensions/reference/api/search) API.

`"sessions"`
:   Gives access to the
    [`chrome.sessions`](https://developer.chrome.com/docs/extensions/reference/api/sessions) API.


    Warnings displayed:  

    - When used with the `"history"` permission: *Read and change your browsing
      history on all your
      signed-in devices.*
    - When used with the `"tabs"` permission: *Read your browsing history on all
      your signed-in devices.*

`"sidePanel"`
:   Gives access to the
    [`chrome.sidePanel`](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) API.

`"storage"`
:   Gives access to the
    [`chrome.storage`](https://developer.chrome.com/docs/extensions/reference/api/storage) API.

`"system.cpu"`
:   Gives access to the
    [`chrome.system.cpu`](https://developer.chrome.com/docs/extensions/reference/api/system/cpu) API.

`"system.display"`
:   Gives access to the
    [`chrome.system.display`](https://developer.chrome.com/docs/extensions/reference/api/system/display)
    API.

`"system.memory"`
:   Gives access to the
    [`chrome.system.memory`](https://developer.chrome.com/docs/extensions/reference/api/system/memory)
    API.

`"system.storage"`
:   Gives access to the
    [`chrome.system.storage`](https://developer.chrome.com/docs/extensions/reference/api/system/storage)
    API.


    Warning displayed: *Identify and eject storage devices.*

`"tabCapture"`
:   Gives access to the
    [`chrome.tabCapture`](https://developer.chrome.com/docs/extensions/reference/api/tabCapture) API.


    Warning displayed: *Read and change all your data on all websites.*

`"tabGroups"`
:   Gives access to the
    [`chrome.tabGroups`](https://developer.chrome.com/docs/extensions/reference/api/tabGroups) API.


    Warning displayed: *View and manage your tab groups.*

`"tabs"`
:   Gives access to privileged fields of the Tab objects used by several APIs,
    including [`chrome.tabs`](https://developer.chrome.com/docs/extensions/reference/api/tabs) and
    [`chrome.windows`](https://developer.chrome.com/docs/extensions/reference/api/windows). You usually
    don't need to declare this permission to use those APIs.


    Warning displayed: *Read your browsing history.*

`"topSites"`
:   Gives access to the
    [`chrome.topSites`](https://developer.chrome.com/docs/extensions/reference/api/topSites) API.


    Warning displayed: *Read a list of your most frequently visited websites.*

`"tts"`
:   Gives access to the [`chrome.tts`](https://developer.chrome.com/docs/extensions/reference/api/tts) API.

`"ttsEngine"`
:   Gives access to the
    [`chrome.ttsEngine`](https://developer.chrome.com/docs/extensions/reference/api/ttsEngine) API.


    Warning displayed: *Read all text spoken using synthesized speech.*

`"unlimitedStorage"`
:   Provides an unlimited quota for [`chrome.storage.local`](https://developer.chrome.com/docs/extensions/reference/api/storage#property-local),
    [`IndexedDB`](https://developer.mozilla.org/docs/Web/API/IndexedDB_API),
    [`Cache Storage`](https://developer.mozilla.org/docs/Web/API/Cache),
    and [`Origin Private File System`](https://web.dev/origin-private-file-system/).
    For more information, see [Storage and cookies](https://developer.chrome.com/docs/extensions/develop/concepts/storage-and-cookies).

`"userScripts"`
:   Gives access to the
    [`chrome.userScripts`](https://developer.chrome.com/docs/extensions/reference/api/userScripts) API. NOTE:
    the user must also
    [explicitly enable](https://developer.chrome.com/docs/extensions/reference/api/userScripts#enable-user-scripts-api)
    the usage of user scripts.

`"vpnProvider"`
:   Gives access to the
    [`chrome.vpnProvider`](https://developer.chrome.com/docs/extensions/reference/api/vpnProvider) API.

`"wallpaper"`
:   Gives access to the
    [`chrome.wallpaper`](https://developer.chrome.com/docs/extensions/reference/api/wallpaper) API.

`"webAuthenticationProxy"`
:   Gives access to the [`chrome.webAuthenticationProxy`](https://developer.chrome.com/docs/extensions/reference/api/webAuthenticationProxy)
    API.


    Warning displayed: *Read and change all your data on all websites.*

`"webNavigation"`
:   Gives access to the
    [`chrome.webNavigation`](https://developer.chrome.com/docs/extensions/reference/api/webNavigation)
    API.


    Warning displayed: *Read your browsing history.*

`"webRequest"`
:   Gives access to the
    [`chrome.webRequest`](https://developer.chrome.com/docs/extensions/reference/api/webRequest) API.

`"webRequestBlocking"`
:   Allows the use of the
    [`chrome.webRequest`](https://developer.chrome.com/docs/extensions/reference/api/webRequest#permissions) API for
    blocking.