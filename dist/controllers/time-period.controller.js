"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTimePeriod = exports.updateTimePeriod = exports.postTimePeriod = exports.getTimePeriod = exports.getTimePeriods = void 0;
const time_period_1 = __importDefault(require("../models/time-period"));
const getTimePeriods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTimePeriod = yield time_period_1.default.findAll();
    // console.log(req.body);
    res.json(listTimePeriod);
});
exports.getTimePeriods = getTimePeriods;
const getTimePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const timeperiod = yield time_period_1.default.findByPk(id);
    if (timeperiod) {
        res.json(timeperiod);
    }
    else {
        res.status(404).json({
            message: 'No existe un cliente con el id: ' + id
        });
    }
});
exports.getTimePeriod = getTimePeriod;
const postTimePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield time_period_1.default.create(body);
        res.json({
            message: 'Plazo Registrado Exitosamentee',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al registrar el plazo',
        });
        console.log(error);
    }
});
exports.postTimePeriod = postTimePeriod;
const updateTimePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const timeperiod = yield time_period_1.default.findByPk(id);
        if (timeperiod) {
            yield timeperiod.update(body);
            res.json({
                message: 'Plazo Actualizado Exitosamente'
            });
        }
        else {
            res.status(404).json({
                message: 'No existe un plazo con el id: ' + id
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar al plazo',
        });
    }
});
exports.updateTimePeriod = updateTimePeriod;
const deleteTimePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const timeperiod = yield time_period_1.default.findByPk(id);
    if (!timeperiod) {
        res.status(404).json({
            message: 'No existe un plazo con el id: ' + id
        });
    }
    else {
        yield timeperiod.destroy();
        res.json({
            message: 'Plazo Eliminado Exitosamente'
        });
    }
});
exports.deleteTimePeriod = deleteTimePeriod;
