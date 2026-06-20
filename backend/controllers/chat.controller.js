const { generate } = require("../services/ai.service");

const chat = async (req, res) => {
  try {
    console.log("Controller started");
    const { message, threadId } = req.body;

    console.log("Before generate");

    const response = await generate(message, threadId || "default-thread");
    console.log("response=====>", response);
    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  chat,
};
