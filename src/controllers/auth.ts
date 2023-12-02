import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { changePasswordUser, login, lostPassword, registerCustomer, registerDrive, registerOwner } from "../services/auth.service";
import { RequestUser } from "../interfaces/users";

async function loginCtrl(req: Request, res: Response) {
    try {
        const response = await login(req.body);
        return res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function registerOwnerCrtl(req: Request, res: Response) {
    try {
        const response = await registerOwner(req.body);
        return res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function registerCustomerCrtl({body, user}: RequestUser, res: Response) {
    try {
        const response = await registerCustomer(body, `${user?.type}`);
        return res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

// register drive crontroller
async function registerDriveCrtl({body, user}: RequestUser, res: Response) {
    try {
        const response = await registerDrive(body, `${user?.type}`);
        return res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function changePasswordUserCtrl({body, user}: RequestUser, res: Response) {
    try {
        const response = await changePasswordUser(user, body);
        return res.status(200).json({data: response, message: "actualizado con exito", ok: true});
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function recoverPasswordCtrl({body}: Request, res: Response) {
    try {
        const response = await lostPassword(body);
        return res.status(200).json({data: response, message: "Se envio un email a tu bandeja", ok: true});
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

export {
    registerOwnerCrtl,
    registerDriveCrtl,
    loginCtrl,
    registerCustomerCrtl,
    changePasswordUserCtrl,
    recoverPasswordCtrl
}