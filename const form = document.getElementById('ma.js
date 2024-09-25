const form = document.getElementById('materiaForm');
const materiasList = document.getElementById('materiasList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;

    const response = await fetch('/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, cantidad })
    });

    if (response.ok) {
        form.reset();
        getMaterias();
    }
});

async function getMaterias() {
    const response = await fetch('/materias');
    const materias = await response.json();
    
    materiasList.innerHTML = '';
    materias.forEach(materia => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${materia.nombre}</strong> - ${materia.cantidad} alumnos 
            <button onclick="deleteMateria(${materia.id})">Eliminar</button>
        `;
        materiasList.appendChild(div);
    });
}

async function deleteMateria(id) {
    await fetch(`/materias/${id}`, { method: 'DELETE' });
    getMaterias();
}

getMaterias();