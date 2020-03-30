const express = require("express");
const service = require("../service/rewardService");
const dateUtil = require('../utilities/dateUtil');
const constants = require('../utilities/constants');
const  CustomError = require('../model/error');


var router = express.Router();

/**
 * Generate and fetch reward for user at specific date
 * @param userId User ID
 * @query at The date when the reward is fetched
 */
router.get('/users/:userId/rewards', (req, res) => {
    if(req.params.userId && dateUtil.isValidDate(req.query.at)){
        var response = service.generateFetchReward(req.params.userId, req.query.at);
        res.json(response);
    } else {
        throw new CustomError(constants.INVALID_PARAMETER, constants.STAT_BAD_REQ);
    }
});

/**
 * Redeem reward for a specific date
 * @param userId User ID
 * @param rewardDate The date of reward to redeem 
 */
router.patch('/users/:userId/rewards/:rewardDate/redeem', (req, res) => {
    if(req.params.userId && dateUtil.isValidDate(req.params.rewardDate)){
        var response = service.reedeemReward(req.params.userId, req.params.rewardDate);
        res.json(response);
    } else {
        throw new CustomError(constants.INVALID_PARAMETER, constants.STAT_BAD_REQ);
    }
});

module.exports = router;