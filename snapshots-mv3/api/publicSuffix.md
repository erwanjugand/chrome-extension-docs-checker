<br />

<br />

## Description

Use the `chrome.publicSuffix` API to query the browser's Public Suffix List (PSL).

<br />

<br />

## Permissions

`publicSuffix`  

<br />

<br />

## Availability

Chrome 153+

<br />

<br />

<br />

## Types

### DomainEncoding

The encoding to use for returned domains.

#### Enum

"punycode"   
"display"   

<br />

### DomainOptions

#### Properties

- allowIPAddress boolean optional

  Whether IP addresses may be returned as domains. Defaults to false. Note: When allowed, IP addresses are returned without being looked up in the Public Suffix List.
- allowPlainSuffix boolean optional

  Whether known public suffixes may be returned as domains. Defaults to false.
- allowUnknownSuffix boolean optional

  Whether unknown TLDs should be considered as a public suffix. For example, for non-public hostnames like `printer.internal-network`. Defaults to false.
- encoding [DomainEncoding](https://developer.chrome.com/docs/extensions/reference/api/publicSuffix#type-DomainEncoding) optional

  The encoding to use for the returned domain. Defaults to "punycode", but pass "display" if displaying the domain to the user. Generally, "display" will use Unicode, except in cases where that would be unsafe due to ["Unicode confusables"](https://www.unicode.org/reports/tr39/#Confusable_Detection).

## Methods

### getDomain()

```typescript
chrome.publicSuffix.getDomain(
  hostname: string,
  options?: DomainOptions,
): string | undefined
```

Gets the registrable domain for `hostname`, if any.

#### Parameters

- hostname string
- options [DomainOptions](https://developer.chrome.com/docs/extensions/reference/api/publicSuffix#type-DomainOptions) optional

#### Returns

- string \| undefined

### getKnownSuffix()

```typescript
chrome.publicSuffix.getKnownSuffix(
  hostname: string,
): string | undefined
```

Gets the known public suffix for `hostname`, if any.

#### Parameters

- hostname string

#### Returns

- string \| undefined

### isKnownSuffix()

```typescript
chrome.publicSuffix.isKnownSuffix(
  hostname: string,
): boolean
```

Determines whether `hostname` is itself a known public suffix.

#### Parameters

- hostname string

#### Returns

- boolean

<br />