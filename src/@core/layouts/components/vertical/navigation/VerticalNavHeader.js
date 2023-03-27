// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  marginTop: theme.spacing(3),
  paddingRight: theme.spacing(5),
  justifyContent: 'space-between',
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const { mode, skin, direction, navCollapsed } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const handleButtonClick = () => {
    if (hidden) {
      toggleNavVisibility()
    } else {
      saveSettings({ ...settings, navCollapsed: !navCollapsed })
    }
  }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 22) / 8
      }
    } else {
      return 8
    }
  }

  const svgRotationDeg = () => {
    if (navCollapsed) {
      if (direction === 'rtl') {
        if (navHover) {
          return 0
        } else {
          return 180
        }
      } else {
        if (navHover) {
          return 180
        } else {
          return 0
        }
      }
    } else {
      if (direction === 'rtl') {
        return 180
      } else {
        return 0
      }
    }
  }

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <div>
          <img src='https://osa.harissint.com/images/img.jpg' width='100px' height='100px' />
        </div>
      )}

      {userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={handleButtonClick}
          sx={{
            p: 1.75,
            right: -19,
            position: 'absolute',
            color: 'text.primary',
            '& svg': { color: 'common.white' },
            transition: 'right .25s ease-in-out',
            backgroundColor: hidden
              ? mode === 'semi-dark'
                ? theme.palette.customColors.darkPaperBg
                : 'background.paper'
              : 'background.default',
            ...(navCollapsed && !navHover && { display: 'none' }),
            ...(!hidden &&
              skin === 'bordered' && {
                '&:before': {
                  zIndex: -1,
                  content: '""',
                  width: '105%',
                  height: '105%',
                  borderRadius: '50%',
                  position: 'absolute',
                  border: `1px solid ${theme.palette.divider}`,
                  clipPath: direction === 'rtl' ? 'circle(71% at 100% 50%)' : 'circle(71% at 0% 50%)'
                }
              })
          }}
        >
          <Box sx={{ display: 'flex', borderRadius: 5, backgroundColor: 'primary.main' }}>
            {userMenuLockedIcon && userMenuUnlockedIcon ? (
              navCollapsed ? (
                userMenuUnlockedIcon
              ) : (
                userMenuLockedIcon
              )
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  '& svg': {
                    transform: `rotate(${svgRotationDeg()}deg)`,
                    transition: 'transform .25s ease-in-out .35s'
                  }
                }}
              >
                <Icon icon='bx:chevron-left' />
              </Box>
            )}
          </Box>
        </IconButton>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
