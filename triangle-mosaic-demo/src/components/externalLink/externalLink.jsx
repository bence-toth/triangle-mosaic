import React from 'react'
import classNames from 'classnames'
import {node, string} from 'prop-types'

import './externalLink.css'

const ExternalLink = ({
  url,
  children
}) => (
  <a
    className={classNames('link', 'external')}
    href={url}
    target='_blank'
    rel='noopener noreferrer'
  >
    {children}
  </a>
)

ExternalLink.propTypes = {
  url: string,
  children: node
}

export default ExternalLink
