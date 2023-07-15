import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';

interface MenuProps {
    pathName: string;
    label: string;  
    icon: JSX.Element;
}

const menuConfig: MenuProps[] = [
    { pathName: '/dashboard', label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: '1.8rem' }} /> },
    { pathName: '/wallet', label: 'Wallet', icon: <WalletIcon sx={{ fontSize: '1.8rem' }} /> },
    { pathName: '/account', label: 'Account Info', icon: <AccountBoxIcon sx={{ fontSize: '1.8rem' }} /> },
    { pathName: '/referralusers', label: 'Refrral Users', icon: <PeopleAltIcon sx={{ fontSize: '1.8rem' }} /> },
    { pathName: '/transactions', label: 'Transactions', icon: <PaymentsIcon sx={{ fontSize: '1.8rem' }} /> },
    { pathName: '/setting', label: 'Setting', icon: <SettingsIcon sx={{ fontSize: '1.8rem' }} /> },
];

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    function _Link(linkProps, ref) {
        return <Link ref={ref} {...linkProps} />;
    }
);

const MenuList = () => {
    return (
        <List color='inherit'>
            {menuConfig.map(({ label, pathName, icon }: MenuProps) => {
                return (
                    <ListItem key={label} disablePadding>
                        <ListItemButton component={CustomLink} to={pathName}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default MenuList;
