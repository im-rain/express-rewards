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
## Test
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
