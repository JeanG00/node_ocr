/**
 * oem:
 *      1: LSTM/neural network
 *      0: Legacy Tesseract
 * psm:
 *      3: Fully automatic page segmentation, but no OSD. (Default)
 *      6: Assume a single uniform block of text
 * `-c preserve_interword_spaces=1` to preserve spaces
 */
const conf = {
  dir: process.env.TESSERACT_DATA_DIR || '/usr/share',
  lang: process.env.TESSERACT_LANG || 'eng',
  oem: process.env.TESSERACT_OEM || 0,
  psm: process.env.TESSERACT_PSM || 3
}

module.exports = { image: conf }
