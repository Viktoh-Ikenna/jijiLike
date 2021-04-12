import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'


export class TrackList extends React.Component {


    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((e) => {
                    const tracks = <Track name={e.name} artist={e.artist} album={e.album} id={e.id} onClick={this.props.onClick} state={this.props.state} />
                    return tracks;
                })}
            </div>

        )
    }
}
