---
layout: post
title:  "Participating to the Symbl.ai Summarization API Challenge"
date:   2021/12/28
tags: 	symblai rest api ai
---

![Win a Pair of AirPods Pro](https://blog.symbl.ai/wp-content/uploads/2021/12/summarization-api-challenge-blog-banner-1.jpg.webp)

A few days ago I got an email which turned on my attention

<!-- # Trying symbl.ai (gmacario@gmail.com) -->

<https://platform.symbl.ai/>

<!-- (2021-12-26 19:10 CET) -->

Click "Sign in with Google"

* email: gmacario@gmail.com

<https://platform.symbl.ai/#/home>

> **Welcome Gianpaolo Macario!**
>
> Try out our APIs without running any code
>
> [Try API Playground](TODO)

## Authentication

<!-- (2021-12-28 15:12 CET) -->

<!--
Adapted from
https://docs.symbl.ai/docs/developer-tools/authentication/
-->

### Step 1: Get your API Credentials

1. Log into [Symbl Platform](https://platform.symbl.ai/?_ga=2.115339207.1500322423.1640600236-591899878.1639034488).

2. From the homepage, copy your **App ID** and **App Secret**.

### Step 2: Generate the Access Token

Once you have your API Credentials, you can generate the Access Token and use it in the API Authorization.

To generate the Access Token, make a POST request to the endpoint: <https://api.symbl.ai/oauth2/token:generate>

You must send your App ID and Secret in the request body. See the sample requests below:

```bash
APP_ID=xxx
APP_SECRET=yyy

curl -k -X POST "https://api-labs.symbl.ai/oauth2/token:generate" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d $'{
      "type" : "application",
      "appId": "'$APP_ID'",
      "appSecret": "'$APP_SECRET'"
    }'
```

On successful completion, the success message appears as shown below:

```json
{
   "accessToken": "your_accessToken",
   "expiresIn": 86400
}
```

## POST Video API

<!-- (2021-12-28 15:26 CET) -->

<!--
Adapted from
https://docs.symbl.ai/docs/async-api/overview/video/post-video/
-->

Logged as `gpmacario@hw2457` open a Git Bash shell and type the following commands

```bash
AUTH_TOKEN=zzz

curl --location --request POST "https://api-labs.symbl.ai/v1/process/video?name=Business%20Meeting&customVocabulary=%5B%22Platform%22,%22Discussion%22,%22Targets%22%5D&confidenceThreshold=0.6&detectPhrases=true&languageCode=en-US&enableSummary=true" \
--header 'Content-Type: video/mp4' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-binary '@/C/Users/gpmacario/symblaitest/YT-aXlcNVKK-7Q.mp4'
```

Result:

```text
gpmacario@HW2457 MINGW64 ~
$ curl --location --request POST "https://api-labs.symbl.ai/v1/process/video?name=Business%20Meeting&customVocabulary=%5B%22Platform%22,%22Discussion%22,%22Targets%22%5D&confidenceThreshold=0.6&detectPhrases=true&languageCode=en-US&enableSummary=true" \
> --header 'Content-Type: video/mp4' \
> --header "Authorization: Bearer $AUTH_TOKEN" \
> --data-binary '@/C/Users/gpmacario/symblaitest/YT-aXlcNVKK-7Q.mp4'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 43.1M  100    84  100 43.1M      3  1794k  0:00:28  0:00:24  0:00:04    25{"conversationId":"5312972177014784","jobId":"9a80e847-93e7-43ee-b659-e791e476adc4"}

gpmacario@HW2457 MINGW64 ~
$
```

When the video is finished processing, you can extract summarization by making a simple REST endpoint call to `GET https://api-labs.symbl.ai/v1/conversations/{conversationId}/summary`.
Below is a code snippet in JavaScript with the ‘request’ module.

```bash
CONVERSATION_ID=cccc

curl --location --request GET "https://api-labs.symbl.ai/v1/conversations/$CONVERSATION_ID/summary" \
--header "Authorization: Bearer $AUTH_TOKEN"
```

Result:

```text
gpmacario@HW2457 MINGW64 ~
$ curl --location --request GET "https://api-labs.symbl.ai/v1/conversations/$CONVERSATION_ID/summary" \
> --header "Authorization: Bearer $AUTH_TOKEN"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:15 --:--:--     0


  0     0    0     0    0     0      0      0 --:--:--  0:00:54 --:--:--     0{"summary":[{"id":"4863791679406080","text":"Speaker is talking about the new models of the Raspberry Pi computer that were released yesterday.","messageRefs":[{"id":"5273893544656896"},{"id":"6277001208922112"},{"id":"5830617540329472"},{"id":"4639929058459648"},{"id":"4609896164098048"},{"id":"5970325914255360"},{"id":"6247729530404864"},{"id":"4770329231622144"}]},{"id":"4637176722620416","text":"Speaker will walk you through these boards and explain why they're not replacements for the computer modules. Speaker's computer module has a lot in common with the computer module for, but the rad.cm3 has a leg up because of the extra hundred pin connector. Speaker's k35 66 is slower than the pies chip for most things. Speaker compares the Rockchip with the pie. Speaker will link to both devices in the description if you want to dig into the full specs. Speaker ordered the rock chip and the so-called pie. Both boards are in stock, but Speaker can't get them to boot into a usable State. Speaker is having problems with their computer. they can't use USB keyboard or Mouse to do anything with it and even after reflashing the emmc, they still can't get the thing to boot. There's no getting started guide yet. There is a working image Speaker had problems with their Rock chip. The chip uses a non-standard 1.5 million bit rate for serial. There is precious little documentation and what there is usually targets developers and the images you download are scattered, Wiki Pages or in random links passed around on Discord. Speaker uses the Raspberry Pi more often than the other boards because every time they start working on a project with something that's not a pie, they spend more time trying to figure out how to get simple things working to tied to the project itself. Speaker is in love with pie There was a post on cnx software about issues getting Linux working with a Mini PC. Speaker is aware of similar issues. It takes a lot of effort to build and maintain Linux images and even Raspberry Pi themselves struggle to keep up sometimes. Pine 64 has only officially launched Port 10s Raspberry Pi OS. The software for the so-called quartz is still in early development and it will be months before people can reliably deploy it. Speaker thinks the reason Raspberry Pi is successful is not the price or the specs, but","messageRefs":[{"id":"5483005905731584"},{"id":"4869626325368832"},{"id":"6044424904638464"},{"id":"6435955868172288"},{"id":"5121319931740160"},{"id":"4516894351556608"},{"id":"6218576701685760"},{"id":"5253039330951168"},{"id":"4707234215886848"},{"id":"6487255897079808"},{"id":"5735796070940672"},{"id":"5648211487227904"},{"id":"5791084648071168"},{"id":"4919113475424256"},{"id":"5742029813317632"},{"id":"6567707236368384"},{"id":"5629551733374976"},{"id":"5716910965522432"},{"id":"6607083790139392"},{"id":"4715844685791232"},{"id":"6709442977464320"},{"id":"5409022443257856"},{"id":"4658849127596032"},{"id":"5228134694649856"},{"id":"6539725734150144"},{"id":"5162254124187648"},{"id":"5061369536708608"},{"id":"4737967257026560"},{"id":"4889809249107968"},{"id":"5323636983463936"},{"id":"5477163793907712"},{"id":"6375028519075840"},{"id":"6118148152492032"},{"id":"6482703231746048"},{"id":"5349642943332352"},{"id":"6218185725444096"},{"id":"4791439801188352"},{"id":"5206577247158272"},{"id":"6450628415979520"},{"id":"5341509550342144"},{"id":"4559241051373568"},{"id":"4848282955153408"},{"id":"6198818040184832"},{"id":"6565429133705216"},{"id":"5085261533806592"},{"id":"5406504015364096"},{"id":"6691960480858112"},{"id":"5582209810432000"},{"id":"6338207110135808"},{"id":"5338069818408960"},{"id":"5870785617985536"},{"id":"6534922350100480"},{"id":"5787327155666944"},{"id":"6314687869222912"},{"id":"5482493328228352"},{"id":"6439216805314560"},{"id":"6402375263715328"},{"id":"6301779680559104"},{"id":"6119190353149952"},{"id":"5444732311306240"},{"id":"6750936488738816"},{"id":"4742488515411968"},{"id":"4720119453319168"},{"id":"6361733196152832"100  5447  100  5447    0     0     99      0  0:00:55  0:00:54  0:00:01  1256id":"6553546938908672"},{"id":"6467409457184768"},{"id":"6396772638261248"},{"id":"5305565271031808"},{"id":"5307835664564224"},{"id":"5423737840074752"},{"id":"5778178472673280"},{"id":"5768597105278976"},{"id":"4811480387026944"},{"id":"6433735571406848"},{"id":"6541566832279552"},{"id":"5138198985441280"},{"id":"5394199873585152"},{"id":"4948640301842432"},{"id":"5611623734575104"},{"id":"5122949251072000"},{"id":"4844443908702208"},{"id":"4678390155051008"},{"id":"4777496441520128"},{"id":"4696663093411840"},{"id":"5289137188896768"},{"id":"5786159125889024"}]},{"id":"6139871157551104","text":"Speaker is working on the cm3 and so courts. The cm3 should be shipped sometime this month and the so quartz is already for sale on Pine 64 store. Speaker wants to see more about these boards in the future.","messageRefs":[{"id":"5488772234870784"},{"id":"5159546751287296"},{"id":"5413340730884096"},{"id":"5826772135313408"},{"id":"6541493213855744"},{"id":"5175408568827904"},{"id":"5060034573631488"},{"id":"6291289256493056"},{"id":"4653115883126784"},{"id":"4778805886451712"},{"id":"5514061337853952"},{"id":"5891741904273408"},{"id":"5768225825488896"},{"id":"5026360687853568"},{"id":"5974182861996032"},{"id":"6590639987752960"},{"id":"4569709144965120"},{"id":"6657461424488448"},{"id":"5870049567965184"},{"id":"6431465177874432"}]}]}

gpmacario@HW2457 MINGW64 ~
$
```

FIXME

TODO

```javascript
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = ddd;
request({
    url: `https://api-labs.symbl.ai/v1/conversations/{conversationId}/summary`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

TODO

<!-- EOF -->