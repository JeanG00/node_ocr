FROM node:20.12

ENV TZ=Asia/Shanghai

RUN apt-get update && apt-get install -y libopencv-dev tesseract-ocr

COPY ./assets/chi_sim.traineddata /usr/share/tesseract-ocr/5/tessdata/
COPY ./assets/chi_tra.traineddata /usr/share/tesseract-ocr/5/tessdata/
COPY ./assets/fra.traineddata /usr/share/tesseract-ocr/5/tessdata/

RUN chmod 644 /usr/share/tesseract-ocr/5/tessdata/*.traineddata

WORKDIR /root/app

COPY . .

RUN npm i

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["npm", "run", "start"]