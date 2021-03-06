import React from 'react'
import { render } from 'react-dom'

import { appendParamsToUrl, replaceExistingKeys, callIfEmbedIdMatches, noop } from './utils'
import { transferUrlParametersToQueryStrings } from './utils/url-parameters-transfer'
import { isMobile } from './utils/mobile-detection'
import Widget from './views/widget'
import { getPostMessageHandler } from './utils/get-post-message-handler'
import randomString from './utils/random-string'

const defaultOptions = {
  mode: 'embed-widget',
  hideFooter: false,
  hideHeaders: false,
  medium: 'embed-sdk',
  source: window?.location?.hostname.replace('www.', ''),
  hideScrollbars: false,
  disableTracking: false,
  transferableUrlParameters: [],
  shareGoogleAnalyticsInstance: false,
  onSubmit: noop,
  onScreenChanged: noop,
}

const queryStringKeys = {
  mode: 'typeform-embed',
  source: 'typeform-source',
  medium: 'typeform-medium',
  mediumVersion: 'typeform-medium-version',
  hideFooter: 'embed-hide-footer',
  hideHeaders: 'embed-hide-headers',
  opacity: 'embed-opacity',
  disableTracking: 'disable-tracking',
  shareGoogleAnalyticsInstance: 'share-ga-instance',
}

export default function makeWidget(element, url, options) {
  const embedId = randomString()
  options = { ...defaultOptions, ...options }

  window.addEventListener(
    'message',
    callIfEmbedIdMatches(getPostMessageHandler('form-ready', options.onReady), embedId)
  )

  const enabledFullscreen = window.forceFullscreen || isMobile(navigator.userAgent)

  let queryStrings = replaceExistingKeys(options, queryStringKeys)
  queryStrings = transferUrlParametersToQueryStrings(options.transferableUrlParameters, queryStrings)

  const urlWithQueryString = appendParamsToUrl(url, queryStrings)

  render(
    <Widget embedId={embedId} enabledFullscreen={enabledFullscreen} options={options} url={urlWithQueryString} />,
    element
  )
}
