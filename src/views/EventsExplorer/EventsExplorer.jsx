import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card } from '@mui/material';
import { css } from '@emotion/css';
import Map from './map.png';
import Cat from './amgry_catto.png';

const Event = ({ id, title, host, date, description, attendees }) => (
  <Card
    className={css`
      display: flex;
      flex-direction: row;
      p {
        margin: 3px;
      }
      h3 {
        margin: 3px;
        margin-bottom: 10px;
      }
    `}
  >
    <div
      className={css`
        background: red;
        width: 30%;
      `}
    >
      <img
        alt="cat"
        src={Cat}
        className={css`
          width: 100%;
          height: 100%;
        `}
      />
    </div>
    <div
      className={css`
        display: flex;
        flex-direction: column;
        padding: 20px;
        text-align: left;
      `}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Hosted by: {host}</p>
      <p>Happening on: {date}</p>
      <p>Attendees: </p>
      {attendees.map((a) => (
        <p>{a}</p>
      ))}
      <Button>
        <NavLink className="link" to={`/EventDashboard/${id}`}>
          Show more
        </NavLink>
      </Button>
    </div>
  </Card>
);

const EventsExplorer = ({ events }) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
      height: 100vh;
    `}
  >
    <div
      className={css`
        width: 50%;
        background: blue;
      `}
    >
      <img
        className={css`
          width: 100%;
          height: 100%;
        `}
        alt="map"
        src={Map}
      />
    </div>
    <div
      className={css`
        width: 50%;
      `}
    >
      {events.map((event) => (
        <Event {...event} />
      ))}
    </div>
  </div>
);

export default EventsExplorer;
