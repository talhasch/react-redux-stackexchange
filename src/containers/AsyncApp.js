import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    selectSite,
    fetchQuestionsIfNeeded,
    invalidateSite
} from '../actions'
import Picker from '../components/Picker'
import Questions from '../components/Questions'
import sites from '../sites'

import '../styles/app.css';

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const {dispatch, selectedSite} = this.props;
        dispatch(fetchQuestionsIfNeeded(selectedSite));
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedSite !== prevProps.selectedSite) {
            const {dispatch, selectedSite} = this.props;
            dispatch(fetchQuestionsIfNeeded(selectedSite));
        }
    }

    handleChange(nextSite) {
        this.props.dispatch(selectSite(nextSite));
        this.props.dispatch(fetchQuestionsIfNeeded(nextSite));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {dispatch, selectedSite} = this.props;
        dispatch(invalidateSite(selectedSite));
        dispatch(fetchQuestionsIfNeeded(selectedSite));
    }

    render() {
        const {selectedSite, questions, isFetching, lastUpdated} = this.props;

        return (
            <div className="wrapper">
                <Picker
                    value={selectedSite}
                    onChange={this.handleChange}
                    options={sites}
                    selected={selectedSite}
                />
                <p>
                    {lastUpdated &&
                    <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
            </span>}
                    {!isFetching &&
                    <button onClick={this.handleRefreshClick}>
                        Refresh
                    </button>}
                </p>
                {isFetching && questions.length === 0 && <h2>Loading...</h2>}
                {!isFetching && questions.length === 0 && <h2>Empty.</h2>}
                {questions.length > 0 &&
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <Questions questions={questions}/>
                </div>}
            </div>
        )
    }
}

AsyncApp.propTypes = {
    selectedSite: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {selectedSite, questionsBySite} = state;
    const {
        isFetching,
        lastUpdated,
        items: questions
    } = questionsBySite[selectedSite] || {
        isFetching: true,
        items: []
    };

    return {
        selectedSite,
        questions,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)