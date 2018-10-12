import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Pane, Text, Image, Badge, majorScale} from 'evergreen-ui'
import moment from 'moment'

import Track from './icons/Track.svg'
import User from './icons/User.svg'
import Page from './icons/Page.svg'
import Alias from './icons/Alias.svg'
import Group from './icons/Group.svg'

const icons = {
  track: Track,
  identify: User,
  page: Page,
  alias: Alias,
  group: Group
}

export default class Debugger extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        messageId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isTest: PropTypes.bool.isRequired,
        receivedAt: PropTypes.string.isRequired
      })
    ).isRequired
  }

  render() {
    const {events} = this.props
    return (
      <Pane>
        {events.map(event => {
          return (
            <Pane
              key={event.messageId}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={majorScale(2)}
              elevation={0}
              hoverElevation={1}
              cursor="pointer"
            >
              <Pane display="flex">
                <Pane
                  width={majorScale(3)}
                  height={majorScale(3)}
                  marginX={majorScale(2)}
                >
                  <Image src={icons[event.type]} alt={event.type} />
                </Pane>
                <Text>{event.name}</Text>
              </Pane>

              <Pane>
                <time>{moment(event.receivedAt).calendar()}</time>
                {event.isTest && (
                  <Badge marginLeft={majorScale(2)} color="purple">
                    Test
                  </Badge>
                )}
              </Pane>
            </Pane>
          )
        })}
      </Pane>
    )
  }
}
