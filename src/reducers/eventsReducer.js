const initialData = [
  {
    id: '1',
    title: 'Late night hussle',
    description:
      "I'm working on my CSC309 assignment. Anyone fellow procrastinators out there?",
    host: 'user2',
    location: { lat: 43.66722268215065, lng: -79.39352376463985 },
    maxSpots: 3,
    date: 'NOV 7 @12AM',
    attendees: ['user2'],
  },
  {
    id: '2',
    title: 'Web Development Study Session',
    description:
      'A study session for any students who are working on a web application. All are welcome!',
    host: 'admin',
    location: { lat: 43.665285990915336, lng: -79.39562457244709 },
    maxSpots: 5,
    date: 'NOV 10 @8PM',
    attendees: ['admin'],
  },
  {
    id: '3',
    title: 'Morning coffee & Study',
    description: 'For all of you early-birds out there, study with me!',
    host: 'user',
    location: { lat: 43.6596184, lng: -79.39692079999999 },
    maxSpots: 5,
    date: 'NOV 15 @9AM',
    attendees: ['user'],
  },
];

const eventsReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case 'CREATE_EVENT':
      return [
        ...state,
        {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          host: payload.host,
          date: payload.date,
          location: payload.location,
          maxSpots: parseInt(payload.maxSpots, 10),
          attendees: [payload.host],
        },
      ];
    case 'EDIT_EVENT':
      return state.map((e) => {
        if (e.id === payload.eventID) {
          return {
            ...e,
            title: payload.title,
            description: payload.description,
            date: payload.date,
            location: payload.location,
            maxSpots: parseInt(payload.maxSpots, 10) + e.attendees.length,
          };
        }
        return e;
      });
    case 'ADD_ATTENDEE':
      return state.map((e) => {
        if (e.id === payload.eventID) {
          const newAttendees = e.attendees.slice();
          newAttendees.push(payload.attendee);
          return {
            ...e,
            attendees: newAttendees,
          };
        }
        return e;
      });
    case 'REMOVE_ATTENDEE':
      return state.map((e) => {
        if (e.id === payload.eventID) {
          const newAttendees = e.attendees.filter(
            (a) => a !== payload.attendee,
          );
          return {
            ...e,
            attendees: newAttendees,
          };
        }
        return e;
      });
    default:
      return state;
  }
};

export default eventsReducer;
