import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

interface MenuProps {
    pathName: string;
    label: string;
    icon: JSX.Element;
}

const menuConfig: MenuProps[] = [
    { pathName: '/dashboard', label: 'Dashboard', icon: <ListAltOutlinedIcon /> },
    { pathName: '/myearning', label: 'My Earning', icon: <ListAltOutlinedIcon /> },
    { pathName: '/wallet', label: 'Wallet', icon: <ListAltOutlinedIcon /> },
    { pathName: '/account', label: 'Account Info', icon: <ListAltOutlinedIcon /> },
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
