"use strict";

const { randomUUID } = require("crypto");

const seedBusStops = require("../data/bus-stops.seed");
const AppError = require("../utils/appError");
const {
    validateText,
    validateEnum,
    validateCoordinates,
    validateNumber,
    validateObject
} = require("../utils/resourceValidation");

const TYPES = ["troncal", "alimentadora", "auxiliar"];
const STATUSES = ["operando", "suspendida"];

class BusStopsService {
    constructor(){
        //Se crea una copia de los datos iniciales
        //Asi evitamos modificar directamente el archivo importado
        this.busStops = structuredClone(seedBusStops);
    }

    async getAll(filters = {}){
        const{
            search = "",
            type = "all",
            status = "all"
        } = filters;

        let results = [...this.busStops];

        const normalizedSearch = this.normalizeText(search);

        if(normalizedSearch){
            results = results.filter((busStop) => {
                const searchableContent = this.normalizeText(
                    `${busStop.name} ${busStop.description} ${busStop.type}`
                );

                return searchableContent.includes(normalizedSearch);
            });
        }

        if(type !== "all"){
            results = results.filter(
                (busStop) => busStop.type === type
            );
        }

        if(status !== "all"){
            results = results.filter(
                (busStop) => busStop.status === status
            );
        }

        results.sort(
            (first, second) =>
                new Date(second.createdAt) - new Date(first.createdAt)
        );

        return results;
    }

    async getById(id){
        const busStop = this.busStops.find(
            (item) => item.id === id
        );

        if(!busStop){
            throw new AppError(
                404,
                `No se encontro la parada de transporte con id: ${id}`
            );
        }

        return busStop;
    }

    async getGeoJSON(filters = {}){
        const busStops = await this.getAll(filters);

        return{
            type: "FeatureCollection",
            features: busStops.map((busStop) => ({
                type: "Feature",
                properties: {
                    id: busStop.id,
                    name: busStop.name,
                    type: busStop.type,
                    status: busStop.status,
                    description: busStop.description,
                    routesCount: busStop.routesCount,
                    createdAt: busStop.createdAt,
                    updatedAt: busStop.updatedAt
                },
                geometry: busStop.location
            }))
        };
    }

    async create(data = {}) {
        validateObject(data, "Los datos de la parada");

        const [longitude, latitude] = validateCoordinates(
            data.longitude,
            data.latitude
        );
        const currentDate = new Date().toISOString();
        const newBusStop = {
            id: `BUS-${randomUUID()}`,
            name: validateText(data.name, "El nombre"),
            type: validateEnum(data.type, TYPES, "El tipo"),
            status: validateEnum(data.status, STATUSES, "El estado"),
            description: data.description === undefined
                ? ""
                : validateText(data.description, "La descripción", { allowEmpty: true }),
            routesCount: validateNumber(
                data.routesCount,
                "El número de rutas",
                { min: 1, max: 30, integer: true }
            ),
            location: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            createdAt: currentDate,
            updatedAt: currentDate
        };

        this.busStops.push(newBusStop);
        return newBusStop;
    }

    async update(id, changes = {}) {
        validateObject(changes, "Los cambios");

        const currentBusStop = await this.getById(id);
        const [currentLongitude, currentLatitude] =
            currentBusStop.location.coordinates;
        const coordinates =
            changes.longitude !== undefined || changes.latitude !== undefined
                ? validateCoordinates(
                    changes.longitude !== undefined
                        ? changes.longitude
                        : currentLongitude,
                    changes.latitude !== undefined
                        ? changes.latitude
                        : currentLatitude
                )
                : currentBusStop.location.coordinates;

        const updatedBusStop = {
            ...currentBusStop,
            ...(changes.name !== undefined && {
                name: validateText(changes.name, "El nombre")
            }),
            ...(changes.type !== undefined && {
                type: validateEnum(changes.type, TYPES, "El tipo")
            }),
            ...(changes.status !== undefined && {
                status: validateEnum(changes.status, STATUSES, "El estado")
            }),
            ...(changes.description !== undefined && {
                description: validateText(
                    changes.description,
                    "La descripción",
                    { allowEmpty: true }
                )
            }),
            ...(changes.routesCount !== undefined && {
                routesCount: validateNumber(
                    changes.routesCount,
                    "El número de rutas",
                    { min: 1, max: 30, integer: true }
                )
            }),
            location: {
                type: "Point",
                coordinates
            },
            updatedAt: new Date().toISOString()
        };

        const index = this.busStops.findIndex((item) => item.id === id);
        this.busStops[index] = updatedBusStop;
        return updatedBusStop;
    }

    async delete(id) {
        const index = this.busStops.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new AppError(404, `No se encontró la parada con id: ${id}`);
        }

        return this.busStops.splice(index, 1)[0];
    }

    normalizeText(value){
        return String(value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
    }
}

module.exports = BusStopsService;
