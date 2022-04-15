import moment from 'moment';

// Get visible expenses
export default (dipenses, { text, startDate, endDate }) => {
  return dipenses.filter((dipense) => {
    const createdAtMoment = moment(dipense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch1 =   dipense.FornisNames!=undefined && dipense.FornisNames.length>0? dipense.FornisNames.toLowerCase().trim().includes(text.toLowerCase().trim()):true;
    const textMatch2 =   dipense.ClientNames!=undefined && dipense.ClientNames.length>0? dipense.ClientNames.map(client=>client.toLowerCase().trim().includes(text.toLowerCase().trim())).includes(true) :true;

    return startDateMatch && endDateMatch && textMatch1 && textMatch2
  }) 
};
 