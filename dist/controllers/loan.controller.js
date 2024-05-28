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
exports.deleteLoan = exports.updateLoan = exports.postLoan = exports.getLoan = exports.getLoans = void 0;
const loan_1 = __importDefault(require("../models/loan"));
const client_1 = __importDefault(require("../models/client"));
const amount_1 = __importDefault(require("../models/amount"));
const time_period_1 = __importDefault(require("../models/time-period"));
const getLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listLoans = yield loan_1.default.findAll({
        include: [
            { model: client_1.default, attributes: ["name", "lastname", "email", "contact", "address"] },
            { model: amount_1.default, attributes: ["amount"] },
            { model: time_period_1.default, attributes: ["time_period"] },
        ],
    });
    res.json(listLoans);
});
exports.getLoans = getLoans;
const getLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const loan = yield loan_1.default.findByPk(id, {
        include: [
            { model: client_1.default, attributes: ["name", "lastname", "email", "contact", "address"] },
            { model: amount_1.default, attributes: ["amount"] },
            { model: time_period_1.default, attributes: ["time_period"] },
        ],
    });
    if (loan) {
        res.json(loan);
    }
    else {
        res
            .status(404)
            .json({ message: "No existe un préstamo con el id: " + id });
    }
});
exports.getLoan = getLoan;
// Otros controladores...
const postLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield loan_1.default.create(body);
        res.json({
            message: 'Prestamo Registrado Exitosamentee',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al registrar el prestamo',
        });
        console.log(error);
    }
});
exports.postLoan = postLoan;
const updateLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const loan = yield loan_1.default.findByPk(id);
        if (loan) {
            yield loan.update(body);
            res.json({
                message: 'Prestamo Actualizado Exitosamente'
            });
        }
        else {
            res.status(404).json({
                message: 'No existe un prestamo con el id: ' + id
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar al prestamo',
        });
    }
});
exports.updateLoan = updateLoan;
const deleteLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const loan = yield loan_1.default.findByPk(id);
    if (!loan) {
        res.status(404).json({
            message: 'No existe un prestamo con el id: ' + id
        });
    }
    else {
        yield loan.destroy();
        res.json({
            message: 'Prestamo Eliminado Exitosamente'
        });
    }
});
exports.deleteLoan = deleteLoan;
