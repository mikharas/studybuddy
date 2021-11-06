const initialData = [
  {
    title: 'Admin gathering!',
    description: 'A gathering for admins',
    host: 'admin',
    location: 'bahen',
    date: 1,
    attendees: [],
  },
];

const eventsReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case 'CREATE_EVENT':
      return [
        ...state,
        {
          title: payload.title,
          description: payload.description,
          host: payload.title,
          date: payload.date,
          location: payload.location,
          maxSpots: payload.maxSpots,
          attendees: [],
        },
      ];
    case 'ADD_ATTENDEE':
      return state.map((e) => {
        if (e.title === payload.title) {
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
        if (e.title === payload.title) {
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
