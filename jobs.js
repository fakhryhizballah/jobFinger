const db = require('./config/db');

// async function findTemplate() {
//     let AllTemplate = await db.query(`SELECT * FROM template`);
//     let templates = AllTemplate[0];

//     const map = new Map();

//     for (let item of templates) {
//         let key = item.Template; // hanya berdasarkan isi Template

//         if (!map.has(key)) {
//             map.set(key, []);
//         }
//         map.get(key).push(item);
//     }

//     for (let [key, group] of map.entries()) {
//         if (group.length > 1) {
//             // Urutkan descending berdasarkan templateid → paling besar dulu
//             group.sort((a, b) => b.templateid - a.templateid);

//             // Ambil yang akan dihapus (yang paling baru)
//             let toDelete = group[0];

//             await db.query(`DELETE FROM template WHERE templateid = ?`, [toDelete.templateid]);

//             console.log(`Deleted duplicate templateid ${toDelete.templateid}`);
//         }
//     }
//     return;
// }
// findTemplate();

// async function updateJam() {
//     let jam = await db.query(`SELECT
// 	checkinout.id,
// 	checkinout.userid,
// 	checkinout.checktime
// FROM
// 	checkinout
// WHERE
// 	checkinout.checktime LIKE '2025-09-28 09%'`);
//     console.log(jam[0]);
//     for (let item of jam[0]) {
//         console.log(item.checktime);
//         let newChecktime = new Date(Date.parse(item.checktime) + 4 * 60 * 60 * 1000);
//         console.log(newChecktime);
//         console.log(newChecktime.toISOString().split('T')[0] + ' ' + newChecktime.toTimeString().split(' ')[0]);
//         // await db.query(`UPDATE checkinout SET checktime = ? WHERE id = ?`, [newChecktime.toISOString().split('T')[0] + ' ' + newChecktime.toTimeString().split(' ')[0], item.id]);
//         await db.query(`UPDATE checkinout SET checktime = ? WHERE id = ?`, [newChecktime, item.id]);
//     // return;
//     }

//     return;
// }
// updateJam();