import React from 'react';
import './App.css';
import SearchBar from '../Searchbar/SearchBar';
import SearchResult from '../SearchResult/SearchResults';
import Playlists from '../PlayLists/Playlists';

const tracks = [{ name: "aye", artist: 'davido', album: 'the better time', id: 27 },
{ name: "gbona", artist: 'burna-boy', album: 'twice as tall', id: 18 },
{ name: "true love", artist: 'wizkid', album: 'made in lagos', id: 231 }];

const Ptracks = [{ name: "SomeBody Baby", artist: 'davido', album: 'The better time', id: 22 },
{ name: "Gbona", artist: 'Burna-boy', album: 'twice as tall', id: 12 },
{ name: "Badman", artist: 'Wizkid', album: 'Made in lagos', id: 25 }];


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: tracks,
            playlistName: "Vado",
            playlistTracks: Ptracks
        }

    }
    search=(searchValue)=> {
        const actual =searchValue.tracks.items.map(
            (e)=>{
             
                let obj ={ name: e.album.name, artist: e.album.artists[0].name, album: e.album.type, id: e.album.id }
               
            return obj;
            }
        );
        this.setState({searchResults:actual});
    }
    savePlaylist() {


    }
    updatePlaylistName = (name) => {
        this.setState({ playlistName: name });
    }
    removeTrack = (e) => {

        let newP =
            Ptracks.filter((Itrack, i) => {
                if (Itrack.id === e.target.id) {
                    return i;

                }
            });
        let [Nptracks] = newP;
        let c = Ptracks.indexOf(Nptracks);
        if (c < 0) {
            c += 1;
            Ptracks.splice(c, 1);
            this.setState({ playlistTracks: Ptracks });
        } else {
            Ptracks.splice(c, 1);
            this.setState({ playlistTracks: Ptracks });
        }

    }
    addTrack = (e) => {

        console.log(e.target.id);
        let newP =
            this.state.searchResults.filter((Itrack) => {
                if (Itrack.id === e.target.id) {
                    return Itrack;
                }

            });

        let [Nptracks] = newP;
        Ptracks.push(Nptracks);
        this.setState({ playlistTracks: Ptracks });


    }
    render() {

        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResult lists={this.state.searchResults} onClick={this.addTrack}   />
                        <Playlists onClick={this.removeTrack} Pname={this.state.playlistName}
                            lists={this.state.playlistTracks} onNameChange={this.updatePlaylistName}
                           onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }

}