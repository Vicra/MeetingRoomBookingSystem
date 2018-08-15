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

async function addEvent(data)
{
    // '2018-08-13 22:31:01'
    const insertEventSQL = 
    `INSERT INTO Events
        (room_id,
        name,
        start_time,
        end_time,
        user_id,
        event_type_id)
    VALUES
    (?,?,?,?,?,?)`;
    var response = await fw.db.execute('local',insertEventSQL,
    [
        data.roomid,
        data.name,
        data.bookDate + " " + data.starttime + ":00",
        data.bookDate + " " + data.endtime + ":00",
        data.userid,
        data.eventtype
    ]);

    for (var i = 0; i < data.guests.length; i++) {
        const insertParticipantSQL = 
        `INSERT INTO Events_Participants
            (event_id,
            user_id,
            confirm_attendance)
        VALUES
        (?,?,?)`;

        await fw.db.execute('local',insertParticipantSQL,
        [
            response.insertId,
            data.guests[i].id,
            "no"
        ]);
    }
    return response;
}

module.exports = 
{
    getUpcomingEvents,
    addEvent
}