import pool from '../utils/db.js';

export const createTrip = async (req, res) => {
  const user_id = req.user.id;
  const { municipality_id, date_from, date_to, participants = [] } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO trips (user_id, municipality_id, date_from, date_to) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, municipality_id, date_from, date_to]
    );
    const tripId = result.rows[0].id;
    await pool.query(
      'INSERT INTO trip_participants (trip_id, user_id) VALUES ($1, $2)',
      [tripId, user_id]
    );
    for (const participant of participants) {
      await pool.query(
        'INSERT INTO trip_participants (trip_id, user_id) VALUES ($1, $2)',
        [tripId, participant]
      );
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear el viaje' });
  }
};

export const getTrips = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, m.name AS municipality_name, m.province
       FROM trips t
       JOIN municipalities m ON t.municipality_id = m.id
       ORDER BY t.date_from DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los viajes' });
  }
};
