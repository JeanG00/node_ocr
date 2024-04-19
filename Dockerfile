FROM node:20.12

ENV TZ=Asia/Shanghai

RUN apt-get update && apt-get install -y libopencv-dev tesseract-ocr

WORKDIR /root/app

COPY . .

RUN npm i

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["npm", "run", "start"]