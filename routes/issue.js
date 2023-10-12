const express = require('express')
const { createissue, AllIssues, SubmitFile, RejectFile, GetAllByEmail } = require("../controllers/createissue")

const router = express.Router();

router.post('/createissue', createissue);
router.post('/submitted', SubmitFile);
router.post('/rejected', RejectFile);
router.get('/getall', AllIssues);
router.post('/getallbyemail', GetAllByEmail);


module.exports = router;
