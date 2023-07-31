import React, { useEffect, useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import { getRole } from '../../../../_component/other/utils';
interface MenuProps {
    pathName: string;
    label: string;  
    icon: JSX.Element;
}



const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    function _Link(linkProps, ref) {
        return <Link ref={ref} {...linkProps} />;
    }
);


const MenuList = () => {
    const [role , setRole] = useState<string>()

    useEffect(() => {
        const userRole = getRole();
        setRole(userRole)
    }, [])

    const menuConfig: MenuProps[] = [
        { pathName: '/dashboard', label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: '2rem',color: "blue", backgroundColor: '#F5FFFA' }} /> },
        ...(role === "USER"
      ? [
        { pathName: '/wallet', label: 'Wallet', icon: <WalletIcon sx={{ fontSize: '2rem',color: "green", backgroundColor: '#F5FFFA' }} /> },
        { pathName: '/account', label: 'Bank Account', icon: <ContactMailOutlinedIcon sx={{ fontSize: '2rem',color: "gold", backgroundColor: '#F5FFFA' }} /> },
        { pathName: '/referralusers', label: 'My Team', icon: <GroupsOutlinedIcon sx={{ fontSize: '2.0rem',color: "skyblue", backgroundColor: '#F5FFFA' }} /> },
        { pathName: '/transactions', label: 'Transactions', icon: <ArticleOutlinedIcon sx={{ fontSize: '2.0rem',color: "green", backgroundColor: '#F5FFFA' }} /> },
        { pathName: '/invitation', label: 'Invitation', icon: <AddLinkIcon sx={{ fontSize: '2.2rem',color: "purple", backgroundColor: '#F5FFFA' }} /> },
        { pathName: '/setting', label: 'Setting', icon: <SettingsIcon sx={{ fontSize: '2.2rem',color: "orange", backgroundColor: '#F5FFFA' }} /> },
    ]
    : []),
    ...(role === 'ADMIN' ? [
        { pathName: '/userlist', label: 'User List', icon: <ListIcon sx={{ fontSize: '2rem',color: "purple", backgroundColor: '#F5FFFA' }} /> },
    ]
     : [])
    ];
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
