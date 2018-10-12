import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Pane,
  Text,
  Heading,
  Image,
  majorScale,
  Button
} from 'evergreen-ui'

import DestinationRow from './DestinationRow'

const metadataShape = {
  slug: PropTypes.string.isRequired,
  logos: PropTypes.shape({
    default: PropTypes.string.isRequired
  }).isRequired
}

const connectedDestinationShape = {
  id: PropTypes.string.isRequired,
  metadata: PropTypes.shape(metadataShape).isRequired
}

export default class ConnectionHeader extends Component {
  static propTypes = {
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
      connectedDestinations: PropTypes.arrayOf(
        PropTypes.shape(connectedDestinationShape)
      ).isRequired,
      metadata: PropTypes.shape(metadataShape)
    }).isRequired
  }

  render() {
    const {name, connectedDestinations, metadata} = this.props.source
    return (
      <Card
        elevation={0}
        padding={majorScale(2)}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src={metadata.logos.default} alt={name} />
        <Pane flex={1} marginX={majorScale(2)}>
          <Pane>
            <Heading>{name}</Heading>{' '}
            <Text>
              Connected to {connectedDestinations.length} destinations
            </Text>
          </Pane>
        </Pane>
        <DestinationRow destinations={connectedDestinations} />
        <Button marginLeft={majorScale(2)} iconBefore="plus">
          Add Destination
        </Button>
      </Card>
    )
  }
}
