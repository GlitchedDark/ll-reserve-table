const availableTimesByDate = {
    '2024-03-31': ['10:00', '11:00', '12:00'],
    '2024-04-01': ['10:00', '11:00', '12:00'],
    '2024-04-02': ['14:00', '15:00', '16:00'],
    '2024-04-03': ['10:00', '11:00', '12:00'],
    '2024-04-04': ['14:00', '15:00', '16:00'],
    '2024-04-05': ['10:00', '11:00', '12:00'],
    '2024-04-06': ['14:00', '15:00', '16:00'],
    '2024-04-07': ['10:00', '11:00', '12:00'],
    '2024-04-08': ['14:00', '15:00', '16:00'],
    '2024-04-09': ['10:00', '11:00', '12:00'],
    '2024-04-10': ['14:00', '15:00', '16:00'],
    '2024-04-11': ['10:00', '11:00', '12:00'],
    '2024-04-12': ['14:00', '15:00', '16:00'],
    '2024-04-13': ['10:00', '11:00', '12:00'],
    '2024-04-14': ['14:00', '15:00', '16:00'],
    '2024-04-15': ['10:00', '11:00', '12:00'],
    '2024-04-16': ['14:00', '15:00', '16:00'],
    '2024-04-17': ['10:00', '11:00', '12:00'],
    '2024-04-18': ['14:00', '15:00', '16:00'],
    '2024-04-19': ['10:00', '11:00', '12:00'],
    '2024-04-20': ['14:00', '15:00', '16:00'],
  };


  const fetchAPI = (date) => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(availableTimesByDate[date]){
                resolve(availableTimesByDate[date])
            }
            else{
                reject(new Error('No available times for the selected date.'));
            }
        } , 1000)
    })
  }

  const submitAPI = (formData) => {

    availableTimesByDate[formData.date] = availableTimesByDate[formData.date].filter(time => time !== formData.time);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formData) {
          resolve(true); // Simulate successful submission
        } else {
          reject(new Error('Form submission failed.'));
        }
      }, 1000); // Simulate API delay
    });
  };

  export{fetchAPI,submitAPI,availableTimesByDate}