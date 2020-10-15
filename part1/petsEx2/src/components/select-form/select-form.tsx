import React, {ChangeEvent, FC, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ContentWrapper from '../content-wrapper/content-wrapper';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(
  createStyles({
    root: {
      minWidth: '200px',
      border: 'black solid 2px',
      borderRadius: '20px',
    },
    submit: {
      marginBottom: '10px',
    },
    text: {
      margin: 'auto',
    },
    center: {
      textAlign: 'center',
    },
  })
);

export interface SelectOption {
  id: any;
  text: string;
}

interface SelectFormProps {
  header: string;
  selectText: string;
  submitText: string;
  options: SelectOption[];
  onSubmit: (option: SelectOption | undefined) => void;
}

const SelectForm: FC<SelectFormProps> = ({
  header,
  selectText,
  submitText,
  options,
  onSubmit,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<any>(options[0].id);
  const {root, submit, text, center} = useStyles({});

  const handleSelect = (event: ChangeEvent<any>) => {
    setSelectedOptionId(event.target.value);
  };

  const handleSubmit = () => {
    const selectedOption = options.find(({id}) => id === selectedOptionId);
    onSubmit(selectedOption);
  };

  return (
    <Paper className={root} elevation={5}>
      <ContentWrapper header={header} variant="h6">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item container direction="row" justify="center">
            <Grid item className={`${center} ${text}`} xs={6}>
              <Typography variant="body1">{selectText}</Typography>
            </Grid>
            <Grid item xs={6} className={center}>
              <Select value={selectedOptionId} onChange={handleSelect}>
                {options.map(({id, text}) => (
                  <MenuItem key={id} value={id}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={submit}
              color="primary"
              onClick={handleSubmit}
              size="small">
              {submitText}
            </Button>
          </Grid>
        </Grid>
      </ContentWrapper>
    </Paper>
  );
};

export default SelectForm;