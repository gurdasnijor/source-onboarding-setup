import React, {Component} from 'react'
import ConnectionHeaderApp from './containers/ConnectionHeaderApp'

class SourceInstallationApp extends Component {
  render() {
    return (
      <React.Fragment>
        <ConnectionHeaderApp
          workspaceSlug="broccoli-biscuits"
          sourceSlug="ios_txwr"
        />
      </React.Fragment>
    )
  }
}

export default SourceInstallationApp
