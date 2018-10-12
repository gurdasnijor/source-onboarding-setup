import React, {Component} from 'react'
import {Pane} from 'evergreen-ui'
import {get} from 'lodash'
import Debugger from '../components/Debugger'

function normalize(event) {
  return {
    type: event.type,
    messageId: event.messageId,
    receivedAt: event.receivedAt,
    isTest: Math.random() * 100 >= 90,
    name:
      get(event, 'traits.name') ||
      get(event, 'properties.title') ||
      get(event, 'event') ||
      ''
  }
}

export default class DebuggerApp extends Component {
  // Later
  // static propTypes = {
  //   workspaceSlug: PropTypes.string.isRequired,
  //   sourceSlug: PropTypes.string.isRequired
  // }

  state = {
    events: []
  }

  componentDidMount() {
    this.evtSource = new EventSource('http://localhost:3001')
    this.evtSource.addEventListener('message', this.onMessage)
  }

  componentWillUnmount() {
    this.evtSource.close()
  }

  onMessage = message => {
    const event = normalize(JSON.parse(message.data))
    this.setState(state => {
      const events = [event, ...state.events].slice(0, 10)
      return {
        events
      }
    })
  }

  render() {
    const {events} = this.state
    return (
      <Pane maxHeigth={400} padding={1} overflow="auto">
        <Debugger events={events} />
      </Pane>
    )
  }
}
