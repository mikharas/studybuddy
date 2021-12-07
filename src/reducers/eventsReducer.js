const initialData = {
  filter: {
    showEndTime: false,
    startTime: '',
    endTime: '',
    keyword: '',
  },
  events: [],
};

const eventsReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: payload.events,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: payload.filter,
      };
    default:
      return state;
  }
};

export default eventsReducer;
