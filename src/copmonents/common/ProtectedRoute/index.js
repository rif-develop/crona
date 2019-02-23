import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import UnAuthorized from '../UnAuthorized'


export class ProtectedRoute extends Component {

    render() {
        const {component, ...rest} = this.props
        return (
            <Route {...rest} render={this.renderProtected}/>
        )
    }

    renderProtected = (routeProps)=>{
        const {component:ProtectedComponent, authorized} = this.props
        return authorized ? <ProtectedComponent {...routeProps}/> :<UnAuthorized />
    }
}


export default connect(state=>({
    authorized: !!state.auth.user
}),null,null,{pure:false})(ProtectedRoute)