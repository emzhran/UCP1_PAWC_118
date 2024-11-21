const express = require('express');
const router = express.Router();

let todos = [
    {
       id: 1, nama_hewan: "Kambing", jumlah_hewan: "25", jenis_hewan: "Herbivora"
    },
    {
        id: 2, nama_hewan: "Sapi", jumlah_hewan: "20", jenis_hewan: "Herbivora"
    },
];

router.get('/', (req, res) => {
    res.json(todos);
});

router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        nama_hewan: req.body.nama_hewan,
        jumlah_hewan: req.body.jumlah_hewan,
        jenis_hewan: req.body.jenis_hewan
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({message: 'Tugas tidak ditemukan'});

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.status(200).json({message: `Tugas '${deletedTodo.nama_hewan}' telah dihapus`});
});

router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({message: 'Tugas tidak ditemukan'});

    todo.nama_hewan = req.body.nama_hewan || todo.nama_hewan;
    todo.jumlah_hewan = req.body.jumlah_hewan || todo.jumlah_hewan;
    todo.jenis_hewan = req.body.jenis_hewan || todo.jenis_hewan;

    res.status(200).json({
        message: `Tugas dengan ID ${todo.id} telah diperbarui`,
        updatedTodo: todo
    });
});

module.exports = router;
