import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { useTranslation } from 'react-i18next';
import { useGlobal } from '../../context';
import { t } from 'i18next';
import { formatDateTime } from '../../utils/format';

const buildMessageUrl = (item) => {
  switch (item.type) {
    case 'chat':
      return {
        message: t('notif.receive.comment', { name: item.request.class.name }),
        createdAt: formatDateTime(item.comment.createdAt),
        url: `/class/${item.request.class._id}/grade/review/${item.request._id}`,
      };
    case 'create':
      return {
        message: t('notif.receive.request', { name: item.request.class.name }),
        createdAt: formatDateTime(item.request.createdAt),
        url: `/class/${item.request.class._id}/grade/review/${item.request._id}`,
      };
    case 'reject':
      return {
        message: t('notif.receive.reject', { name: item.request.teacher.name }),
        createdAt: formatDateTime(item.request.updatedAt),
        url: `/class/${item.request.class._id}/grade/review/${item.request._id}`,
      };
    case 'approve':
      return {
        message: t('notif.receive.approve', {
          name: item.request.teacher.name,
        }),
        createdAt: formatDateTime(item.request.updatedAt),
        url: `/class/${item.request.class._id}/grade/review/${item.request._id}`,
      };
    case 'publish':
      return {
        message: t('label.publish.scoretype', {
          type: item.scoreType.name,
          class: item.scoreType.class.name,
        }),
        createdAt: formatDateTime(item.scoreType.updatedAt),
        url: `/class/${item.scoreType.class._id}/grade`,
      };
    default:
      break;
  }
};

export default function PrimarySearchAppBar() {
  const { t } = useTranslation();
  const { changeLanguage, notification } = useGlobal();
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleHomeIconClick = () => {
    menuContext.handleTabChanges('home');
    navigate('/classes');
  };

  const menuId = 'primary-search-account-menu';
  const languageId = 'primary-languages-menu';
  const notifId = 'primary-notifs-menu';
  const renderLanguagesMenu = anchorEl && anchorEl.id === languageId && (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={languageId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={(e) => {
          handleMenuClose();
          changeLanguage('vi');
        }}
      >
        {t('label.vietnamese')}
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          handleMenuClose();
          changeLanguage('en');
        }}
      >
        {t('label.english')}
      </MenuItem>
    </Menu>
  );
  const renderMenu = anchorEl && anchorEl.id === menuId && (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={(e) => {
          handleMenuClose();
          navigate('/profile');
        }}
      >
        {t('label.profile')}
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );
  const renderNotifMenu = anchorEl && anchorEl.id === notifId && (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {notification &&
        notification.map((item) => {
          const { message, url, createdAt } = buildMessageUrl(item);
          return (
            <MenuItem
              className='border rounded mb-2 ms-2 me-2'
              key={item._id}
              onClick={(e) => {
                handleMenuClose();
                navigate(url, { replace: true });
              }}
            >
              <div className='d-flex flex-column'>
                <div>{createdAt}</div>
                <div>{message}</div>
              </div>
            </MenuItem>
          );
        })}
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{t('label.notification')}</p>
      </MenuItem> */}

      {/* <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            id={languageId}
            size='large'
            edge='end'
            aria-controls={languageId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <LanguageIcon />
          </IconButton>
          <p>Choose language</p>
        </MenuItem> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          id={menuId}
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>{t('label.profile')}</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Box sx={{ cursor: 'pointer' }} onClick={handleHomeIconClick}>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ width: { xs: '100px', md: '100px' } }}
              >
                {t('group.name')}
              </Typography>
            </Box>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                id={notifId}
                size='large'
                edge='end'
                aria-controls={notifId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <Badge
                  badgeContent={notification ? notification.length : 0}
                  color='error'
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                id={languageId}
                size='large'
                edge='end'
                aria-controls={languageId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <LanguageIcon />
              </IconButton>
              <IconButton
                id={menuId}
                size='large'
                edge='end'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderLanguagesMenu}
        {renderNotifMenu}
      </Box>
    </div>
  );
}
