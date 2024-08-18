import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  ignoreDefaultArgs: ['--mute-audio'],
  args: [
    '--autoplay-policy=no-user-gesture-required', 
    "--alsa-output-device='volumio'" // change this for your customized ALSA output
  ]
});
const page = await browser.newPage();

await page.goto('https://www.e-classical.com.tw');

await page.$eval('.vjs-play-control.vjs-control.vjs-button', button => button.click());

const PAUSE_BUTTON = '.vjs-play-control.vjs-control.vjs-button.vjs-paused'
while(true) {
  try {
    await page.waitForSelector(PAUSE_BUTTON, { timeout: 300 })
    await page.$eval(PAUSE_BUTTON, button => button.click());
  } catch(e) {
    // ignore error
  }
}
