import { 
  Box,
  Card,
  Button,
  Grid, 
  styled, 
  Typography 
} from '@mui/material';

import Link from 'next/link';

const PageHeaderWrapper = styled(Card)(
  ({ theme }) => `
    padding: ${theme.spacing(4)};
    margin-bottom: ${theme.spacing(4)};
    border-radius: 0;
  `
);

const PageHeader = (props) => {

  const {
    title,
    subtitle,
    startIcon,
    content,
    routeLink
    } = props

  return (
    <>
      <PageHeaderWrapper className="MuiPageTitle-wrapper">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle2" >
              {subtitle}
            </Typography>
          </Grid>
          <Grid item>
            <Link href={routeLink}>
              <Button
                sx={{
                  mt: { xs: 2, sm: 0 }
                }}
                variant="contained"
                startIcon={startIcon}
              >
                {content}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </PageHeaderWrapper>
    </>
  );
};

export default PageHeader;
