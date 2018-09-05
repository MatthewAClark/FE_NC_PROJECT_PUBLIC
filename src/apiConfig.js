const api_url = 'http://localhost:3000'

const fetchUrl = { 'stations' : `${api_url}/api/db/stations/`, 
                   'allSchedules' : `${api_url}/api/db/schedules/all`,
                'routes':`${api_url}/api/db/schedules/time/routes`,
                'liveStation':`${api_url}/api/live/station`,
            'postStation': `${api_url}/api/db/stations/`,
            'route': `${api_url}/api/db/schedules/route/`,
        'liveRoute': `${api_url}/api/live/station/route/`,
        'postSchedule': `${api_url}/api/db/schedules/`,
        'delaySchedules' : `${api_url}/api/db/delays/schedules`,
        'stationRoutes':`${api_url}/api/db/routes/`,
        'deleteSchedule': `${api_url}/api/db/schedules`,
        'stationStart':`${api_url}/api/db/routes/start` }

export default  fetchUrl