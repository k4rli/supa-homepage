import React, {Component} from 'react';
import EmojiButton from "./EmojiButton";
import Menu from "./Menu";
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './css/track.css';
import trackingCodes from './data/tracking_codes.json';

export default class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            codes: trackingCodes,
            packageName: '',
            result: '',
            code: '',
            apiResultType: '',
            selectedOption: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseDownOnMenu = this.handleMouseDownOnMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.mobileOrDesktopApi = this.mobileOrDesktopApi.bind(this);
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
            this.setState({selectedOption});
            this.apiRequest(selectedOption.value, selectedOption.label);
        }
    };

    // Checks if this tracking number has already been searched.
    // This is to avoid multiple entries of same number in previous searches dropdown menu.
    checkIfAlreadyTrackingCodeInCodes(code) {
        for (let i = 0; i < this.state.codes.length; i++) {
            if (this.state.codes[i].value === code) return true;
        }
        return false;
    };

    // Handles tracking number API request submission.
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.code.length < 5) return true;
        this.apiRequest(this.state.code, this.state.packageName);
        this.setState({code:'', packageName:''})
    };

    // Requests tracking information from Omniva API.
    // @param code - tracking number
    apiRequest(code, name) {
        axios.get('https://cors.io/?https://www.omniva.ee/api/search.php?search_barcode='
            + code + '&lang=est'
        ).then((response) => {
            this.mobileOrDesktopApi(response.data);
            if (this.state.apiResultType != 'invalid') {
                this.addToCodes(name, code);
                this.setState({result: response.data});
                console.log({type: "TRACKING_SUCCESS", code: code, name: name});
            } else {
                console.log({type: "INVALID_TRACKING_CODE", code: code, name: name});
            }
        }).catch(() => {
            console.log({type: "TRACKING_FAILURE"});
        });

        this.setState({
            code:'',
            packageName:''
        });
    }

    // Adds new tracking number to previous searches if it isn't already there.
    addToCodes(name, code) {
        if (!this.checkIfAlreadyTrackingCodeInCodes(code)) {
            let temp = this.state.codes.slice();
            temp.push({label: name, value: code});
            this.setState({codes: temp});
        }
    }

    // Checks which type of data is returned by API.
    // For some reason, they give different data based on display resolution.
    // On large displays, they give a table with results, but on small screens, a description list is given.
    mobileOrDesktopApi(result) {
        if (result.indexOf('dt') != -1) {
            this.setState({
                apiResultType:'mobile'
            });
        } else if (result.indexOf('th') != -1) {
            this.setState({
                apiResultType:'desktop'
            });
        } else if (result.indexOf('ebakorrektselt') != -1) {
            this.setState({
                apiResultType:'invalid'
            });
        }
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
        this.setState({
            visible: !this.state.visible
        });
    }

    // Hides menu.
    hideMenu() {
        this.setState({
            visible: false
        });
    };

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        return (
            <div className="tracking-wrapper">
                <div className="floatingMenuButton" onMouseDown={this.toggleMenu}>
                    <EmojiButton text="😂"/>
                </div>
                <Menu handleMouseDown={this.handleMouseDownOnMenu}
                      menuVisibility={this.state.visible}
                      hideMenu={this.hideMenu}
                />
                <div className="tracking-form" onMouseDown={this.hideMenu}>
                    <form className='react-form' onSubmit={this.handleSubmit}>
                        <h1>track</h1>
                        <input id='formName' className='form-input' name='packageName' type='text'
                               required onChange={this.handleChange} placeholder='name for your package' value={this.state.packageName} />
                        <input id='formCode' className='form-input' name='code' type='text'
                               required onChange={this.handleChange} placeholder='tracking number' value={this.state.code} />
                        <input id='formButton' className='btn' type='submit' value='track' />
                        <Select
                            className="prev-select"
                            placeholder="previous searches"
                            noResultsText="no previous searches found 😡"
                            name="form-field-name"
                            value={value}
                            onChange={this.handleSelectChange}
                            options={this.state.codes}
                        />
                    </form>
                    <div className="result" dangerouslySetInnerHTML={{__html: this.state.result}} />
                </div>
            </div>
        );
    };
};
