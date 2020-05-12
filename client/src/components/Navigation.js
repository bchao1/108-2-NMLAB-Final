import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css"
class Navigation extends Component {
    constructor(props){
      super(props);
    }
  
    render() {
      return (
        <div class="Navigation">
          <div class="button"><NavLink>All Collections</NavLink></div>
          <div class="button"><NavLink>All Collections</NavLink></div>
          <div class="button"><NavLink>All Collections</NavLink></div>
          <div class="button"><NavLink>All Collections</NavLink></div>
        </div>
      );
    }
  }
  
  export default Navigation