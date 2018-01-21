import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Picker extends Component {
    render() {
        const {value, onChange, options} = this.props;

        return (
            <div className="picker">
                <h1>{value}</h1>
                {options.map(option => (
                    <a className={"picker-button " + (value === option ? 'selected' : '')} href="javascript:void(0)"
                       key={option} onClick={e => onChange(option)}>{option}</a>
                ))}
            </div>
        )
    }
}

Picker.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired
};