"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");

const {
    notFoundHandler,
    logErrors,
    errorHandler
}= require("./middlewares/error.handler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        name: "API Trabajo",
        version: "1.0.0",
        endpoints: {
            health: "/api/health",
            busStops: "/api/bus-stops",
            busStopsGeoJSON: "/api/bus-stops/geojson",
            busStopById: "/api/bus-stops/:id",
            createBusStop: "POST /api/bus-stops",
            updateBusStop: "PATCH /api/bus-stops/:id",
            deleteBusStop: "DELETE /api/bus-stops/:id",
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString()
    });
});

routerApi(app);

app.use(notFoundHandler);
app.use(logErrors);
app.use(errorHandler);

module.exports = app;
