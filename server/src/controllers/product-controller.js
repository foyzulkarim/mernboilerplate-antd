/* eslint-disable no-undef */
const express = require("express");
const {
    getAll,
    save,
    update,
    deleteById,
    getById,
    search,
    count,
} = require("../services/product-service");
const validators = require("../models/request-models");
const { handleValidation } = require("../middlewares");
const { NotFound } = require("../utils/errors");

const router = express.Router();

// const getHandler = async (req, res, next) => {
//     try {
//         console.log('user:', req.user);
//         const items = await getAll();
//         const result = {
//             data: items,
//             total: items.length,
//             success: true,
//         };
//         res.status(200).send(result);
//     } catch (error) {
//         return next(error, req, res);
//     }
// };

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await getById(id);
        if (item) {
            res.status(200).send(item);
        } else {
            throw new NotFound("Product not found by the id: " + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await save(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const searchHandler = async (req, res, next) => {
    try {
        if (!req.query.pageSize) {
            req.query.pageSize = 10;
        }
        if (!req.query.current) {
            req.query.current = 1;
        }
        const result = await search(req.query);
        const response = { success: true, ...result };
        res.status(200).send(response);
    } catch (error) {
        return next(error, req, res);
    }
};


const countHandler = async (req, res, next) => {
    try {
        const result = await count(req.query);
        const response = { success: true, ...result };
        res.status(200).send(response);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await update(body);
        res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send("Product deleted");
    } catch (error) {
        return next(error, req, res);
    }
};

router.get("/:id", getByIdHandler);
router.post("/", handleValidation(validators.productSchemaValidate), postHandler);
router.post('/search', searchHandler);
router.post('/count', countHandler);
router.put("/:id", putHandler);
// router.get("/", getHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
