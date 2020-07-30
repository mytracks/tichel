import React from 'react'

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const dayOfWeek = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sam'
]

const getShortMonth = (date) => shortMonths[date.getMonth(date)]
const getDayMonth = (date) => date.getDay(date)
const getDayOfWeek = (date) => dayOfWeek[date.getDay(date)]

const getTime = (date) => {
  let hours = date.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }

  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  return `${hours}:${minutes}`
}

const DateCell = (props) => {
  const startDate = new Date(props.start)
  const endDate = new Date(props.end)

  return (
    <div className="DateCell">
      <div className="DateCell__Month">{ getShortMonth(startDate) }</div>
      <div className="DateCell__Day">{ getDayMonth(startDate) }</div>
      <div className="DateCell__DayOfWeek">{ getDayOfWeek(startDate) }</div>
      <div>{ getTime(startDate) }</div>
      <div>{ getTime(endDate) }</div>
    </div>
  )
}

export default DateCell