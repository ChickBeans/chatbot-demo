import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
    },
  }));

const Answer = (props) => {
    return(
        <div>
            <Button variant="contained" color="primary" onClick={() => props.select(props.content ,props.nextId)} >{props.content}</Button>
        </div>
    )
}

export default Answer