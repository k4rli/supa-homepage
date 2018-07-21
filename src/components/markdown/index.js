import React, {Component} from 'react';
import showdown from 'showdown';
import EmojiButton from "../emojibutton";
import history from '../../helpers/history';
import "./style.css";

export default class Markdown extends Component {
    constructor() {
        super();
        this.state = {
            converter: new showdown.Converter(),
            value: `Hello, World!\n===\n---\n# This is an h1\n## This is an h2\n### This is an h3\n#### This is an h4\n##### This is an h5\n###### This is an h6`,
        };
    }

    createMarkup() {
        return {__html: this.state.converter.makeHtml(this.state.value) };
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="markdown-wrapper">
                <div className="goBackButton" onMouseDown={history.goBack}>
                    <EmojiButton text="🔙" />
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <textarea
                            type='text'
                            defaultValue={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            id='markdown'
                            className='col-xs-10 col-xs-offset-1 full-height'>

                        </textarea>
                    </div>
                    <div className='col-sm-6'>
                        <div id='htmlArea'
                            className='col-xs-10 col-xs-offset-1 full-height'>
                            <div dangerouslySetInnerHTML={this.createMarkup()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
