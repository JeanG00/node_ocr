# NODEJS OCR service

## [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

```sh
# install standard globally
npm install standard --global
cd /path/to/project_root
standard
# use with caution
standard --fix
```

## DOC

- [tesseract](https://github.com/tesseract-ocr/tesseract/blob/main/doc/tesseract.1.asc)
- [tesseract cmd](https://tesseract-ocr.github.io/tessdoc/Command-Line-Usage.html)

## Server config

| ENV          | Values                       | group |
| :----------- | :--------------------------- | :---- |
| PORT         | 3000                         | app   |
| ROUTE_PREFIX | ''                           | app   |
| MONGO_URL    | mongodb://127.0.0.1:27017/db | app   |

## Docker Build

```sh
# 1. login Ali registry
docker login --username=your_name registry.cn-hangzhou.aliyuncs.com
# 2. build image & push to registry
docker buildx build --platform=linux/amd64,linux/arm64 --push -t registry.cn-hangzhou.aliyuncs.com/qingshou/node_ocr:v0.0.1 . --no-cache
# 3. add tags 【CI Stage】
docker tag registry.cn-hangzhou.aliyuncs.com/qingshou/node_ocr:v0.0.1 registry.cn-hangzhou.aliyuncs.com/qingshou/node_ocr:latest
docker push registry.cn-hangzhou.aliyuncs.com/qingshou/node_ocr:latest
```

## example 1

```sh
curl --location --request POST 'http://localhost:3000/ocr' \
--header 'Accept: */*' \
--header 'Host: localhost:3001' \
--header 'Connection: keep-alive' \
--header 'Content-Type: multipart/form-data; boundary=--------------------------185430364845972638466925' \
--form 'file=@"/Users/jeanshepherd/Documents/docs/assets/image_eng.jpg"' \
--form 'lang="eng"' \
--form 'oem="3"'
```

## response 1

```json
{
  "code": 0,
  "data": [
    {
      "name": "image_eng.jpg",
      "size": 3137526,
      "mime": "image/jpeg",
      "ext": "jpeg",
      "width": 1888,
      "height": 4096,
      "depth": "uchar",
      "space": "srgb",
      "hasAlpha": false,
      "hasProfile": true,
      "channels": 3,
      "density": 72,
      "input": {
        "lang": "eng",
        "oem": "3",
        "psm": 3
      },
      "ocr_err": "Estimating resolution as 427\n",
      "content": "THE TOWER OF CIRITH UNGOL\n\n903\n‘alls before him. Far up above, like an answering signal, a harsh\nS oe anged a single stroke.\nBey\nx That's done it!’ said Set ‘Now LAC rung the front-door bell!\n. come on somebody! he cried: Tell Captain Shagrat that the\n8 Well gif-warrior has called, with his elf-sword too!’\n; aie was no answer. Sam strode forward. Sting glittered blue in\n: sshd: The courtyard lay in deep shadow, but he could see that\nS a pavement was strewn with bodies. Right at his feet were two\n. e-archers with knives sticking in their backs. Beyond lay many more\nd shapes some singly as they had been hewn down or shot; others in\n: mars, Stil grappling one another, dead in the very throes of stabbing,\nn, yprottling, biting. The stones were slippery with dark blood.\nry Two liveries Sam noticed, one marked by the Red Eye, the other\nby a Moon disfigured with a ghastly face of death; but he did not\nW gop to look more closely. Across the court a great door at the foot\n1 ofthe Tower stood half open, and a red light came through; a large\nid or lay dead upon the threshold. Sam sprang over the body and went\n10 in; and then he peered about at a loss.\nd A wide and echoing passage led back from the door towards the\nte mountain-side. It was dimly lit with torches flaring in brackets on\n\nthe walls, but its distant end was lost in gloom. Many doors and\naf openings could be seen on this side and that; but it was empty save\n: for two or three more bodies sprawling on the floor. From what he\nes | had heard of the captains’ talk Sam knew that, dead or alive, Frodo\ne would most likely be found in a chamber high up in the turret far\nbove; but he might search for a day before he found the way.\nlem ‘Ttll be near the back, I guess,’ Sam muttered. ‘The whole Tower\n| “imbs backwards-like. And anyway I’d better follow these lights.’\na € advanced down the passage, but slowly now; each step more\nat i “ant. Terror was beginning to grip him again. There was no\nDns save the rap of his feet, which seemed to grow to an echoing\n\ni one ke the slapping of great hands upon the stones. The dead\n\n¢ emeq the emptiness; the dank black walls that in the a\n\nfe | (Way op x drip with blood; the fear of sudden death lurking 1n i oy\nD | wthe adow; and behind all his mind the ‘tin watch | ma ce ¥\nf oF Ue Ere it was almost more/the hi\n\nle | ting have welcomed a\n\nul . rather than this hi de\n\na) this Piao of Frodo, lying\nHe yaful place. He wer\ndoo, ‘ ad Passed beyon :\nbe righ end of the pa\n: Suessed, Ww : ;\n\n"
    }
  ]
}
```

## example 2

```sh
curl --location --request POST 'http://localhost:3000/ocr' \
--header 'Accept: */*' \
--header 'Host: localhost:3001' \
--header 'Connection: keep-alive' \
--header 'Content-Type: multipart/form-data; boundary=--------------------------696475558647494562611622' \
--form 'file=@"/Users/jeanshepherd/Documents/docs/assets/WechatIMG20.jpg"' \
--form 'lang="chi_sim"' \
--form 'oem="3"'
```

## response 2

```json
{
  "code": 0,
  "data": [
    {
      "name": "WechatIMG20.jpg",
      "size": 507146,
      "mime": "image/jpeg",
      "ext": "jpeg",
      "width": 1279,
      "height": 2776,
      "depth": "uchar",
      "space": "srgb",
      "hasAlpha": false,
      "hasProfile": false,
      "channels": 3,
      "density": 72,
      "input": {
        "lang": "chi_sim",
        "oem": "3",
        "psm": 3
      },
      "ocr_err": "Estimating resolution as 574\n",
      "content": "这部历史著作达到了其基本目标，即证明了: 除了\n相当晚近的历史，技术总是在影响科学 ，而不是相反。\n一一《自然/\n\n如果我可以给本评论附上铃刍、哨子和闪烁的允\n光 ，我会这样做，因为麦克莱伦和多恩的这本书值得[\n任何必要手段引起所有专业历史学家  当然还有普通\n读者一一的注意。\n\n一《加拿大历史年鉴 》\n\n"
    }
  ]
}
```
