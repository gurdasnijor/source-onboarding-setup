import React, {Component} from 'react'
import {Pane, majorScale} from 'evergreen-ui'
import ConnectionHeaderApp from './containers/ConnectionHeaderApp'
import DebuggerApp from './containers/DebuggerApp'

class SourceInstallationApp extends Component {
  render() {
    return (
      <Pane background="tint2" padding={majorScale(1)}>
        <Pane background="white" margin={majorScale(2)}>
          <ConnectionHeaderApp
            workspaceSlug="doximity"
            sourceSlug="foundation"
          />
        </Pane>
        <Pane marginTop={majorScale(2)} display="flex">
          <Pane flex={1} background="white" margin={majorScale(2)}>
            hi
          </Pane>
          <Pane flex={1} background="white" margin={majorScale(2)}>
            <DebuggerApp
              workspaceSlug="broccoli-biscuits"
              sourceSlug="ios_txwr"
            />
          </Pane>
        </Pane>
      </Pane>
    )
  }
}

export default SourceInstallationApp
