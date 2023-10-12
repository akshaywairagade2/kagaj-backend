const bcrypt = require('bcrypt')
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const Issue = require("../models/issue")


exports.createissue = async (req, res) => {


    const { username, emailId, filename, description, status, link } = req.body;
    console.log(username, emailId, filename, description)

    if (!username || !emailId || !filename || !description) {
        return res.status(400).json({ msg: "Please Enter all the Fields" });
    }

    const file = await Issue.findOne({ filename });

    if (file) {
        return res.status(400).send("This issue is already created");
    }

    try {
        const issue = await Issue.create({
            username,
            emailId,
            filename,
            description,
            status,
            link

        });

        if (issue) {

            return res.status(201).json({
                msg: "Issue Created Successfully",
                Issue: {
                    _id: issue._id,
                    username: issue.username,
                    emailId: issue.emailId,
                    filename: issue.filename,
                    description: issue.description,
                    status: "pending"
                }
            });
        } else {
            return res.status(400).send("Unable to create Issue");
        }

    } catch (error) {
        console.log("error found")
    }

};


exports.AllIssues = async (req, res) => {

    try {
        const issue = await Issue.find({});

        if (issue) {

            return res.status(201).json({
                msg: "Issue fetched Successfully",
                Issue: issue
            });
        } else {
            return res.status(400).send("Unable to Fetch Issues");
        }

    } catch (error) {
        console.log("error found")
    }

};


exports.GetAllByEmail = async (req, res) => {

    const { emailid } = req.body;

    try {
        const issue = await Issue.find({ emailId: emailid });

        if (issue) {

            return res.status(201).json({
                msg: "Issue fetched Successfully",
                Issue: issue
            });
        } else {
            return res.status(400).send("Unable to Fetch Issues");
        }

    } catch (error) {
        console.log("error found")
    }

};


exports.SubmitFile = async (req, res) => {


    const { url, id } = req.body;

    if (!url || !id) {
        return res.status(400).json({ msg: "Please Upload File" });
    }

    try {
        const issue = await Issue.findOne({ _id: id });
        if (!issue) {
            return res.status(400).json({ msg: "Issue not found" });
        }
        else {
            const UpdatedIssue = await Issue.findByIdAndUpdate({ _id: id }, {
                status: "Submitted",
                link: url
            });
            console.log('UpdatedIssue', UpdatedIssue);
            return res.status(200).json({ msg: "Issue Resolved Successfully" });
        }

    } catch (error) {
        console.log("error found")
    }

};


exports.RejectFile = async (req, res) => {


    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "Please Select Id" });
    }

    try {
        const issue = await Issue.findOne({ _id: id });
        if (!issue) {
            return res.status(400).json({ msg: "Issue not found" });
        }
        else {
            const UpdatedIssue = await Issue.findByIdAndUpdate({ _id: id }, {
                status: "Rejected"
            });
            console.log('UpdatedIssue', UpdatedIssue);
            return res.status(200).json({ msg: "Issue Rejected Successfully" });
        }

    } catch (error) {
        console.log("error found")
    }

};
