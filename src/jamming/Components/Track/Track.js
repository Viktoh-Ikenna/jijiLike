import React from 'react';
import './Track.css';


class Track extends React.Component {
     renderAction() {
        let isRemoval = this.props.state;
        if (isRemoval) {
            return <button className="Track-action" id={this.props.id} onClick={this.props.onClick} > - </button>;
        } else {
            return <button className="Track-action" id={this.props.id} onClick={this.props.onClick} > +  </button>;
        }
    }
  
    render() {
        return (

               <div className="Track">
                 <div className="Track-information">
                    <h3> {this.props.name} </h3>
                    <p>{this.props.artist} |  {this.props.album} </p>
                 </div>
                 {this.renderAction()}
                </div>
        );
    }
}

export default Track;