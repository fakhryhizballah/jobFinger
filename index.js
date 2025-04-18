// index.js
const express = require('express');
const db = require('./config/db');
const app = express();

app.use(express.json());

// Endpoint: GET /absensi
// Query Params: badgenumbers (comma-separated), month (e.g., 2025-04)
app.get('/absensi', async (req, res) => {
    try {
        const { month } = req.query;
        let badgenumbers = req.body
        // console.log(req.body);

        if (!month) {
            return res.status(400).json({ message: 'badgenumbers dan month harus diisi' });
        }

        // const badgeList = badgenumbers.split(',').map(b => b.trim());
        // console.log(badgeList);

        // Bangun WHERE clause untuk LIKE multiple
        const badgeLikeClauses = badgenumbers.map(() => `u.badgenumber LIKE ?`).join(' OR ');
        const likeValues = badgenumbers.map(b => `%${b}`);

        const sql = `
      SELECT
        u.badgenumber,
        u.name,
        c.userid,
        c.checktime,
        DATE_ADD(c.checktime, INTERVAL 7 HOUR) AS checktime_wib,
        c.checktype,
        c.SN,
        i.Alias
      FROM
        userinfo u
      INNER JOIN checkinout c ON u.userid = c.userid
      LEFT JOIN iclock i ON c.SN = i.SN
      WHERE (${badgeLikeClauses})
        AND DATE_FORMAT(c.checktime, '%Y-%m-%d') = ?
    `;

        const [rows] = await db.query(sql, [...likeValues, month]);
        console.log(rows);
      return  res.json(rows);
    } catch (err) {
        console.error(err);
      return  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});