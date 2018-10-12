import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Pane, Spinner} from 'evergreen-ui'
import Query from '../lib/Query'
import ConnectionHeader from '../components/ConnectionHeader'

const query = `
query app__SourceRow($workspaceSlug: String!, $sourceSlug: String!) {
  workspace(slug: $workspaceSlug) {
    id
    source(slug: $sourceSlug) {
      slug
      name
      metadata {
        slug
        name
        logos {
          default
          mark
        }
      }

      connectedDestinations {
        __typename
        ... on Integration {
          id
          metadata {
            slug
            name
            logos {
              default
              mark
            }
          }
        }
        ... on Warehouse {
          id
          metadata {
            slug
            name
            logos {
              default
              mark
            }
          }
        }
      }
    }
  }
}
`

export default class ConnectionHeaderApp extends Component {
  static propTypes = {
    workspaceSlug: PropTypes.string.isRequired,
    sourceSlug: PropTypes.string.isRequired
  }

  render() {
    const {workspaceSlug, sourceSlug} = this.props
    return (
      <Pane>
        <Query query={query} variables={{workspaceSlug, sourceSlug}}>
          {({data, isLoading}) => {
            if (isLoading) {
              return <Spinner />
            }

            const source = data.workspace.source

            return (
              <Pane>
                <ConnectionHeader source={source} />
              </Pane>
            )
          }}
        </Query>
      </Pane>
    )
  }
}
