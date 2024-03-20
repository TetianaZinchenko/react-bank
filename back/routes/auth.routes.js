const Router = require("express").Router;
const router = new Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authMiddleware = require("../middleware/auth.middleware");

const users = [];
let id = 0;
let transactionId = 0;

// =============================================================================

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const registeringUser = users.find((user) => user.email === email);

    if (registeringUser) {
      return res.status(400).json({
        message: "A user with the same email is already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const confirmationCode = Math.floor(
      Math.random() * (1000000 - 100000) + 100000
    );

    const newUser = {
      email,
      password: hashPassword,
      isConfirmed: false,
      confirmationCode,
      id: (id += 1),
      userData: {
        balance: 0,
        notifications: [],
        transactions: [],
      },
    };

    const secretKey = "project";
    const token = jwt.sign({ id: newUser.id }, secretKey);
    newUser.token = token;

    console.log("users_before: ", users);

    users.push(newUser);

    console.log("users_after: ", users);

    return res.status(200).json({
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.post("/confirm", async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = users.find((user) => user.email === email);

    if (user.confirmationCode !== Number(code)) {
      return res.status(400).json({ message: "Invalid Code" });
    } else {
      user.isConfirmed = true;
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    let time = new Date().toISOString();
    user.userData.notifications.unshift({ type: "Login", time });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = users.find((user) => user.id === req.user.id);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.post("/recovery", async (req, res) => {
  try {
    const { email } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recoveryCode = Math.floor(
      Math.random() * (1000000 - 100000) + 100000
    );

    user.recoveryCode = recoveryCode;
    emailToRecover = user.email;
    let time = new Date().toISOString();
    user.userData.notifications.unshift({ type: "Recovery", time });

    return res.status(200).json({
      recoveryCode,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.post("/recovery-confirm", async (req, res) => {
  try {
    const { password, code } = req.body;

    const user = users.find((user) => user.email === emailToRecover);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.recoveryCode !== Number(code)) {
      return res.status(404).json({ message: "Invalid code" });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    user.password = hashPassword;

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.post("/receive", authMiddleware, async (req, res) => {
  try {
    const { sum, paymentSystem } = req.body;

    const user = users.find((user) => user.id === req.user.id);

    if (sum < 1) {
      return res.status(400).json({ message: "Sum can't be less than 1$" });
    }

    user.userData.balance += +sum;
    let time = new Date().toISOString();
    const id = (transactionId += 1);
    user.userData.notifications.unshift({ type: "Recieve", time });

    user.userData.transactions.unshift({
      type: "Recieve",
      time,
      sum: `+$${parseFloat(sum).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      paymentSystem,
      transactionId,
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

let emailToRecover = "";

// =============================================================================

router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { email, sum } = req.body;

    const user = users.find((user) => user.id === req.user.id);

    const receiver = users.find((user) => user.email === email);

    if (receiver === user) {
      return res.status(400).json({ message: "Can't send to yourself" });
    }

    if (!receiver) {
      return res.status(400).json({ message: "No such user found" });
    }

    if (user.userData.balance < sum) {
      return res.status(400).json({ message: "Not enough funds" });
    }

    user.userData.balance = user.userData.balance - sum;
    receiver.userData.balance = receiver.userData.balance + +sum;
    let time = new Date().toISOString();
    user.userData.notifications.unshift({ type: "Send", time });
    receiver.userData.notifications.unshift({ type: "Recieve", time });
    const id = (transactionId += 1);

    user.userData.transactions.unshift({
      type: "Send",
      sum: `-$${parseFloat(sum).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      email,
      time,
      transactionId,
    });

    receiver.userData.transactions.unshift({
      type: "Receive",
      sum: `+$${parseFloat(sum).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      email: user.email,
      time,
      transactionId,
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.post("/changeEmail", authMiddleware, async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = users.find((user) => user.id === req.user.id);

    const emailIsBusy = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (emailIsBusy) {
      return res.status(400).json({ message: "Email is busy" });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    user.email = email;
    let time = new Date().toISOString();
    user.userData.notifications.unshift({ type: "EmailChange", time });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// =============================================================================

router.post("/changePassword", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = users.find((user) => user.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassValid = bcrypt.compareSync(oldPassword, user.password);

    if (!isPassValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashPassword;
    let time = new Date().toISOString();
    user.userData.notifications.unshift({ type: "PasswordChange", time });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
