import React, { useState } from 'react';
import { Card, CardActionArea, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  eventDate: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  eventDescription: {
    marginBottom: theme.spacing(1.4),
  },
  eventAttendee: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(3),
  },
  eventCard: {
    borderTop: `solid 0.5px ${theme.palette.gray.dark}`,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  eventCardImageContainer: {
    height: theme.spacing(15),
    width: theme.spacing(20),
  },
  eventCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  eventCardInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    textAlign: 'left',
    justifyContent: 'center',
  },
}));

const QuestionItem = ({ question, answer }) => {
  const classes = useStyles();

  return (
    <Card className={classes.eventCard}>
      <div className={classes.eventCardInfo}>
        <div className="questionContainer">
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            Question:&nbsp;&nbsp;&nbsp;&nbsp;{question}
          </Typography>
          {/* <Typography
                sx={{ display: 'inline'}}
                variant="body2" color="GrayText"
                >
                    by {username}
                </Typography> */}
        </div>
        <div className="answerContainer">
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="body1"
            display="inline"
          >
            Answer:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Typography variant="body1" display="inline">
            {answer}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default QuestionItem;
