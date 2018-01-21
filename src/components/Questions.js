import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Questions extends Component {
    render() {
        return (
            <ul>
                {this.props.questions.map((post, i) => <li key={i}>{post.title}</li>)}
            </ul>
        )
    }
}

Questions.propTypes = {
    questions: PropTypes.array.isRequired
};