//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================

async function getUpcomingEvents()
{
    const SQL = 
    `SELECT r.name AS 'Room', 
        e.id AS 'EventId', 
        e.name AS 'Event', 
        e.start_time AS 'StartTime', 
        e.end_time AS 'EndTime', 
        u.name AS 'Organizer', 
        et.name AS 'EventType'
    FROM Events e
    INNER JOIN Rooms r ON r.id = e.room_id
    INNER JOIN Users u ON u.id = e.user_id
    INNER JOIN EventTypes et ON et.id = e.event_type_id
    WHERE e.start_time > SYSDATE()
    ORDER BY e.start_time ASC`;
    return await fw.db.execute('local',SQL);
}

module.exports = 
{
    getUpcomingEvents
}