import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, CardActions } from '@material-ui/core';
import { GridList } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  cardRoot: {
    width: 220,
    height: "85%",
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
}));

function BelowPage() {
    const classes = useStyles();
    const [ data, setState ] = useState({outcome:[]})
    
    const url = 'http://k8s-default-backendi-6566bc7d31-5825429.us-west-2.elb.amazonaws.com/newbooks/all'
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          url,
        );
        setState(result.data);
      };
      
      fetchData();
    }, []);
  
    
    return (
      <div className={classes.root}>
        <GridList cellHeight={400} className={classes.gridList} cols={2}>
          {data.outcome.map( item => (
          <div>
            <Card className={classes.cardRoot}>        
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.name} 
                </Typography>
                <Typography variant="body2" component="p">
                  <img 
                    style={{ display: 'block', margin: '0px auto' }}
                    src={item.url}
                    height='150'
                    alt={item.name}
                  />
                  <br/>
                  {item.value}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={item.link} target="_blank">
                  <Button size="small">더 보기</Button>
                </a>
              </CardActions>
            </Card>
          </div>
          ))}
        </GridList>
      </div>
    )
}

export default BelowPage;