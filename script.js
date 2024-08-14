const canvas = document.getElementById('constellationCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = canvas.clientWidth;
const canvasHeight = canvas.height = canvas.clientHeight;

const constellations = [
    {
        name: "Orion",
        description: "Orion is a prominent constellation located on the celestial equator and visible throughout the world.",
        stars: [
            { x: 100, y: 100 },
            { x: 200, y: 50 },
            { x: 300, y: 100 },
            { x: 400, y: 150 },
            { x: 350, y: 250 }
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 4]
        ]
    },
    {
        name: "Ursa Major",
        description: "Ursa Major, also known as the Great Bear, is a large constellation visible in the northern hemisphere.",
        stars: [
            { x: 500, y: 100 },
            { x: 600, y: 50 },
            { x: 700, y: 100 },
            { x: 800, y: 150 },
            { x: 750, y: 250 },
            { x: 650, y: 300 },
            { x: 550, y: 250 }
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]
        ]
    },
    {
        name: "Cassiopeia",
        description: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
        stars: [
            { x: 100, y: 400 },
            { x: 150, y: 450 },
            { x: 200, y: 400 },
            { x: 250, y: 450 },
            { x: 300, y: 400 }
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 4]
        ]
    },
    {
        name: "Draco",
        description: "Draco is a constellation in the far northern sky. Its name is Latin for dragon.",
        stars: [
            { x: 500, y: 400 },
            { x: 550, y: 450 },
            { x: 600, y: 500 },
            { x: 650, y: 550 },
            { x: 700, y: 600 }
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 4]
        ]
    },
    {
        name: "Lyra",
        description: "Lyra is a small constellation. It was often represented on star maps as a vulture or an eagle carrying a lyre.",
        stars: [
            { x: 800, y: 400 },
            { x: 850, y: 450 },
            { x: 900, y: 500 },
            { x: 950, y: 550 },
            { x: 1000, y: 600 }
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 4]
        ]
    }
];

function drawAllConstellations() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    constellations.forEach(constellation => {
        ctx.fillStyle = 'white';
        constellation.stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });

        ctx.strokeStyle = 'white';
        constellation.lines.forEach(line => {
            const [start, end] = line;
            ctx.beginPath();
            ctx.moveTo(constellation.stars[start].x, constellation.stars[start].y);
            ctx.lineTo(constellation.stars[end].x, constellation.stars[end].y);
            ctx.stroke();
        });
    });
}

function getConstellationAtPosition(x, y) {
    return constellations.find(constellation => 
        constellation.stars.some(star => 
            Math.hypot(star.x - x, star.y - y) < 10
        )
    );
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const selectedConstellation = getConstellationAtPosition(x, y);

    if (selectedConstellation) {
        document.getElementById('constellationName').textContent = selectedConstellation.name;
        document.getElementById('constellationDescription').textContent = selectedConstellation.description;
    }
});

drawAllConstellations();
