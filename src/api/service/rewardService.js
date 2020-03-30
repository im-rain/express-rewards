const fileUtil = require('../utilities/fileUtil');
const dateUtil = require('../utilities/dateUtil');
const constants = require('../utilities/constants');
const RewardModel = require('../model/reward');
const CustomError = require('../model/error');


/**
 * Service for reward processing.
 */
var rewardService = {
    /**
     * Generate and fetch reward for user at specific date
     * @param user User ID
     * @param date The date when the reward is fetched
     */
    generateFetchReward:(user, date) => {
        //Get start date(YYYY-MM-DD 00:00:00) from request dateTime
        var availDate = dateUtil.resetTime(new Date(date));
        var expDate  = dateUtil.resetTime(new Date(date));
        
        //Get the date before start date of the week
        availDate.setDate(availDate.getDate() - (availDate.getDay() +1));
        expDate.setDate(availDate.getDate() + 1);

        //Filename where data is stored. (start date of the week [YYYY-MM-DD].json)
        var filename = dateUtil.formatDate(expDate, constants.DATE_ONLY_FORMAT) + constants.JSON_FILE_EX;
        
        //Check if storage file for start date exist
        if(fileUtil.isExist(filename)){
            var content = JSON.parse(fileUtil.read(filename));
            //Check if user exist
            if(content[user]){
                return content[user];
            } else {
                //Generate reward for the user
                content[user] ={data: rewardService.generateReward(availDate, expDate)};
                fileUtil.write(filename,JSON.stringify(content, null, 4));
                return content[user];
            }
        } else {
            var content = {};
            //Generate reward for the user
            content[user]= {data: rewardService.generateReward(availDate, expDate)};
            fileUtil.write(filename,JSON.stringify(content, null, 4));
            return content[user];
        }

    },

    /**
     * Generate reward for a user
     * @param availDate Day before start day of the week
     * @param expDate Start day of the week
     */
    generateReward:(availDate, expDate) => {
        var reward;
        var rewardList = [];

        for(var index = 0; index<=6 ;index++){
            //Add 1 day of availDate and expiry date
            availDate.setDate(availDate.getDate() + 1);
            expDate.setDate(expDate.getDate() + 1);
            
            reward = new RewardModel();
            //map dates to reward model
            reward.availableAt = dateUtil.formatDate(availDate, constants.ISO_DATE_FORMAT);
            reward.expiresAt =  dateUtil.formatDate(expDate, constants.ISO_DATE_FORMAT);
            rewardList.push(reward);
        }
        return rewardList;
    },

    /**
     * Redeem reward for a specific date
     * @param user User ID
     * @param date The date of reward to redeem 
     */
    reedeemReward:(user,date) => {
        var availDate = dateUtil.formatDate(new Date(date), constants.ISO_DATE_FORMAT);
        var storageDate = new Date(date);
        
        //Get storage filenanme
        storageDate.setDate(storageDate.getDate() - storageDate.getDay());
        var filename = dateUtil.formatDate(storageDate, constants.DATE_ONLY_FORMAT) + constants.JSON_FILE_EX;

        if(fileUtil.isExist(filename)){
            var content = JSON.parse(fileUtil.read(filename));

            if(content[user]) {
                var rewardList = content[user].data;
                var itemIdx;
                var reward;

                for(var i in rewardList){
                    if(rewardList[i].availableAt === availDate){
                        itemIdx = i;
                        reward = rewardList[i];
                        break;
                    }
                }

                //Check if reward is found for that avail date
                if(reward){
                    var curDate = new Date();
                    var expDate = new Date(reward.expiresAt);
                    
                    //Check if current day is lesser than expiry date
                    if(curDate < expDate){
                        //If already redeem dont update redeem time
                        if(!reward.redeemedAt) {
                            reward.redeemedAt = dateUtil.formatDate(curDate, constants.ISO_DATE_FORMAT);
                        }
                    } else {
                        throw new CustomError(constants.REWARD_EXPIRED, constants.STAT_BAD_REQ);
                    }
                } else {
                    throw new CustomError(constants.REWARD_EXPIRED, constants.STAT_BAD_REQ);
                }

                //re-read file in case there is an update
                content = JSON.parse(fileUtil.read(filename));
                //update edited part of the content 
                content[user].data[itemIdx] = reward;
                //update the file content 
                fileUtil.write(filename,JSON.stringify(content, null, 4));
                return {data:reward};
            }
        }

        throw new CustomError(constants.REWARD_EXPIRED, constants.STAT_BAD_REQ);
    }
}

module.exports = rewardService;