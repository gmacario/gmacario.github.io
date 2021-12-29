---
layout: post
title:  "Participating to the Symbl.ai Summarization API Challenge"
date:   2021/12/28
tags: 	symblai rest api ai
---

![Win a Pair of AirPods Pro](https://blog.symbl.ai/wp-content/uploads/2021/12/summarization-api-challenge-blog-banner-1.jpg.webp)

A few days ago I got an email which turned on my attention

> Come participate in the Symbl.ai Summarization API Challenge
> throughout the month of December for a chance to win a pair of AirPods Pro!
> The challenge takes 5 minutes...

You may find the long story in the [this recent post on the Symbl.ai blog](https://blog.symbl.ai/blog/win-a-pair-of-airpods-pro-symbl-ai-summarization-api-challenge/).
In a nutshell, the company wants to collect feedbacks on their recently announced Summarization API and asked people to submit their favorite video, query the API and tweet the result.
In return, they will have a chance of winning a pair of [AirPods Pro](https://www.apple.com/airpods-pro/).

I have to admit the my initial motivation to join the contest was to try and win the gadget, but after walking through the instructions I realized that the actual prize I won is that I have discovered quite a nifty API.

If you want to win my same prize, preas read along!

## Sign in to Symbl.ai

<!-- # Trying symbl.ai (gmacario@gmail.com) -->

First of all you must sign in to <https://platform.symbl.ai/>.
If you don't have an account yet, you may create one for free -- no credit cards are required for the trial, which is good!

<!-- (2021-12-26 19:10 CET) -->

I created my account using my Gmail address, therefore I can sign in just by clicking the "Sign in with Google" icon on the page.

Once authenticated, I will get redirected to <https://platform.symbl.ai/#/home>

> **Welcome Gianpaolo Macario!**
>
> Try out our APIs without running any code
>
> [Try API Playground](TODO)

While logged on the platform I reviewed the
[Summarization](https://docs.symbl.ai/docs/concepts/summarization?_ga=2.214827991.1500322423.1640600236-591899878.1639034488)
and [POST Video API](https://docs.symbl.ai/docs/async-api/overview/video/post-video?_ga=2.214827991.1500322423.1640600236-591899878.1639034488) Docs as suggested.

## Submit your favourite video

For the purpose of testing the Summarization APIs I chose [this recent YouTube video from Jeff Geerling](https://www.youtube.com/watch?v=aXlcNVKK-7Q):

[![Can these boards replace the Raspberry Pi CM4?](https://img.youtube.com/vi/aXlcNVKK-7Q/0.jpg)](https://www.youtube.com/watch?v=aXlcNVKK-7Q "Can these boards replace the Raspberry Pi CM4?")

Jeff is one of my favourite video bloggers who regularly talks about Raspberry Pi, Docker, Ansible, home automation and stuff like that.
If you haven't done yet, I definitely recommend you to check [Jeff Geerling's YouTube channel](https://www.youtube.com/channel/UCR-DXc1voovS8nhAvccRZhg).

Unfortunately as of today the Symbl.ai POST Video API only accept `*.mp4` files, so after trying other tools with little success I eventually used the [youtube-dl](https://youtube-dl.org/) tool to fetch the video from YouTube and convert it to the required format.

It was as easy as typing the following commands on one of my Ubuntu hosts:

```bash
sudo snap install youtube-dl
youtube-dl https://www.youtube.com/watch?v=aXlcNVKK-7Q
```

**DISCLAIMER**: Yes, I know that online videos are meant to be streamed in order to provide advertising
and such. I made this just to experiment with the Symbl.ai Summarization API and I guess I did not violate any YouTube or video author copyrights.
If anyone believes differently please get in touch with me and I will amend the instructions above.

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

To generate the Access Token, make a POST request to the endpoint: <https://api-labs.symbl.ai/oauth2/token:generate>

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

Type the following commands from a Bash shell:

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

The [post at blog.symbl.ai](https://blog.symbl.ai/blog/win-a-pair-of-airpods-pro-symbl-ai-summarization-api-challenge/) provides a code snippet in JavaScript with the ‘request’ module which unfortunately does not seem to work properly.

Instead I just resorted to the good old [curl](https://curl.se/) tool:

```bash
CONVERSATION_ID=cccc

curl --location --request GET "https://api-labs.symbl.ai/v1/conversations/$CONVERSATION_ID/summary" \
--header "Authorization: Bearer $AUTH_TOKEN" -o result.json
```

Result:

```text
gpmacario@HW2457 MINGW64 ~
$ curl --location --request GET "https://api-labs.symbl.ai/v1/conversations/$CONVERSATION_ID/summary" --header "Authorization: Bearer $AUTH_TOKEN" -o result.json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  5447  100  5447    0     0   5138      0  0:00:01  0:00:01 --:--:--  5138

gpmacario@HW2457 MINGW64 ~
$
```

Inspect `result.json`:

```text
$ cat result.json
{"summary":[{"id":"4863791679406080","text":"Speaker is talking about the new models of the Raspberry Pi
 computer that were released yesterday.","messageRefs":[{"id":"5273893544656896"},{"id":"6277001208922112"},
{"id":"5830617540329472"},{"id":"4639929058459648"},{"id":"4609896164098048"},{"id":"5970325914255360"},
{"id":"6247729530404864"},{"id":"4770329231622144"}]},{"id":"4637176722620416","text":"Speaker will walk you
 through these boards and explain why they're not replacements for the computer modules. Speaker's computer
 module has a lot in common with the computer module for, but the rad.cm3 has a leg up because of the extra
 hundred pin connector. Speaker's k35 66 is slower than the pies chip for most things. Speaker compares the
 Rockchip with the pie. Speaker will link to both devices in the description if you want to dig into the full
 specs. Speaker ordered the rock chip and the so-called pie. Both boards are in stock, but Speaker can't get
 them to boot into a usable State. Speaker is having problems with their computer. they can't use USB
 keyboard or Mouse to do anything with it and even after reflashing the emmc, they still can't get the thing
 to boot. There's no getting started guide yet. There is a working image Speaker had problems with their Rock
 chip. The chip uses a non-standard 1.5 million bit rate for serial. There is precious little documentation
 and what there is usually targets developers and the images you download are scattered, Wiki Pages or in
 random links passed around on Discord. Speaker uses the Raspberry Pi more often than the other boards
 because every time they start working on a project with something that's not a pie, they spend more time
 trying to figure out how to get simple things working to tied to the project itself. Speaker is in love with
 pie There was a post on cnx software about issues getting Linux working with a Mini PC. Speaker is aware of
 similar issues. It takes a lot of effort to build and maintain Linux images and even Raspberry Pi themselves
 struggle to keep up sometimes. Pine 64 has only officially launched Port 10s Raspberry Pi OS. The software
 for the so-called quartz is still in early development and it will be months before people can reliably
 deploy it. Speaker thinks the reason Raspberry Pi is successful is not the price or the specs, but",
"messageRefs":[{"id":"5483005905731584"},{"id":"4869626325368832"},{"id":"6044424904638464"},
{"id":"6435955868172288"},{"id":"5121319931740160"},{"id":"4516894351556608"},{"id":"6218576701685760"},
{"id":"5253039330951168"},{"id":"4707234215886848"},{"id":"6487255897079808"},{"id":"5735796070940672"},
{"id":"5648211487227904"},{"id":"5791084648071168"},{"id":"4919113475424256"},{"id":"5742029813317632"},
{"id":"6567707236368384"},{"id":"5629551733374976"},{"id":"5716910965522432"},{"id":"6607083790139392"},
{"id":"4715844685791232"},{"id":"6709442977464320"},{"id":"5409022443257856"},{"id":"4658849127596032"},
{"id":"5228134694649856"},{"id":"6539725734150144"},{"id":"5162254124187648"},{"id":"5061369536708608"},
{"id":"4737967257026560"},{"id":"4889809249107968"},{"id":"5323636983463936"},{"id":"5477163793907712"},
{"id":"6375028519075840"},{"id":"6118148152492032"},{"id":"6482703231746048"},{"id":"5349642943332352"},
{"id":"6218185725444096"},{"id":"4791439801188352"},{"id":"5206577247158272"},{"id":"6450628415979520"},
{"id":"5341509550342144"},{"id":"4559241051373568"},{"id":"4848282955153408"},{"id":"6198818040184832"},
{"id":"6565429133705216"},{"id":"5085261533806592"},{"id":"5406504015364096"},{"id":"6691960480858112"},
{"id":"5582209810432000"},{"id":"6338207110135808"},{"id":"5338069818408960"},{"id":"5870785617985536"},
{"id":"6534922350100480"},{"id":"5787327155666944"},{"id":"6314687869222912"},{"id":"5482493328228352"},
{"id":"6439216805314560"},{"id":"6402375263715328"},{"id":"6301779680559104"},{"id":"6119190353149952"},
{"id":"5444732311306240"},{"id":"6750936488738816"},{"id":"4742488515411968"},{"id":"4720119453319168"},
{"id":"6361733196152832"},{"id":"6644085621260288"},{"id":"6608393235070976"},{"id":"5717658692485120"},
{"id":"6553546938908672"},{"id":"6467409457184768"},{"id":"6396772638261248"},{"id":"5305565271031808"},
{"id":"5307835664564224"},{"id":"5423737840074752"},{"id":"5778178472673280"},{"id":"5768597105278976"},
{"id":"4811480387026944"},{"id":"6433735571406848"},{"id":"6541566832279552"},{"id":"5138198985441280"},
{"id":"5394199873585152"},{"id":"4948640301842432"},{"id":"5611623734575104"},{"id":"5122949251072000"},
{"id":"4844443908702208"},{"id":"4678390155051008"},{"id":"4777496441520128"},{"id":"4696663093411840"},
{"id":"5289137188896768"},{"id":"5786159125889024"}]},{"id":"6139871157551104","text":"Speaker is working on
 the cm3 and so courts. The cm3 should be shipped sometime this month and the so quartz is already for sale
 on Pine 64 store. Speaker wants to see more about these boards in the future.","messageRefs":[
{"id":"5488772234870784"},{"id":"5159546751287296"},{"id":"5413340730884096"},{"id":"5826772135313408"},
{"id":"6541493213855744"},{"id":"5175408568827904"},{"id":"5060034573631488"},{"id":"6291289256493056"},
{"id":"4653115883126784"},{"id":"4778805886451712"},{"id":"5514061337853952"},{"id":"5891741904273408"},
{"id":"5768225825488896"},{"id":"5026360687853568"},{"id":"5974182861996032"},{"id":"6590639987752960"},
{"id":"4569709144965120"},{"id":"6657461424488448"},{"id":"5870049567965184"},{"id":"6431465177874432"}]}]}
gpmacario@HW2457 MINGW64 ~
$
```

It looks like that `result.json` contains a wealth of useful information that Symbl.ai was able to extract just from the `*.mp4` file which I uploaded earlier!

Please [click here](/assets/imgs/2021-12-28-trying-symbl-ai.md/result.json) for a pretty-printed version of the result.

<!--
TODO: Try

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
-->

## Conclusions

I made a plan for 2022 to get more into what Symbl.ai platform provides. Stay tuned!

<!-- EOF -->
