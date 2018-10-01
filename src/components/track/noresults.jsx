import React, { Component } from 'react';
import ThinkingEmoji from '../emojibutton/images/thinking_emoji.svg';

class NoResults extends Component {
    render() {
        return (
           <div className="noResultsContainer">
               <img
                    id="noResultsImg"
                    src={ThinkingEmoji}
                    alt="No results found"
               />
           </div>
        );
    }
}

export default NoResults;
