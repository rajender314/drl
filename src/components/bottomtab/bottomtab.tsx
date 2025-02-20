import React from 'react';
import { Container, Nav, NavLinkLi, Label } from './bottomtab-components'
import { Icon } from '@app/components';
import {
    useHistory,
    BrowserRouter,
    Route,
} from "react-router-dom";
import { getActiveRoute } from '@app/utils'
const NavBar = () => {
    const history = useHistory();
    const page = React.useState(1)
    const [path, setPath] = React.useState<any>(window.location.pathname)
    React.useEffect(() => {
        //console.log(history);
        return history.listen((location) => {
            setPath(window.location.pathname)
            //console.log(`You changed the page to: ${location.pathname}`)
        })
    }, [history, page])
    return (
        <Container>
            <Nav >
                
                <NavLinkLi to="/files" activeClassName={'active'} >
                    <Icon name="files" />
                    <Label >Files</Label>
                </NavLinkLi>
                <NavLinkLi to="/orders" activeClassName={'active'} >
                    <Icon name="orders" />
                    <Label >Orders</Label>
                </NavLinkLi>
                <NavLinkLi to="/coverage" activeClassName={'active'} >
                    <Icon name="coverage" />
                    <Label >Coverage</Label>
                </NavLinkLi>
            </Nav>
        </Container>
    );
};

export default NavBar;