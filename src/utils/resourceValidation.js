"use strict";

const AppError = require("./appError");

function validateText(value, label, { allowEmpty = false } = {}) {
    if (typeof value !== "string" || (!allowEmpty && !value.trim())) {
        throw new AppError(400, `${label} debe ser texto no vacío.`);
    }

    return value.trim();
}

function validateEnum(value, allowedValues, label) {
    if (!allowedValues.includes(value)) {
        throw new AppError(
            400,
            `${label} debe ser uno de estos valores: ${allowedValues.join(", ")}.`
        );
    }

    return value;
}

function validateCoordinates(longitude, latitude) {
    const numericLongitude = Number(longitude);
    const numericLatitude = Number(latitude);

    if (
        !["number", "string"].includes(typeof longitude) ||
        !["number", "string"].includes(typeof latitude) ||
        (typeof longitude === "string" && !longitude.trim()) ||
        (typeof latitude === "string" && !latitude.trim()) ||
        !Number.isFinite(numericLongitude) ||
        !Number.isFinite(numericLatitude) ||
        numericLongitude < -180 ||
        numericLongitude > 180 ||
        numericLatitude < -90 ||
        numericLatitude > 90
    ) {
        throw new AppError(
            400,
            "Las coordenadas deben ser números válidos dentro de los rangos de longitud y latitud."
        );
    }

    return [numericLongitude, numericLatitude];
}

function validateNumber(
    value,
    label,
    { min, max, exclusiveMin, integer = false }
) {
    const numericValue = Number(value);

    if (
        !["number", "string"].includes(typeof value) ||
        (typeof value === "string" && !value.trim()) ||
        !Number.isFinite(numericValue) ||
        (integer && !Number.isInteger(numericValue)) ||
        (min !== undefined && numericValue < min) ||
        (exclusiveMin !== undefined && numericValue <= exclusiveMin) ||
        (max !== undefined && numericValue > max)
    ) {
        const bounds = [
            min !== undefined ? `mínimo ${min}` : null,
            exclusiveMin !== undefined ? `mayor que ${exclusiveMin}` : null,
            max !== undefined ? `máximo ${max}` : null
        ].filter(Boolean).join(", ");
        const numericType = integer ? "un número entero" : "un número";

        throw new AppError(
            400,
            `${label} debe ser ${numericType}${bounds ? ` (${bounds})` : ""}.`
        );
    }

    return numericValue;
}

function validateObject(value, label) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        throw new AppError(400, `${label} deben enviarse como un objeto.`);
    }
}

module.exports = {
    validateText,
    validateEnum,
    validateCoordinates,
    validateNumber,
    validateObject
};
