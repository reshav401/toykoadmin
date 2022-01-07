import {
    Box,
    Card,
    Tooltip,
    Typography,
    styled
} from '@mui/material' ;

import Logo from 'src/components/Logo';

import Link from 'src/components/Link';

const icons = {
    Auth0: '/static/images/logo/auth0.svg',
    FirebaseAuth: '/static/images/logo/firebase.svg',
    JWT: '/static/images/logo/jwt.svg',
    Amplify: '/static/images/logo/amplify.svg'
};
  

const Content = styled(Box) (
    () => `
        display : flex;
        flex : 1;
        width : 100%;
    `
)

const CardImg = styled(Card)(
    ({ theme }) => `
        border-radius: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 1px solid ${theme.colors.alpha.black[10]};
        transition: ${theme.transitions.create(['border'])};
        position: absolute;

        &:hover {
        border-color: ${theme.colors.primary.main};
        }
    `
);

const SidebarContent = styled(Box)(
    ({ theme }) => `
        display: flex;
        flex-direction: column;
        padding: ${theme.spacing(6)};
    `
);

import { useTranslation } from 'react-i18next';

const TypographyH1 = styled(Typography)(
    ({ theme }) => `
      font-size: ${theme.typography.pxToRem(33)};
  `
  );

export default function LoginSideBar() {

    const { t } = useTranslation();

    return (
        <SidebarContent>
        
            <Logo />
            <Box mt={6}>
                <TypographyH1
                variant="h1"
                sx={{
                    mb: 7
                }}
                >
                {t('Multiple auth methods included')}
                </TypographyH1>
                <Box
                sx={{
                    position: 'relative',
                    width: 300,
                    height: 120
                }}
                >
                <Tooltip arrow placement="top" title="Auth0">
                    <CardImg
                    sx={{
                        width: 80,
                        height: 80,
                        left: -20,
                        top: -40
                    }}
                    >
                    <img width={40} alt="Auth0" src={icons['Auth0']} />
                    </CardImg>
                </Tooltip>
                <Tooltip arrow placement="top" title="Firebase">
                    <CardImg
                    sx={{
                        width: 90,
                        height: 90,
                        left: 70
                    }}
                    >
                    <img
                        width={50}
                        alt="Firebase"
                        src={icons['FirebaseAuth']}
                    />
                    </CardImg>
                </Tooltip>
                <Tooltip arrow placement="top" title="JSON Web Token">
                    <CardImg
                    sx={{
                        width: 110,
                        height: 110,
                        top: -30,
                        left: 170
                    }}
                    >
                    <img width={80} alt="JSON Web Token" src={icons['JWT']} />
                    </CardImg>
                </Tooltip>
                <Tooltip arrow placement="top" title="AWS Amplify">
                    <CardImg
                    sx={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        right: -55
                    }}
                    >
                    <img width={50} alt="Amplify" src={icons['Amplify']} />
                    </CardImg>
                </Tooltip>
                </Box>
                <Typography
                variant="subtitle1"
                sx={{
                    my: 3
                }}
                >
                {t(
                    'Choose between JSON Web Token, Firebase, AWS Amplify or Auth0. Regular login/register functionality is also available.'
                )}
                </Typography>
                <Typography
                variant="subtitle1"
                color="text.primary"
                fontWeight="bold"
                >
                {t('Want to switch auth methods?')}
                </Typography>
                <Typography variant="subtitle1">
                {t(
                    'It only takes seconds. There is a documentation section showing how to do exactly that'
                )}
                . <Link href="/docs">Read docs</Link>
                </Typography>
            </Box>
        </SidebarContent>
        
    )
} 


