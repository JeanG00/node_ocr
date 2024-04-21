/**
 * [config](https://github.com/tesseract-ocr/tesseract/blob/main/doc/tesseract.1.asc)
 * oem:
 * 0 = Original Tesseract only.
 * 1 = Neural nets LSTM only.
 * 2 = Tesseract + LSTM.
 * 3 = Default, based on what is available.
 * psm:
 * 0 = Orientation and script detection (OSD) only.
 * 1 = Automatic page segmentation with OSD.
 * 2 = Automatic page segmentation, but no OSD, or OCR. (not implemented)
 * 3 = Fully automatic page segmentation, but no OSD. (Default)
 * 4 = Assume a single column of text of variable sizes.
 * 5 = Assume a single uniform block of vertically aligned text.
 * 6 = Assume a single uniform block of text.
 * 7 = Treat the image as a single text line.
 * 8 = Treat the image as a single word.
 * 9 = Treat the image as a single word in a circle.
 * 10 = Treat the image as a single character.
 * 11 = Sparse text. Find as much text as possible in no particular order.
 * 12 = Sparse text with OSD.
 * 13 = Raw line. Treat the image as a single text line,
     bypassing hacks that are Tesseract-specific.
 * `-c preserve_interword_spaces=1` to preserve spaces
 *
 * -l:
 *      eng: default english
 *      chi_sim: Chinese simplified
 */
const conf = {
  command: 'tesseract',
  dir: process.env.TESSERACT_DATA_DIR || '/usr/share/tesseract-ocr/5/tessdata',
  lang: process.env.TESSERACT_LANG || 'chi_sim',
  oem: process.env.TESSERACT_OEM || 0,
  psm: process.env.TESSERACT_PSM || 3,
  defaultFile: 'ocr_test'
}

module.exports = { ocr: conf }
