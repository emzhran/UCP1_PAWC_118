const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua data hewan
router.get('/', (req, res) => {
    db.query('SELECT * FROM binatang', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan data hewan berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM binatang WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Data hewan tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan data hewan baru
router.post('/', (req, res) => {
    const { nama_hewan, jumlah_hewan, jenis_hewan } = req.body;
    if (!nama_hewan || !jumlah_hewan || !jenis_hewan) {
        return res.status(400).send('Semua field harus diisi');
    }

    db.query('INSERT INTO binatang (nama_hewan, jumlah_hewan, jenis_hewan) VALUES (?, ?, ?)', [nama_hewan, jumlah_hewan, jenis_hewan], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newTodo = { id: results.insertId, nama_hewan, jumlah_hewan, jenis_hewan };
        res.status(201).json(newTodo);
    });
});

// Endpoint untuk memperbarui data hewan
router.put('/:id', (req, res) => {
    const { nama_hewan, jumlah_hewan, jenis_hewan } = req.body;

    db.query('UPDATE binatang SET nama_hewan = ?, jumlah_hewan = ?, jenis_hewan = ? WHERE id = ?', [nama_hewan, jumlah_hewan, jenis_hewan, req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Data hewan tidak ditemukan');
        res.json({ id: req.params.id, nama_hewan, jumlah_hewan, jenis_hewan });
    });
});

// Endpoint untuk menghapus data hewan
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM binatang WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Data hewan tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;
