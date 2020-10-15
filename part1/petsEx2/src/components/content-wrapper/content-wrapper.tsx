import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography, {TypographyProps} from '@material-ui/core/Typography';

interface ContentWrapperClasses {
    root?: string;
    header?: string;
    headerText?: string;
    content?: string;
}

interface ContentWrapperProps {
    header?: string;
    variant?: TypographyProps["variant"];
    classes?: ContentWrapperClasses;
}

const ContentWrapper: FC<ContentWrapperProps> = ({header, variant="h5", children, classes = {}}) => {
    const {root = "", header: headerStyle = "", headerText= "", content = ""} = classes;

    return (
        <Grid container direction="column" className={root}>
            <Grid item container
                  direction="column"
                  alignItems="center"
                  className={headerStyle}>
                <Grid item>
                    <Typography variant={variant} className={headerText}>
                        {header}
                    </Typography>
                </Grid>
                <hr style={{width: '100%'}}/>
            </Grid>
            <Grid item className={content}>
                {children}
            </Grid>
        </Grid>
    );
};

export default ContentWrapper;