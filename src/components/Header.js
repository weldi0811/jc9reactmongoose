import React from 'react'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogoutUser} from '../actions/index'

class Header extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


    
    render (){
      if(this.props.user.id){
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Ithink</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Link to = '/'>
                <Button color ='primary' className='mx-3'>Task</Button> 
                </Link>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    hello, {this.props.user.name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className='dropdown-item'>
                    
                    <Button href='/profile' color ='primary' className='mx-1 dropdown-item'>Profile</Button>
                    
                    </DropdownItem>
                    <DropdownItem>
                    <Link to = '/editprofile'>
                    <Button color ='primary' className='mx-1 dropdown-item'>edit profile</Button>
                    </Link>
                    </DropdownItem>
                    <DropdownItem className='dropdown-item'>
                    </DropdownItem>
                    
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to='/login'>
                      <button className= 'dropdown-item' onClick ={this.props.onLogoutUser}>Log Out</button>
                      </Link>
                      
                       
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )}
      else {
        return (
          <Navbar color="light" light expand="md">
              <div className="container">
                  <Link className="navbar-brand" to="/">ReactMongoose</Link>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                              <Link className="nav-link" to="/">Tasks</Link>
                          </NavItem>
                          <NavItem>
                              <Link to="/register"><Button className="mx-3" color="primary">Register</Button></Link>
                          </NavItem>
                          <NavItem>
                              <Link to="/login"><Button color="success">Login</Button></Link>
                          </NavItem>
                      </Nav>
                  </Collapse>
              </div>
          </Navbar>
      )
      };
    }
  }


const mapStateToProps = state => {
  return{
    user: state.auth //berisi id dan username
  }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)