import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';

// Components
import { GetListMenu } from '../models/Functions';
import { useCallback } from 'react';

interface Props {
  changePageTitle: (title: string) => void;
}

export default function ListMenu(props: Props) {

  const navigate = useNavigate();

  const handleChangePageTitle = useCallback((title: string, path: string) => {
    navigate(path)
    props.changePageTitle(title)
  },[props, navigate])

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {GetListMenu().map((menu, i) => (
          menu.Title == 'divider' 
          ?
          <Divider />
          :
          <ListItem key={i} disablePadding>
            <ListItemButton onClick={() => handleChangePageTitle(menu.Title, menu.Path)}>
                <Icon icon={menu.Icon} fontSize='26px' />
                <Typography sx={{ color: 'rgba(0,0,0,0.8)', fontSize: '20px', textTransform: 'capitalize', marginLeft: '16px' }} >
                    {menu.Title}
                </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}