refresh date: 2026-09-25
robots: noindex

<br />

> [!NOTE]
> **Important:** This API works **only on ChromeOS**.

<br />

<br />

## Description

Use this API to expose certificates to the platform which can use these certificates for TLS authentications.

<br />

<br />

## Permissions

`certificateProvider`  

<br />

<br />

## Availability

Chrome 46+ ChromeOS only

<br />

<br />

## Usage

Typical usage of this API to expose client certificates to ChromeOS follows these steps:

- The Extension registers for the events [onCertificatesUpdateRequested](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onCertificatesUpdateRequested) and [onSignatureRequested](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onSignatureRequested).
- The Extension calls [setCertificates](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-setCertificates) to provide the initial list of certificates after the initialization.
- The Extension monitors the changes in the list of available certificates and calls [setCertificates](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-setCertificates) to notify the browser about every such change.
- During a TLS handshake, the browser receives a client certificate request. With an [onCertificatesUpdateRequested](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onCertificatesUpdateRequested) event, the browser asks the Extension to report all certificates that it currently provides.
- The Extension reports back with the currently available certificates, using the [setCertificates](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-setCertificates) method.
- The browser matches all available certificates with the client certificate request from the remote host. The matches are presented to the user in a selection dialog.
- The user can select a certificate and thereby approve the authentication or abort the authentication.

![Certificate selection dialog](https://developer.chrome.com/static/images/certificate_provider_selection_dialog.png)

- If the user aborts the authentication or no certificate matched the request, the TLS client authentication is aborted.
- Otherwise, if the user approves the authentication with a certificate provided by this Extension, the browser requests the Extension to sign the data to continue the TLS handshake. The request is sent as a [onSignatureRequested](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onSignatureRequested) event.
- This event contains input data, declares which algorithm has to be used to generate the signature, and refers to one of the certificates that were reported by this Extension. The Extension must create a signature for the given data using the private key associated with the referenced certificate. Creating the signature might require prepending a DigestInfo and padding the result before the actual signing.
- The Extension sends back the signature to the browser using the [reportSignature](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-reportSignature) method. If the signature couldn't be calculated, the method has to be called without signature.
- If the signature was provided, the browser completes the TLS handshake.

The actual sequence of steps can be different. For example, the user will not be asked to select a certificate if the enterprise policy to automatically select a certificate is used (see [AutoSelectCertificateForUrls](https://cloud.google.com/docs/chrome-enterprise/policies/?policy=AutoSelectCertificateForUrls) and [Chrome policies for users](https://support.google.com/chrome/a/answer/2657289#AutoSelectCertificateForUrls)).

In the Extension, this can look similar to the following snippet:

    function collectAvailableCertificates() {
      // Return all certificates that this Extension can currently provide.
      // For example:
      return [{
        certificateChain: [new Uint8Array(...)],
        supportedAlgorithms: ['RSASSA_PKCS1_v1_5_SHA256']
      }];
    }

    // The Extension calls this function every time the currently available list of
    // certificates changes, and also once after the Extension's initialization.
    function onAvailableCertificatesChanged() {
      chrome.certificateProvider.setCertificates({
        clientCertificates: collectAvailableCertificates()
      });
    }

    function handleCertificatesUpdateRequest(request) {
      // Report the currently available certificates as a response to the request
      // event. This is important for supporting the case when the Extension is
      // unable to detect the changes proactively.
      chrome.certificateProvider.setCertificates({
        certificatesRequestId: request.certificatesRequestId,
        clientCertificates: collectAvailableCertificates()
      });
    }

    // Returns a private key handle for the given DER-encoded certificate.
    // |certificate| is an ArrayBuffer.
    function getPrivateKeyHandle(certificate) {...}

    // Digests and signs |input| with the given private key. |input| is an
    // ArrayBuffer. |algorithm| is an Algorithm.
    // Returns the signature as ArrayBuffer.
    function signUnhashedData(privateKey, input, algorithm) {...}

    function handleSignatureRequest(request) {
      // Look up the handle to the private key of |request.certificate|.
      const key = getPrivateKeyHandle(request.certificate);
      if (!key) {
        // Handle if the key isn't available.
        console.error('Key for requested certificate not available.');

        // Abort the request by reporting the error to the API.
        chrome.certificateProvider.reportSignature({
          signRequestId: request.signRequestId,
          error: 'GENERAL_ERROR'
        });
        return;
      }

      const signature = signUnhashedData(key, request.input, request.algorithm);
      chrome.certificateProvider.reportSignature({
        signRequestId: request.signRequestId,
        signature: signature
      });
    }

    chrome.certificateProvider.onCertificatesUpdateRequested.addListener(
        handleCertificatesUpdateRequest);
    chrome.certificateProvider.onSignatureRequested.addListener(
        handleSignatureRequest);

<br />

## Types

### Algorithm

Chrome 86+

Types of supported cryptographic signature algorithms.

#### Enum

"RSASSA_PKCS1_v1_5_MD5_SHA1"   
Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the MD5-SHA-1 hashing. The extension must not prepend a DigestInfo prefix but only add PKCS#1 padding. This algorithm is deprecated and will never be requested by Chrome as of version 109.
"RSASSA_PKCS1_v1_5_SHA1"   
Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-1 hash function.
"RSASSA_PKCS1_v1_5_SHA256"   
Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-256 hashing function.
"RSASSA_PKCS1_v1_5_SHA384"   
Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-384 hashing function.
"RSASSA_PKCS1_v1_5_SHA512"   
Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-512 hashing function.
"RSASSA_PSS_SHA256"   
Specifies the RSASSA PSS signature algorithm with the SHA-256 hashing function, MGF1 mask generation function and the salt of the same size as the hash.
"RSASSA_PSS_SHA384"   
Specifies the RSASSA PSS signature algorithm with the SHA-384 hashing function, MGF1 mask generation function and the salt of the same size as the hash.
"RSASSA_PSS_SHA512"   
Specifies the RSASSA PSS signature algorithm with the SHA-512 hashing function, MGF1 mask generation function and the salt of the same size as the hash.

<br />

### CertificateInfo

#### Properties

- certificate ArrayBuffer

  Must be the DER encoding of a X.509 certificate. Currently, only certificates of RSA keys are supported.
- supportedHashes [Hash](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-Hash)\[\]

  Must be set to all hashes supported for this certificate. This extension will only be asked for signatures of digests calculated with one of these hash algorithms. This should be in order of decreasing hash preference.

### CertificatesUpdateRequest

Chrome 86+

#### Properties

- certificatesRequestId number

  Request identifier to be passed to [`setCertificates`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-setCertificates).

### ClientCertificateInfo

Chrome 86+

#### Properties

- certificateChain ArrayBuffer\[\]

  The array must contain the DER encoding of the X.509 client certificate as its first element.

  This must include exactly one certificate.
- supportedAlgorithms [Algorithm](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-Algorithm)\[\]

  All algorithms supported for this certificate. The extension will only be asked for signatures using one of these algorithms.

### Error

Chrome 86+

Types of errors that the extension can report.

#### Value

"GENERAL_ERROR"   

### Hash

Deprecated. Replaced by [`Algorithm`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-Algorithm).

#### Enum

"MD5_SHA1"   
Specifies the MD5 and SHA1 hashing algorithms.
"SHA1"   
Specifies the SHA1 hashing algorithm.
"SHA256"   
Specifies the SHA256 hashing algorithm.
"SHA384"   
Specifies the SHA384 hashing algorithm.
"SHA512"   
Specifies the SHA512 hashing algorithm.

<br />

### PinRequestErrorType

Chrome 57+

The types of errors that can be presented to the user through the requestPin function.

#### Enum

"INVALID_PIN"   
Specifies the PIN is invalid.
"INVALID_PUK"   
Specifies the PUK is invalid.
"MAX_ATTEMPTS_EXCEEDED"   
Specifies the maximum attempt number has been exceeded.
"UNKNOWN_ERROR"   
Specifies that the error cannot be represented by the above types.

<br />

### PinRequestType

Chrome 57+

The type of code being requested by the extension with requestPin function.

#### Enum

"PIN"   
Specifies the requested code is a PIN.
"PUK"   
Specifies the requested code is a PUK.

<br />

### PinResponseDetails

Chrome 57+

#### Properties

- userInput string optional

  The code provided by the user. Empty if user closed the dialog or some other error occurred.

### ReportSignatureDetails

Chrome 86+

#### Properties

- error "GENERAL_ERROR"   
  optional

  Error that occurred while generating the signature, if any.
- signRequestId number

  Request identifier that was received via the [`onSignatureRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onSignatureRequested) event.
- signature ArrayBuffer optional

  The signature, if successfully generated.

### RequestPinDetails

Chrome 57+

#### Properties

- attemptsLeft number optional

  The number of attempts left. This is provided so that any UI can present this information to the user. Chrome is not expected to enforce this, instead stopPinRequest should be called by the extension with errorType = MAX_ATTEMPTS_EXCEEDED when the number of pin requests is exceeded.
- errorType [PinRequestErrorType](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-PinRequestErrorType) optional

  The error template displayed to the user. This should be set if the previous request failed, to notify the user of the failure reason.
- requestType [PinRequestType](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-PinRequestType) optional

  The type of code requested. Default is PIN.
- signRequestId number

  The ID given by Chrome in SignRequest.

### SetCertificatesDetails

Chrome 86+

#### Properties

- certificatesRequestId number optional

  When called in response to [`onCertificatesUpdateRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onCertificatesUpdateRequested), should contain the received `certificatesRequestId` value. Otherwise, should be unset.
- clientCertificates [ClientCertificateInfo](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-ClientCertificateInfo)\[\]

  List of currently available client certificates.
- error "GENERAL_ERROR"   
  optional

  Error that occurred while extracting the certificates, if any. This error will be surfaced to the user when appropriate.

### SignatureRequest

Chrome 86+

#### Properties

- algorithm [Algorithm](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-Algorithm)

  Signature algorithm to be used.
- certificate ArrayBuffer

  The DER encoding of a X.509 certificate. The extension must sign `input` using the associated private key.
- input ArrayBuffer

  Data to be signed. Note that the data is not hashed.
- signRequestId number

  Request identifier to be passed to [`reportSignature`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-reportSignature).

### SignRequest

#### Properties

- certificate ArrayBuffer

  The DER encoding of a X.509 certificate. The extension must sign `digest` using the associated private key.
- digest ArrayBuffer

  The digest that must be signed.
- hash [Hash](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-Hash)

  Refers to the hash algorithm that was used to create `digest`.
- signRequestId number
  Chrome 57+

  The unique ID to be used by the extension should it need to call a method that requires it, e.g. requestPin.

### StopPinRequestDetails

Chrome 57+

#### Properties

- errorType [PinRequestErrorType](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-PinRequestErrorType) optional

  The error template. If present it is displayed to user. Intended to contain the reason for stopping the flow if it was caused by an error, e.g. MAX_ATTEMPTS_EXCEEDED.
- signRequestId number

  The ID given by Chrome in SignRequest.

## Methods

### reportSignature()

Promise Chrome 86+

```typescript
chrome.certificateProvider.reportSignature(
  details: ReportSignatureDetails,
  callback?: function,
): Promise<void>
```

Should be called as a response to [`onSignatureRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onSignatureRequested).

The extension must eventually call this function for every [`onSignatureRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onSignatureRequested) event; the API implementation will stop waiting for this call after some time and respond with a timeout error when this function is called.

#### Parameters

- details [ReportSignatureDetails](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-ReportSignatureDetails)
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### requestPin()

Promise Chrome 57+

```typescript
chrome.certificateProvider.requestPin(
  details: RequestPinDetails,
  callback?: function,
): Promise<https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-PinResponseDetails | undefined>
```

Requests the PIN from the user. Only one ongoing request at a time is allowed. The requests issued while another flow is ongoing are rejected. It's the extension's responsibility to try again later if another flow is in progress.

#### Parameters

- details [RequestPinDetails](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-RequestPinDetails)

  Contains the details about the requested dialog.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  (details?: PinResponseDetails) => void
  ```

  <br />

  - details [PinResponseDetails](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-PinResponseDetails) optional

#### Returns

- Promise\<[PinResponseDetails](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-PinResponseDetails) \| undefined\>
  Chrome 96+

  Returns a Promise which resolves when the PIN is provided by the user. Rejects with an error if the dialog request finishes unsuccessfully (e.g. the dialog was canceled by the user or was not allowed to be shown).


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### setCertificates()

Promise Chrome 86+

```typescript
chrome.certificateProvider.setCertificates(
  details: SetCertificatesDetails,
  callback?: function,
): Promise<void>
```

Sets a list of certificates to use in the browser.

The extension should call this function after initialization and on every change in the set of currently available certificates. The extension should also call this function in response to [`onCertificatesUpdateRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onCertificatesUpdateRequested) every time this event is received.

#### Parameters

- details [SetCertificatesDetails](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-SetCertificatesDetails)

  The certificates to set. Invalid certificates will be ignored.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves upon completion.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

### stopPinRequest()

Promise Chrome 57+

```typescript
chrome.certificateProvider.stopPinRequest(
  details: StopPinRequestDetails,
  callback?: function,
): Promise<void>
```

Stops the pin request started by the [`requestPin`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-requestPin) function.

#### Parameters

- details [StopPinRequestDetails](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-StopPinRequestDetails)

  Contains the details about the reason for stopping the request flow.
- callback function optional


  The `callback` parameter looks like:

  ```typescript
  () => void
  ```

  <br />

#### Returns

- Promise\<void\>
  Chrome 96+

  Returns a Promise which resolves when the request to close the PIN dialog is complete.


  Promises are only supported for Manifest V3 and later, other platforms need to use callbacks.

## Events

### onCertificatesRequested

Chrome 47+ ≤ MV2 Deprecated since Chrome 86

```typescript
chrome.certificateProvider.onCertificatesRequested.addListener(
  callback: function,
)
```

Use [`onCertificatesUpdateRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onCertificatesUpdateRequested) instead.

<br />

This event fires every time the browser requests the current list of certificates provided by this extension. The extension must call `reportCallback` exactly once with the current list of certificates.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (reportCallback: function) => void
  ```

  <br />

  - reportCallback function


    The `reportCallback` parameter looks like:

    ```typescript
    (certificates: CertificateInfo[], callback: function) => void
    ```

    <br />

    - certificates [CertificateInfo](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-CertificateInfo)\[\]
    - callback function


      The `callback` parameter looks like:

      ```typescript
      (rejectedCertificates: ArrayBuffer[]) => void
      ```

      <br />

      - rejectedCertificates ArrayBuffer\[\]

### onCertificatesUpdateRequested

Chrome 86+

```typescript
chrome.certificateProvider.onCertificatesUpdateRequested.addListener(
  callback: function,
)
```

This event fires if the certificates set via [`setCertificates`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-setCertificates) are insufficient or the browser requests updated information. The extension must call [`setCertificates`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-setCertificates) with the updated list of certificates and the received `certificatesRequestId`.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (request: CertificatesUpdateRequest) => void
  ```

  <br />

  - request [CertificatesUpdateRequest](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-CertificatesUpdateRequest)

### onSignatureRequested

Chrome 86+

```typescript
chrome.certificateProvider.onSignatureRequested.addListener(
  callback: function,
)
```

This event fires every time the browser needs to sign a message using a certificate provided by this extension via [`setCertificates`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-setCertificates).

The extension must sign the input data from `request` using the appropriate algorithm and private key and return it by calling [`reportSignature`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#method-reportSignature) with the received `signRequestId`.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (request: SignatureRequest) => void
  ```

  <br />

  - request [SignatureRequest](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-SignatureRequest)

### onSignDigestRequested

≤ MV2 Deprecated since Chrome 86

```typescript
chrome.certificateProvider.onSignDigestRequested.addListener(
  callback: function,
)
```

Use [`onSignatureRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onSignatureRequested) instead.

<br />

This event fires every time the browser needs to sign a message using a certificate provided by this extension in reply to an [`onCertificatesRequested`](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#event-onCertificatesRequested) event. The extension must sign the data in `request` using the appropriate algorithm and private key and return it by calling `reportCallback`. `reportCallback` must be called exactly once.

#### Parameters

- callback function


  The `callback` parameter looks like:

  ```typescript
  (request: SignRequest, reportCallback: function) => void
  ```

  <br />

  - request [SignRequest](https://developer.chrome.com/docs/extensions/mv2/reference/certificateProvider#type-SignRequest)
  - reportCallback function
    Chrome 47+


    The `reportCallback` parameter looks like:

    ```typescript
    (signature?: ArrayBuffer) => void
    ```

    <br />

    - signature ArrayBuffer optional

<br />