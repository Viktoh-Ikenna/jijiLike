import React from 'react';
import './Searchbar.css';


class SearchBar extends React.Component {

    state={
        Token:'',
        expire:'',
        searchTerm:'hi'
    }
  

    search =() => {
        const sss=document.querySelector('#input').value;
        this.setState({searchTerm:sss});
        console.log(this.state.searchTerm);
        const fetchy = `https://accounts.spotify.com/authorize?client_id=f135b6a57d924897ab37f112733f5869&response_type=token&redirect_uri=http://localhost:3000/callback`;
        window.location.href =fetchy;
  
    }
    
    render() {
        window.onload=()=>{
            if(window.location.href.charAt(5)!=='s'&&window.location.href.charAt(22)==='c'){
              const AccessToken=window.location.href.match(/access_token=([^&]*)/)[0];
              const expire= window.location.href.match(/expires_in=([^&]*)/)[0];
              
              this.setState({
                  Token:AccessToken,
                  expire:expire
              });
              if(this.state.Token!==''&&this.state.expire!==''){
                fetch(`https://api.spotify.com/v1/search?type=track&q=${this.state.searchTerm}`,{
                    headers: {Authorization: `Bearer ${AccessToken.substr(13)}`}
                  }).then((res)=>{
                    return  res.json()
                  }).then((e)=>{
                      this.props.onSearch(e);
                  })
              }

            }
        }
        return (

            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" id='input' />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>

        )
    }
}

export default SearchBar;