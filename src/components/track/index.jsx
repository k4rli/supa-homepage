import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { API_URL } from '../../auth/config';

import EmojiButton from '../emojibutton';
import Menu from '../fullpage/menu';
import codes from '../../data/tracking_codes';
import Loading from '../loadinganimation';
import NoResults from './noresults';

import {
    saveTrackingSearchResults, saveTrackingCodes, addNewTrackingCode, resetResults
} from '../../actions/UserActions';

import './style.css';

/*global window*/

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            packageName: '',
            code: '',
            selectedOption: '',
            lang: 'est',
            firstSearchDone: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseDownOnMenu = this.handleMouseDownOnMenu.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.mobileOrDesktopApi = this.mobileOrDesktopApi.bind(this);
        this.createTable = this.createTable.bind(this);
    }

    componentWillMount() {
        const {
            saveTrackingCodes: saveTrackingCodesAction,
            resetResults: resetResultsAction
        } = this.props;
        resetResultsAction();
        axios.get('https://supa.ee/json/tracking_codes.json')
            .then((res) => {
                saveTrackingCodesAction(res.data);
                console.log('Succesfully fetched codes.');
                console.log(res.data);
            }).catch((err) => {
                console.log(`Error: ${err}`);
                resetResultsAction(codes);
                console.log('Failed to fetch codes, fallback to local data.');
                console.log(codes);
            });
    }

    // Updates state on tracking number input changes.
    handleChange(e) {
        const newState = {};
        const { name, value } = e.target;
        newState[name] = value;
        this.setState(newState);
    }

    // Dropdown menu selection handling.
    handleSelectChange(selectedOption) {
        if (selectedOption !== null) {
            this.setState({
                selectedOption,
                loading: true
            });
            this.handleApiData(selectedOption.value, selectedOption.label);
        }
    }

    /* Checks if this tracking number has already been searched.
     * This is to avoid multiple entries of same number in previous searches dropdown menu.
     * @returns true if exists
    */
    checkIfAlreadyTrackingCodeInCodes(code) {
        const { trackingCodes } = this.props;
        return trackingCodes.find(existingCode => existingCode.value === code);
    }

    // Handles tracking number API request submission.
    handleSubmit(e) {
        e.preventDefault();
        const { code } = this.state;
        if (code.length < 5) {
            return;
        }

        this.addToCodes();
        this.handleApiData(code);
    }

    /**
     * Requests data from API and dispatches results.
     * @param {String} code - tracking code
     * @param {String} label - name for tracking code; @TODO make use of this
     */
    handleApiData(code, label) {
        const req = this.apiRequest(code);
        const {
            saveTrackingSearchResults: saveTrackingSearchResultsAction
        } = this.props;
        const failedRequest = '<div class="loading-wrapper"><p>Failed to get results.</p></div>';
        req.then((res) => {
            if (res.status !== undefined) {
                if (res.status === 200) {
                    this.setState({
                        loading: false,
                        firstSearchDone: true
                    });

                    const result = res.data;
                    const apiResultType = this.mobileOrDesktopApi(result);

                    if (apiResultType !== 'invalid') {
                        saveTrackingSearchResultsAction(result);
                    } else {
                        saveTrackingSearchResultsAction(failedRequest);
                    }
                    return true;
                }
                saveTrackingSearchResultsAction(failedRequest);
                return false;
            }
            return false;
        }).catch((err) => {
            saveTrackingSearchResultsAction(failedRequest);
            console.log(`Error occurred: ${err}`);
            return false;
        });

        // reset state
        this.setState({
            code: '',
            packageName: ''
        });
    }

    // Requests tracking information from Omniva API.
    // @param code - tracking number
    async apiRequest(code) {
        const { lang } = this.state;
        return axios.get(`${API_URL}/track/${code}/${lang}`);
    }

    // Adds new tracking number to previous searches if it isn't already there.
    addToCodes() {
        const { code, packageName } = this.state;
        if (!this.checkIfAlreadyTrackingCodeInCodes(code)) {
            addNewTrackingCode({
                label: packageName,
                value: code
            });
        }
    }

    // Checks which type of data is returned by API.
    // For some reason, they give different data based on display resolution.
    // On large displays, they give a table with results,
    // but on small screens, a description list is given.
    //
    /* eslint-disable class-methods-use-this */
    mobileOrDesktopApi(result) {
        let resultType = 'invalid';
        if (result.indexOf('dt') !== -1) {
            resultType = 'mobile';
        }
        if (result.indexOf('th') !== -1) {
            resultType = 'desktop';
        }
        return resultType;
    }
    /* eslint-enable class-methods-use-this */

    // Opens menu on event
    handleMouseDown(e) {
        this.toggleMenu();
        e.stopPropagation();
    }

    // On small screens, clicking on menu will close it.
    handleMouseDownOnMenu(e) {
        if (window.innerWidth <= 768) {
            this.toggleMenu();
        }
        e.stopPropagation();
    }

    // Changes menu state.
    toggleMenu() {
        this.setState(prevState => ({ visible: !prevState.visible }));
    }

    // Hides menu.
    hideMenu() {
        this.setState({ visible: false });
    }

    /* eslint-disable class-methods-use-this */
    createTable(results) {
        if (results === undefined || results.rows === undefined) {
            return <NoResults />;
        }
        return (
            <Table className="table-wrapper">
                <TableHead>
                    <TableRow>
                        {results.headers.map((n, idx) => (<TableCell key={idx}>{n}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.rows.map((n, idx) => (
                        <TableRow key={idx}>
                            {/* not very good keys */}
                            <TableCell
                                key={Math.floor(Math.random() * 1000)}
                                component="td"
                            >
                                {n.event}
                            </TableCell>
                            <TableCell key={Math.floor(Math.random() * 1000)}>
                                {n.date}
                            </TableCell>
                            <TableCell key={Math.floor(Math.random() * 1000)}>
                                {n.location}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
    /* eslint-enable class-methods-use-this */

    render() {
        const {
            selectedOption, code, packageName, visible, firstSearchDone, loading
        } = this.state;
        const { requestResults, trackingCodes } = this.props;
        const value = selectedOption && selectedOption.value;
        return (
            <div className="tracking-wrapper">
                <div className="floatingMenuButton" onMouseDown={this.toggleMenu}>
                    <EmojiButton text="😂" className="top-left" />
                </div>
                <Menu
                    handleMouseDown={this.handleMouseDownOnMenu}
                    menuVisibility={visible}
                    hideMenu={this.hideMenu}
                />
                <div className="tracking-form" onMouseDown={this.hideMenu}>
                    <form className="react-form" onSubmit={this.handleSubmit}>
                        <h1>track</h1>
                        <input
                            id="formName"
                            className="form-input"
                            name="packageName"
                            type="text"
                            onChange={this.handleChange}
                            placeholder="name for your package"
                            value={packageName}
                        />
                        <input
                            id="formCode"
                            className="form-input"
                            name="code"
                            type="text"
                            required
                            onChange={this.handleChange}
                            placeholder="tracking number"
                            value={code}
                        />
                        <input id="formButton" className="btn" type="submit" value="track" />
                        <Select
                            className="prev-select"
                            placeholder="previous searches"
                            noResultsText="no previous searches found 😡"
                            name="form-field-name"
                            value={value}
                            onChange={this.handleSelectChange}
                            options={trackingCodes}
                            isSearchable={false}
                        />
                    </form>
                    {firstSearchDone ? (
                        loading
                            ? <Loading />
                            : <div className="result">{this.createTable(requestResults)}</div>
                    ) : ''}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        trackingCodes: state.trackingCodes,
        requestResults: state.requestResults
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addNewTrackingCode: code => dispatch(addNewTrackingCode(code)),
        saveTrackingCodes: trackingCodes => dispatch(saveTrackingCodes(trackingCodes)),
        saveTrackingSearchResults: data => dispatch(saveTrackingSearchResults(data)),
        resetResults: () => dispatch(resetResults())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
