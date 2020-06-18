import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => (
     createStyles({
         "button" : {
             borderColor: grey,
             color: 'grey',
             fontWeight: 600,
             marginBottom: '8px',
             width: '100%',
             "&:hover": {
                 backgroundColor: 'grey',
                 color: '#FFF'
             }
         }
     })
  ));

const Answer = (props) => {
    const classes = useStyles();
    return(
        <div>
            <Button 
                className={classes.button}
                variant="outlined" 
                onClick={() => props.select(props.content ,props.nextId)} >{props.content}</Button>
        </div>
    )
}

export default Answer