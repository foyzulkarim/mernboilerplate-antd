const express = require("express");
const jwt = require("jsonwebtoken");
const { handleValidation } = require("../../common/middlewares");
const { validateRegistration, validateUsername } = require("./request");
const {
  createUser,
  checkUser,
  searchOne,
  changePassword,
} = require("./service");
// import { search as searchPermissions } from "../services/permission-service";

const router = express.Router();

const createUserHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const id = await createUser(user);
    res
      .status(201)
      .send({ status: "ok", message: "User created successfully", id });
  } catch (error) {
    next(error);
  }
};

const loginHandler = async (req, res) => {
  if (req.body.username && req.body.password) {
    const user = await checkUser(req.body.username, req.body.password);
    if (user) {
      // console.log("user", user);
      // const permissions = await searchPermissions({ roleId });
      const token = jwt.sign(
        {
          id: user._id,
          username: req.body.username,
          exp:
            Math.floor(Date.now() / 1000) +
            parseInt(process.env.JWT_EXPIRES_IN),
        },
        process.env.JWT_SECRET
      );
      const { passwordHash, ...rest } = user;

      const antdPayload = {
        status: "ok",
        type: "account",
        currentAuthority: "admin",
        user: rest,
        accessToken: token,
        userInfo: {
          name: "Serati Ma",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
          userid: "00000001",
          email: "antdesign@alipay.com",
          signature: "海纳百川，有容乃大",
          title: "交互专家",
          group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
          tags: [
            {
              key: "0",
              label: "很有想法的",
            },
            {
              key: "1",
              label: "专注设计",
            },
            {
              key: "2",
              label: "辣~",
            },
            {
              key: "3",
              label: "大长腿",
            },
            {
              key: "4",
              label: "川妹子",
            },
            {
              key: "5",
              label: "海纳百川",
            },
          ],
          notifyCount: 12,
          unreadCount: 11,
          country: "China",
          access: "admin",
          geographic: {
            province: {
              label: "浙江省",
              key: "330000",
            },
            city: {
              label: "杭州市",
              key: "330100",
            },
          },
          address: "西湖区工专路 77 号",
          phone: "0752-268888888",
        },
      };

      res.status(200).send(antdPayload);
      return;
    }
  }

  res.status(400).send("Invalid username or password xyz");
};

const forgotPasswordHandler = async (req, res) => {
  if (req.body.email) {
    const user = await searchOne({ email: req.body.email });
    if (user) {
      const newPassword = "a123"; // we will replace this and set from random string when we have the email service
      await changePassword(user, newPassword);
      res.status(200).send("Password changed successfully");
      return;
    }
  }

  res.status(400).send("Invalid email");
};

const checkUsernameHandler = async (req, res) => {
  const user = await searchOne({ username: req.body.username.toLowerCase() });
  if (user) {
    res
      .status(400)
      .send({ status: "unavailable", message: "Username is taken" });
    return;
  }
  return res
    .status(200)
    .send({ status: "available", message: "Username is available" });
};

router.post(
  "/register",
  handleValidation(validateRegistration),
  createUserHandler
);
router.post("/login", loginHandler);
router.post("/forgotPassword", forgotPasswordHandler);
router.post(
  "/check-username",
  handleValidation(validateUsername),
  checkUsernameHandler
);

module.exports = router;
