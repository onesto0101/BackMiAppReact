"use strict";

const express = require("express");
const BusStopsService = require("../services/bus-stops.service");
const BusStopsRouter = express.Router();
const service = new BusStopsService();

BusStopsRouter.get("/", async (req, res) => {
    const filters = {
        search: req.query.search ?? "",
        type: req.query.type ?? "all",
        status: req.query.status ?? "all"
    };

    const busStops = await service.getAll(filters);

    res.status(200).json({
        count: busStops.length,
        data: busStops
    });
});

BusStopsRouter.get("/geojson", async (req, res) => {
    const filters = {
        search: req.query.search ?? "",
        type: req.query.type ?? "all",
        status: req.query.status ?? "all"
    };

    const geoJSON = await service.getGeoJSON(filters);

    res.status(200).json(geoJSON);
});

BusStopsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    const busStop = await service.getById(id);

    res.status(200).json(busStop);
});

BusStopsRouter.post("/", async (req, res) => {
    const busStop = await service.create(req.body);

    res.status(201).json({
        message: "Parada creada correctamente",
        data: busStop
    });
});

BusStopsRouter.patch("/:id", async (req, res) => {
    const busStop = await service.update(req.params.id, req.body);

    res.status(200).json({
        message: "Parada actualizada correctamente",
        data: busStop
    });
});

BusStopsRouter.delete("/:id", async (req, res) => {
    const busStop = await service.delete(req.params.id);

    res.status(200).json({
        message: "Parada eliminada correctamente",
        data: busStop
    });
});

module.exports = BusStopsRouter;
