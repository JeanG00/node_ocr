/**
 * [config](https://github.com/tesseract-ocr/tesseract/blob/main/doc/tesseract.1.asc)
 * oem:
 * 0 = Original Tesseract only.
 * 1 = Neural nets LSTM only.
 * 2 = Tesseract + LSTM.
 * 3 = Default, based on what is available.
 * psm:
 *      3: Fully automatic page segmentation, but no OSD. (Default)
 *      6: Assume a single uniform block of text
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
