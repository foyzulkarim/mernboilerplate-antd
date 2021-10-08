const express = require("express");
const {
    getAll,
    save,
    update,
    deleteById,
    getById,
} = require("../services/user-service");
const validators = require("../models/request-models");
const { handleValidation } = require("../middlewares");
const { NotFound } = require("../utils/errors");

const router = express.Router();

const getHandler = async (req, res, next) => {
    try {
        const items = await getAll();
        res.status(200).send(items);
    } catch (error) {
        return next(error, req, res);
    }
};

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await getById(id);
        if (item) {
            res.status(200).send(item);
        } else {
            throw new NotFound("User not found by the id: " + id);
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
        res.status(200).send("User deleted");
    } catch (error) {
        return next(error, req, res);
    }
};

const currentUserHandler = async (req, res) => {
    res.status(200).send({
           success: true,
           data: {
                  name: 'Serati Ma',
                  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                  userid: '00000001',
                  email: 'antdesign@alipay.com',
                  signature: '海纳百川，有容乃大',
                  title: '交互专家',
                  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
                  tags: [
                         {
                                key: '0',
                                label: '很有想法的',
                         },
                         {
                                key: '1',
                                label: '专注设计',
                         },
                         {
                                key: '2',
                                label: '辣~',
                         },
                         {
                                key: '3',
                                label: '大长腿',
                         },
                         {
                                key: '4',
                                label: '川妹子',
                         },
                         {
                                key: '5',
                                label: '海纳百川',
                         },
                  ],
                  notifyCount: 12,
                  unreadCount: 11,
                  country: 'China',
                  access: 'admin',
                  geographic: {
                         province: {
                                label: '浙江省',
                                key: '330000',
                         },
                         city: {
                                label: '杭州市',
                                key: '330100',
                         },
                  },
                  address: '西湖区工专路 77 号',
                  phone: '0752-268888888',
           },
    });
}

router.get("/:id", getByIdHandler);
router.post("/register", handleValidation(validators.userSchemaValidate), postHandler);
router.put("/:id", putHandler);
router.get("/", getHandler);
router.delete("/:id", deleteHandler);
router.get('/currentUser', currentUserHandler);

module.exports = router;
