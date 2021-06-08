import React from 'react'
import {
  HashRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { WhiteCanvas } from './WhiteCanvas'
import BlueCanvas from './BlueCanvas'

function Selector() {
  return (
    <div>
      <Router>
        <div>
          <div style={{ height: 140 }}>
            <div className="col-5 " />
            <div className="header" style={{ padding: 20 }}>
              <NavLink className="text text-white" to="/white">
                White
              </NavLink>
              <NavLink className="m-4 text text-blue" to="/blue">
                Blue
              </NavLink>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Switch>
                <Route path="/white" component={WhiteCanvas} />
                <Route path="/blue" component={BlueCanvas} />
                <Redirect to="/white" />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default Selector
