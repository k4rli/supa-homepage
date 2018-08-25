import React, { Component } from 'react';
import ThinkingEmoji from './thinking_emoji.png';

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
