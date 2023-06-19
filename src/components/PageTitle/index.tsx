import { FC } from "react";
import { Typography, Button, Grid, Box, useTheme } from "@mui/material";

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  buttonTitle?: string;
  onClickButton?(): void;
}

const PageTitle: FC<PageTitleProps> = ({
  heading = "",
  subHeading = "",
  buttonTitle = "",
  onClickButton,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: theme.spacing(5) }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        {...rest}
      >
        <Grid item>
          <Typography variant="h1" component="h1" gutterBottom>
            {heading}
          </Typography>
          <Typography variant="subtitle2">{subHeading}</Typography>
        </Grid>
        {!!buttonTitle && (
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              color={"secondary"}
              onClick={onClickButton}
            >
              {buttonTitle}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PageTitle;
