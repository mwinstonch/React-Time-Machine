// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'Backbone'
import Jquery from 'jquery'

console.log(Backbone)

function app() {

    // start app
    // new Router()
    var AppView = React.createClass ({

        _increment: function(moving) {
            if (moving === "forwards") {
                this.setState({
                    year: this.state.year + 1
                })
            }

           if (moving === "backwards") {
                this.setState({
                    year: this.state.year -= 1
                })
            }
        },

        _fastForward: function() {
            this.setState({
                moving: "forwards",
            })

            var self = this
            this.state.go(self)
            
        },

        _reverse: function() {
            this.setState({
                moving: "backwards" 
            })

            var self = this
            this.state.go(self)
        },

        _stop: function() {
            this.setState({
                go: null
            })
        },

        getInitialState: function() {
            return {
                year: 2016,
                moving:"",
                go: function(self) {setInterval(function() { self._increment(self.state.moving)}, 600)}
            }
        },

    	render: function() {
    		return (
		    	<div>
			    	<div>
                    <h1 className="headline">React Time Machine</h1>
                    <TimeView year={this.state.year}/>
				    	 <button onClick={this._fastForward}className="go">Fast Forward!</button>
				    	 <button onClick={this._reverse}className="stop">Reverse!</button>
                         <button onClick={this._stop}className="stop">Stop!</button>
			    	</div>
		    	</div>
	    	)
    	}
    	
    })

    var TimeView = React.createClass ({
        render: function() {
            return (
                <div className="timeHolder">
                    <h1>Year:</h1>
                    <h1 className="time">{this.props.year}</h1>
                </div>
            )
        }
    })

    var MyRouter = Backbone.Router.extend({
        routes: {
            "*default": "home"
        },

        home: function() {
            DOM.render(<AppView/>, document.querySelector('.container'))

        },

        initialize: function() {
        //Starts BackBone
            Backbone.history.start()
        }

    })

    var nr = new MyRouter()
}

app()
