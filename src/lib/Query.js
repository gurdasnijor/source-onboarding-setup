import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GraphQLClient} from 'graphql-request'

const path = 'https://gateway-api.segment.com/graphql'

const graphQLClient = new GraphQLClient(path, {
  headers: {
    authorization: `Bearer ${localStorage.getItem('auth')}`
  }
})

export default class Query extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    variables: PropTypes.object,
    children: PropTypes.func.isRequired
  }

  static defaultProps = {
    variables: {}
  }

  state = {
    isLoading: true,
    error: null,
    data: null
  }

  async componentDidMount() {
    let state = {}

    const {query, variables} = this.props

    try {
      const data = await graphQLClient.request(query, variables)
      state = {
        isLoading: false,
        data,
        error: null
      }
    } catch (error) {
      state = {
        isLoading: false,
        error,
        data: null
      }
    }

    this.setState(state)
  }

  render() {
    const {isLoading, error, data} = this.state

    return (
      <React.Fragment>
        {this.props.children({isLoading, error, data})}
      </React.Fragment>
    )
  }
}
