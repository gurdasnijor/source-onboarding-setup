import React from 'react'
import PropTypes from 'prop-types'
import {
  Pane,
  Image,
  majorScale,
  minorScale,
  Tooltip,
  Text,
  Menu
} from 'evergreen-ui'
import {uniqBy} from 'lodash'

const size = majorScale(2)

const DestinationRow = ({destinations = []}) => {
  const uniqDestinations = uniqBy(destinations, d => d.metadata.slug)

  return (
    <Pane>
      <Tooltip
        appearance="card"
        content={<DestinationsTooltip destinations={destinations} />}
      >
        <Pane display="flex" alignItems="center">
          {uniqDestinations.slice(0, 3).map(destination => (
            <DestinationLogo
              key={destination.id}
              destination={destination}
              size={size}
            />
          ))}
        </Pane>
      </Tooltip>
    </Pane>
  )
}

function DestinationsTooltip({destinations}) {
  return (
    <Pane paddingBottom={size}>
      <Menu>
        <Menu.Group title="Destinations">
          <Pane maxHeight={300} overflow="auto">
            {destinations.map(destination => {
              const meta = destination.metadata
              return (
                <Menu.Item key={destination.id} minWidth={400}>
                  <Pane display="flex" flexDirection="row" alignItems="center">
                    <Image
                      maxHeight={size}
                      maxWidth={size}
                      src={meta.logos.mark || meta.logos.default}
                      alt={meta.name}
                      margin={size / 2}
                    />
                    <Text>{meta.name}</Text>
                  </Pane>
                </Menu.Item>
              )
            })}
          </Pane>
        </Menu.Group>
      </Menu>
    </Pane>
  )
}

DestinationsTooltip.propTypes = {
  destinations: PropTypes.array.isRequired
}

function DestinationLogo({destination}) {
  const logos = destination.metadata.logos
  return (
    <Pane paddingX={minorScale(1)}>
      <Image
        width={size}
        src={logos.mark || logos.default}
        alt={destination.slug}
      />
    </Pane>
  )
}

DestinationLogo.propTypes = {
  destination: PropTypes.object.isRequired
}

DestinationRow.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      metadata: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
}

export default DestinationRow
