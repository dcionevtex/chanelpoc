// Workaround for a local install issue observed on some Windows machines: `yarn install` /
// `npm install` can silently drop @faststore/core's src/pages/s.tsx (the Search page route)
// during extraction, even though the file is present in the published npm package. A plain
// `tar` extraction of the same tarball keeps the file, so this is specific to how the Node.js
// install tooling writes it on that machine (e.g. real-time antivirus/EDR interference), not a
// problem with the package itself.
//
// This script is a no-op everywhere the file already exists (Vercel/CI on Linux included). It
// only restores the file, and only when the installed @faststore/core version matches the one
// this fallback copy was vendored from, so it can never paper over a real change in a future
// @faststore/core release.

const fs = require('fs')
const path = require('path')

const VENDORED_FOR_VERSION = '4.7.0'

const corePkgPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@faststore',
  'core',
  'package.json'
)
const targetPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@faststore',
  'core',
  'src',
  'pages',
  's.tsx'
)

if (fs.existsSync(targetPath)) {
  process.exit(0)
}

if (!fs.existsSync(corePkgPath)) {
  process.exit(0)
}

const installedVersion = JSON.parse(fs.readFileSync(corePkgPath, 'utf8')).version

if (installedVersion !== VENDORED_FOR_VERSION) {
  console.warn(
    `[restore-missing-search-page] node_modules/@faststore/core/src/pages/s.tsx is missing, ` +
      `but the installed @faststore/core version (${installedVersion}) doesn't match the ` +
      `vendored fallback (${VENDORED_FOR_VERSION}). Skipping automatic restore — ` +
      `re-run "yarn install" or check the file manually; the Search page ("/s") will fail to ` +
      `build until it's present.`
  )
  process.exit(0)
}

const SEARCH_PAGE_SOURCE = `import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import type { SearchState } from '@faststore/sdk'
import type { SearchSettings } from 'src/server/cms'
import {
  formatSearchState,
  parseSearchState,
  SearchProvider,
} from '@faststore/sdk'
import { SROnly as UISROnly } from '@faststore/ui'

import { ITEMS_PER_PAGE } from 'src/constants'
import { useApplySearchState } from 'src/sdk/search/state'

import storeConfig from 'discovery.config'

import { SearchWrapper } from 'src/components/templates/SearchPage'
import {
  getStaticProps,
  type SearchPageProps,
} from 'src/experimental/searchServerSideFunctions'
import { getStoreURL } from 'src/sdk/localization/useLocalizationConfig'

export interface SearchPageContextType {
  title: string
  searchTerm?: string
}

const useSearchParams = ({
  sort: defaultSort,
}: {
  sort: SearchState['sort']
}) => {
  const { asPath } = useRouter()

  return useMemo(() => {
    const url = new URL(asPath, 'http://localhost')

    const shouldUpdateDefaultSort = defaultSort && !url.searchParams.has('sort')
    if (shouldUpdateDefaultSort) {
      url.searchParams.set('sort', defaultSort)
    }

    const newState = parseSearchState(url)
    const hrefState = formatSearchState(newState).href
    return parseSearchState(new URL(hrefState))
  }, [asPath, defaultSort])
}

type StoreConfig = typeof storeConfig

function generateSEOData(
  storeConfig: StoreConfig,
  searchTerm?: string,
  pageSeoSettings?: SearchSettings['settings']['seo']
) {
  const { search: searchSeo, ...seo } = storeConfig.seo

  const isSSREnabled = storeConfig.experimental.enableSearchSSR

  const title = searchTerm ?? seo.title ?? 'Search Results'
  const titleTemplate =
    pageSeoSettings?.titleTemplate ??
    searchSeo?.titleTemplate ??
    seo.titleTemplate
  const description = searchSeo?.descriptionTemplate
    ? searchSeo.descriptionTemplate
        .replace(/%s/g, () => searchTerm ?? '')
        ?.trim()
    : seo.description?.trim()

  // default behavior without SSR
  if (!isSSREnabled) {
    return {
      noindex: searchSeo?.noIndex ?? true,
      nofollow: searchSeo?.noFollow ?? true,
      title,
      titleTemplate,
      description,
      openGraph: {
        type: 'website',
        title,
        description,
      },
    }
  }

  const canonical = searchTerm
    ? \`\${getStoreURL()}/s?q=\${searchTerm.replaceAll(' ', '+')}\`
    : undefined

  return {
    noindex: searchSeo?.noIndex ?? true,
    nofollow: searchSeo?.noFollow ?? true,
    title,
    description,
    titleTemplate,
    canonical,
    openGraph: {
      type: 'website',
      title: title,
      description: description,
    },
  }
}

function Page({
  page: searchContentType,
  globalSections: globalSectionsProp,
  searchTerm,
}: SearchPageProps) {
  const { sections: globalSections, settings: globalSettings } =
    globalSectionsProp ?? {}
  const { settings } = searchContentType
  const applySearchState = useApplySearchState()
  const searchParams = useSearchParams({
    sort: settings?.productGallery?.sortBySelection as SearchState['sort'],
  })

  const itemsPerPage = settings?.productGallery?.itemsPerPage ?? ITEMS_PER_PAGE

  if (!searchParams) {
    return null
  }

  const [effectiveSearchTerm, setEffectiveSearchTerm] = useState<
    string | undefined
  >(() => searchTerm ?? undefined)

  useEffect(() => {
    if (!searchTerm && searchParams.term) {
      setEffectiveSearchTerm(searchParams.term)
    }
  }, [searchParams.term, searchTerm])

  const { noindex, nofollow, ...seoData } = generateSEOData(
    storeConfig,
    effectiveSearchTerm,
    settings?.seo
  )

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={itemsPerPage}
      shouldResetInfiniteScroll={!storeConfig.experimental?.scrollRestoration}
      {...searchParams}
    >
      {/* SEO */}
      <NextSeo noindex={noindex} nofollow={nofollow} {...seoData} />

      <UISROnly text={seoData.title} />

      {/*
          WARNING: Do not import or render components from any
          other folder than '../components/sections' in here.

          This is necessary to keep the integration with the CMS
          easy and consistent, enabling the change and reorder
          of elements on this page.

          If needed, wrap your component in a <Section /> component
          (not the HTML tag) before rendering it here.
        */}
      <SearchWrapper
        itemsPerPage={itemsPerPage}
        searchContentType={searchContentType}
        serverData={{
          title: seoData.title,
          searchTerm: effectiveSearchTerm,
        }}
        globalSections={globalSections}
        globalSettings={globalSettings}
      />
    </SearchProvider>
  )
}

export { getStaticProps }

export default Page
`

fs.writeFileSync(targetPath, SEARCH_PAGE_SOURCE)
console.warn(
  '[restore-missing-search-page] Restored node_modules/@faststore/core/src/pages/s.tsx ' +
    '(was missing after install — see scripts/restore-missing-search-page.js for why).'
)
