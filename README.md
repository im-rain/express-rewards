# express-rewards
A simple rewards api built using Express js.
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# execute test
npm run test

```
### Data Storing
Generated rewards are persisted in a json files in src/files folder.  
Filename is the date of sunday of the week where the requested reward date belongs:  
Ex. /users/1/rewards?at=2020-03-19T12:00:00Z.  
User 1 rewards from 2020-03-15T00:00:00Z to 2020-03-21T00:00:00Z is generated.  
since 2020-03-15T00:00:00Z is sunday, data will be stored in 2020-03-15.json with user as key.  
#### 2020-03-15.json
```json
{
    "1": {
        "data": [
            {
                "availableAt": "2020-03-15T00:00:00Z",
                "redeemedAt": null,
                "expiresAt": "2020-03-16T00:00:00Z"
            },
            {
                "availableAt": "2020-03-16T00:00:00Z",
                "redeemedAt": null,
                "expiresAt": "2020-03-17T00:00:00Z"
            },
            {
                "availableAt": "2020-03-17T00:00:00Z",
                "redeemedAt": null,
                "expiresAt": "2020-03-18T00:00:00Z"
            },
            {
                "availableAt": "2020-03-18T00:00:00Z",
                "redeemedAt": null,
                "expiresAt": "2020-03-19T00:00:00Z"
            },
            {
                "availableAt": "2020-03-19T00:00:00Z",
                "redeemedAt": null,
                "expiresAt": "2020-03-20T00:00:00Z"
            },
            {
                "availableAt": "2020-03-20T00:00:00Z",
                "redeemedAt": null,
                "expiresAt": "2020-03-21T00:00:00Z"
            },
            {
                "availableAt": "2020-03-21T00:00:00Z",
                "redeemedAt": null,
                "expiresAt": "2020-03-22T00:00:00Z"
            }
        ]
    }
}
```
### API Test
``` bash
Generate reward
http://localhost:8081/users/[user]/rewards?at=[date(YYYY-MM-DDThh:mm:ssZ)]
Redeem reward
http://localhost:8081/users/[user]/rewards/[date(YYYY-MM-DDThh:mm:ssZ)]/redeem

```

## Source Info
``` bash
#Express api source structure
.
├── src                                 (source folder)
│   ├── api                  
│   │    ├── controller                 
│   │    │   ├── [controller1].js       (api module controller. ex.reward controller)
│   │    │   ├── [controller2].js 
│   │    │   └── index.js               (export all controllers to app.js)
│   │    ├── model
│   │    │   ├── [model1].js            (object model)
│   │    │   └── [model2].js
│   │    ├── service
│   │    │   ├── [service1].js          (logic and data processing modules ex.reward service) 
│   │    │   └── [service2].js 
│   │    └── utilities
│   │        ├── [util1].js             (common utilities. ex.fileUtil -handles file processing)
│   │        └── [util2].js
│   └── files                           (app file storage)
├── test                                (app entry point)
│   ├── files                           (test file storage)
│   └── [test1].js                      (module test ex.rewardTest)
├── app.js                              (app entry point)
├── package.json
└── README.md

```
