const db = require('./config/db');

async function findTemplate() {
    let AllTemplate = await db.query(`SELECT * FROM template`);
    let templates = AllTemplate[0];

    const map = new Map();

    for (let item of templates) {
        let key = item.Template; // hanya berdasarkan isi Template

        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(item);
    }

    for (let [key, group] of map.entries()) {
        if (group.length > 1) {
            // Urutkan descending berdasarkan templateid → paling besar dulu
            group.sort((a, b) => b.templateid - a.templateid);

            // Ambil yang akan dihapus (yang paling baru)
            let toDelete = group[0];

            await db.query(`DELETE FROM template WHERE templateid = ?`, [toDelete.templateid]);

            console.log(`Deleted duplicate templateid ${toDelete.templateid}`);
        }
    }
    return;
}
findTemplate();