import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";

class Search extends Component {
  state = {
    trackTitle: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (dispatch, event) => {
    event.preventDefault();

    //track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        console.log(res);
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
        this.setState({ trackTitle: "" });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search for a song
              </h1>

              <p className="lead text-center">Get the lyrics for any song</p>
              {/* 
              
                https://reactjs.org/docs/handling-events.html 
                
              */}
              <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <button className="btn btn-primary btn-lg btn-block mb-5">
                  Search
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
