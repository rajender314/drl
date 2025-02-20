import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import {
    LogoutTitle,
    LogoutBody,
    LogoutFooter,
    ProfileAvatar
} from './LogoutDialog-components'

import { Button, Dialog } from '@app/components';
import { useLocation, getShortName } from '@app/utils';
import { clearSession } from '@app/@services/user/user';
type Props = {
    onClose?: any;
}
export default function LogoutDialog({ onClose }: Props) {
    const { navigate } = useLocation();
    let userString: any = sessionStorage.getItem('user');
    const user = JSON.parse(userString);

    const logout = () => {
        navigate('/logout') 
    }
    return (
        <Dialog title="Confirm Logout" classN="logout-dialog" fullScreen={false}>
            <LogoutTitle>Confirm Logout</LogoutTitle>
            <LogoutBody>
                Are you sure you want to logout?
            </LogoutBody>
            <LogoutFooter>
                <Button variant='secondary' onClick={onClose}>Cancel</Button>
                <Button variant='primary' onClick={() => { logout() }}>Logout</Button>
            </LogoutFooter>
        </Dialog>
    )
}