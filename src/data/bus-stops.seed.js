"use strict";

//Entidad: Paradas de transporte
//type permitidos:   troncal | alimentadora | auxiliar
//status permitidos: operando | suspendida
//campo numerico:    routesCount (entero entre 1 y 30)

const busStops = [
    {
        id: "BUS-001",
        name: "Estacion Centro Maximo",
        type: "troncal",
        status: "operando",
        description: "Estacion de transferencia principal del Sistema Integrado de Transporte en la zona centro",
        routesCount: 24,
        location: {
            type: "Point",
            coordinates: [-101.6868, 21.1267]
        },
        createdAt: "2026-01-12T07:00:00.000Z",
        updatedAt: "2026-09-30T18:45:00.000Z"
    },
    {
        id: "BUS-002",
        name: "Estacion Delta",
        type: "troncal",
        status: "operando",
        description: "Estacion troncal al sur de la ciudad con conexion hacia la zona industrial",
        routesCount: 18,
        location: {
            type: "Point",
            coordinates: [-101.6615, 21.1079]
        },
        createdAt: "2026-01-28T07:30:00.000Z",
        updatedAt: "2026-10-03T19:10:00.000Z"
    },
    {
        id: "BUS-003",
        name: "Estacion San Jeronimo",
        type: "alimentadora",
        status: "operando",
        description: "Estacion alimentadora que conecta las colonias del surponiente con la ruta troncal",
        routesCount: 9,
        location: {
            type: "Point",
            coordinates: [-101.6990, 21.0970]
        },
        createdAt: "2026-02-14T08:20:00.000Z",
        updatedAt: "2026-09-27T16:00:00.000Z"
    },
    {
        id: "BUS-004",
        name: "Estacion San Juan Bosco",
        type: "alimentadora",
        status: "suspendida",
        description: "Estacion fuera de servicio por obras de repavimentacion en el acceso de autobuses",
        routesCount: 7,
        location: {
            type: "Point",
            coordinates: [-101.7000, 21.1430]
        },
        createdAt: "2026-03-09T09:50:00.000Z",
        updatedAt: "2026-10-10T14:35:00.000Z"
    },
    {
        id: "BUS-005",
        name: "Parada Hidalgo Centro Historico",
        type: "auxiliar",
        status: "operando",
        description: "Parada auxiliar sobre la calle Hidalgo a una cuadra de la Plaza Principal",
        routesCount: 5,
        location: {
            type: "Point",
            coordinates: [-101.6788, 21.1165]
        },
        createdAt: "2026-04-01T10:10:00.000Z",
        updatedAt: "2026-10-05T08:55:00.000Z"
    },
    {
        id: "BUS-006",
        name: "Parada Mercado Aldama",
        type: "auxiliar",
        status: "suspendida",
        description: "Parada suspendida temporalmente por el desvio vial del tianguis de los domingos",
        routesCount: 3,
        location: {
            type: "Point",
            coordinates: [-101.6830, 21.1190]
        },
        createdAt: "2026-04-26T11:25:00.000Z",
        updatedAt: "2026-10-12T17:15:00.000Z"
    },
    {
        id: "BUS-007",
        name: "Estacion Las Americas",
        type: "troncal",
        status: "operando",
        description: "Estacion troncal al norponiente con carril confinado hacia el centro de la ciudad",
        routesCount: 15,
        location: {
            type: "Point",
            coordinates: [-101.6900, 21.1340]
        },
        createdAt: "2026-05-17T12:40:00.000Z",
        updatedAt: "2026-10-08T07:30:00.000Z"
    },
    {
        id: "BUS-008",
        name: "Parada Parque Juarez",
        type: "auxiliar",
        status: "operando",
        description: "Parada auxiliar frente al Parque Juarez utilizada por rutas alimentadoras del norte",
        routesCount: 4,
        location: {
            type: "Point",
            coordinates: [-101.6760, 21.1310]
        },
        createdAt: "2026-06-30T13:05:00.000Z",
        updatedAt: "2026-10-13T09:40:00.000Z"
    },
    {
        id: "BUS-009",
        name: "Parada Universidad De La Salle Bajio",
        type: "auxiliar",
        status: "operando",
        description: "Parada auxiliar ubicada en una de las entradas de la Universidad De La Salle Bajio, coordenada tomada directamente del mapa",
        routesCount: 6,
        location: {
            type: "Point",
            coordinates: [-101.7108234, 21.1505784]
        },
        createdAt: "2026-10-14T08:00:00.000Z",
        updatedAt: "2026-10-14T08:00:00.000Z"
    }
];

module.exports = busStops;
