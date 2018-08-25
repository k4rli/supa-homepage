import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EmojiButton from "../emojibutton";
import Menu from "../fullpage/menu";
import codes from '../../data/tracking_codes';
import Loading from '../loadinganimation';
import NoResults from './noresults';

import { saveTrackingSearchResults, saveTrackingCodes, addNewTrackingCode, resetResults } from '../../actions/UserActions';

import './style.css';

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
        this.toggleMenu = this.toggleMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.mobileOrDesktopApi = this.mobileOrDesktopApi.bind(this);
        this.createTable = this.createTable.bind(this);
    }

    componentWillMount() {
        this.props.resetResults();
        axios.get('https://www.supa.ee/json/tracking_codes.json')
            .then((res) => {
                this.props.saveTrackingCodes(JSON.parse(res.data));
            }).catch(() => {
                this.props.saveTrackingCodes(codes);
            });
    }

    // Updates state on tracking number input changes.
    handleChange = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState)
    };

    // Dropdown menu selection handling.
    handleSelectChange = (selectedOption) => {
        if (selectedOption !== null) {
            this.setState({
                selectedOption,
                loading: true
            });
            this.handleApiData(selectedOption.value, selectedOption.label);
        }
    };

    /* Checks if this tracking number has already been searched.
     * This is to avoid multiple entries of same number in previous searches dropdown menu.
     * @returns true if exists
    */
    checkIfAlreadyTrackingCodeInCodes(code) {
        return this.props.trackingCodes.find((existingCode) => {
            return existingCode.value === code;
        });
    };

    // Handles tracking number API request submission.
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.code.length < 5) {
            return true;
        }

        this.addToCodes();
        this.handleApiData(this.state.code);
    };

    /**
     * Requests data from API and dispatches results.
     * @param {String} code - tracking code
     * @param {String} label - name for tracking code; @TODO make use of this
     */
    handleApiData(code, label) {
        const req = this.apiRequest(code);
        const failedRequest = `<div class="loading-wrapper"><p>Failed to get results.</p></div>`
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
                        this.props.saveTrackingSearchResults(result);
                    } else {
                        this.props.saveTrackingSearchResults(failedRequest);
                    }
                } else {
                    this.props.saveTrackingSearchResults(failedRequest);
                    return false;
                }
            }
        }).catch((err) => {
            this.props.saveTrackingSearchResults(failedRequest);
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
        const res = await axios.get(`https://omniva-tracking-api-listener.herokuapp.com/track/${code}/${this.state.lang}`);
        return await res;
    }

    // Adds new tracking number to previous searches if it isn't already there.
    addToCodes() {
        const code = this.state.code;
        if (!this.checkIfAlreadyTrackingCodeInCodes(code)) {
            this.props.addNewTrackingCode({
                label: this.state.packageName,
                value: this.state.code
            });
        }
    }

    // Checks which type of data is returned by API.
    // For some reason, they give different data based on display resolution.
    // On large displays, they give a table with results, but on small screens, a description list is given.
    mobileOrDesktopApi(result) {
        let resultType = 'invalid';
        if (result.indexOf('dt') !== -1) resultType = 'mobile';
        if (result.indexOf('th') !== -1) resultType = 'desktop';
        return resultType;
    };

    // Opens menu on event
    handleMouseDown(e) {
        this.toggleMenu();
        e.stopPropagation();
    };

    // On small screens, clicking on menu will close it.
    handleMouseDownOnMenu(e) {
        if (window.innerWidth <= 768) {
            this.toggleMenu();
        }
        e.stopPropagation();
    };

    // Changes menu state.
    toggleMenu() {
        this.setState({ visible: !this.state.visible });
    }

    // Hides menu.
    hideMenu() {
        this.setState({ visible: false });
    };

    createTable(results) {
        if (results === undefined || results.rows === undefined) return <NoResults />;
        return (
            <Table className='table-wrapper'>
                <TableHead>
                    <TableRow>
                        {results.headers.map((n, idx) => { return (<TableCell key={idx}>{n}</TableCell>) })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.rows.map((n, idx) => {
                        return (
                            <TableRow key={idx}>
                                {/* not very good keys */}
                                <TableCell key={Math.floor(Math.random() * 1000)} component="td">{n.event}</TableCell>
                                <TableCell key={Math.floor(Math.random() * 1000)}>{n.date}</TableCell>
                                <TableCell key={Math.floor(Math.random() * 1000)}>{n.location}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        return (
            <div className="tracking-wrapper">
                <div className="floatingMenuButton" onMouseDown={this.toggleMenu}>
                    <EmojiButton text="😂" className='top-left' />
                </div>
                <Menu handleMouseDown={this.handleMouseDownOnMenu} menuVisibility={this.state.visible} hideMenu={this.hideMenu} />
                <div className="tracking-form" onMouseDown={this.hideMenu}>
                    <form className='react-form' onSubmit={this.handleSubmit}>
                        <h1>track</h1>
                        <input id='formName' className='form-input' name='packageName' type='text' onChange={this.handleChange} placeholder='name for your package' value={this.state.packageName} />
                        <input id='formCode' className='form-input' name='code' type='text' required onChange={this.handleChange} placeholder='tracking number' value={this.state.code} />
                        <input id='formButton' className='btn' type='submit' value='track' />
                        <Select
                            className="prev-select"
                            placeholder="previous searches"
                            noResultsText="no previous searches found 😡"
                            name="form-field-name"
                            value={value}
                            onChange={this.handleSelectChange}
                            options={this.props.trackingCodes}
                            searchable={false}
                        />
                    </form>
                    {this.state.firstSearchDone ? (
                        this.state.loading
                        ? <Loading />
                        : <div className="result">{this.createTable(this.props.requestResults)}</div>
                    ) : ''}
                </div>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return {
        trackingCodes: state.trackingCodes,
        requestResults: state.requestResults
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addNewTrackingCode: code => dispatch(addNewTrackingCode(code)),
        saveTrackingCodes: codes => dispatch(saveTrackingCodes(codes)),
        saveTrackingSearchResults: data => dispatch(saveTrackingSearchResults(data)),
        resetResults: () => dispatch(resetResults())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
