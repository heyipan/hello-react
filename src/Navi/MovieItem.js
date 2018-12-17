import React, { Component } from 'react';

class MovieItem extends Component{
     constructor(props){
         super(props);
         this.state = {
             movie:this.props.movie
         }
     }

     render(){
        let lastdirector = this.state.movie.directors.length-1;
        let lastgenres = this.state.movie.genres.length-1;
        return (
            <div className="list-group">
                <div className="media list-group-item">
                    <span className="badge">{this.state.movie.rating.average}</span>
                    <div className="media-left">
                        <a href="#">
                            <img className="media-object" src={this.state.movie.images.medium}/>
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{this.state.movie.title}</h4>
                        <div>
                            <p>导演：
                                {
                                    this.state.movie.directors.map(function (director,index) {
                                        let html = index == lastdirector?(<span key={index}>{director.name}</span>):(<span key={index}>{director.name}、</span>);
                                        return html ;
                                    })}
                            </p>
                        </div>
                        <div>
                            <p>类型： {
                                this.state.movie.genres.map(function (genre,index) {
                                    let html = index == lastgenres?(<span key={index}>{genre}</span>):(<span key={index}>{genre}、</span>);
                                    return html ;
                                })}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  MovieItem;