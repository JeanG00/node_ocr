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

## Server config

| ENV          | Values | group |
| :----------- | :----- | :---- |
| PORT         | 3000   | app   |
| ROUTE_PREFIX | ''     | app   |

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
