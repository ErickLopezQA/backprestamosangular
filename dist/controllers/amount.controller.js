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
exports.deleteAmount = exports.updateAmount = exports.postAmount = exports.getAmount = exports.getAmounts = void 0;
const amount_1 = __importDefault(require("../models/amount"));
const getAmounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAmounts = yield amount_1.default.findAll();
    // console.log(req.body);
    res.json(listAmounts);
});
exports.getAmounts = getAmounts;
const getAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const amount = yield amount_1.default.findByPk(id);
    if (amount) {
        res.json(amount);
    }
    else {
        res.status(404).json({
            message: 'No existe un monto con el id: ' + id
        });
    }
});
exports.getAmount = getAmount;
const postAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield amount_1.default.create(body);
        res.json({
            message: 'Monto Registrado Exitosamentee',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al registrar el monto',
        });
        console.log(error);
    }
});
exports.postAmount = postAmount;
const updateAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const amount = yield amount_1.default.findByPk(id);
        if (amount) {
            yield amount.update(body);
            res.json({
                message: 'Monto Actualizado Exitosamente'
            });
        }
        else {
            res.status(404).json({
                message: 'No existe un monto con el id: ' + id
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el monto',
        });
    }
});
exports.updateAmount = updateAmount;
const deleteAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const amount = yield amount_1.default.findByPk(id);
    if (!amount_1.default) {
        res.status(404).json({
            message: 'No existe un monto con el id: ' + id
        });
    }
    else {
        yield amount_1.default.destroy();
        res.json({
            message: 'Monto Eliminado Exitosamente'
        });
    }
});
exports.deleteAmount = deleteAmount;
