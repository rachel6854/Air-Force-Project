import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface ListItemHeaderProps {
    heading: string;
    subtitle1: string;
    subtitle2: string;
}

const ListItemHeader: FC<ListItemHeaderProps> = ({heading, subtitle1, subtitle2}) => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">
                    {heading}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="caption">
                    {subtitle1}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="caption">
                    {subtitle2}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ListItemHeader;