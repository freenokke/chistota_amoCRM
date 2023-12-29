exports.getCustomFieldPattern = (field_id, value) => {
  return (
    {
      field_id: Number(field_id),
      values: [
        {
          value: parseInt(value) ? parseInt(value) : value
        }
      ]
    }
  )
}

exports.formatDate = (date, time) => {
  if (date && !time) {
    const [day, month, year] = date.split('.');
    const recreatedDate = new Date(year, month - 1, day);
    const isoString = recreatedDate.toISOString();
    const formattedDate =  `${isoString.slice(0, isoString.lastIndexOf('.'))}+00:00`
    
    return ({
      field_id: 2644093,
      values: [{
        value: formattedDate
      }]
    })
  }
  
  if (date && time) {
    const [day, month, year] = date.split('.');
    const [hours, minutes] = time.split(':');

    const recreatedDate = new Date(year, month - 1, day, hours, minutes);
    const isoString = recreatedDate.toISOString();
    const formattedDate =  `${isoString.slice(0, isoString.lastIndexOf('.'))}+00:00`
    return ({
      field_id: 2674701,
      values: [{
        value: formattedDate
      }]
    })
  }
}