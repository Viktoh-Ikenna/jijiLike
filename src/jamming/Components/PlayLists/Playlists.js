import React from 'react';
import './playLists.css';
import {TrackList} from '../TrackList/TrackList';

class Playlists extends React.Component {
    updatePlaylistName=(e)=>{
        this.onNameChange(e.target);
    }
    render() {
        return (

            <div className="Playlist">
            <input value={this.props.Pname} onChange={this.updatePlaylistName} />
            <TrackList tracks={this.props.lists} onClick={this.props.onClick} state={true} />
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>


        );
    }
}

export default Playlists;