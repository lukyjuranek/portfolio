import { chromium } from 'playwright';

async function takeScreenshots() {
  const browser = await chromium.launch();
  const url = 'http://localhost:4321';
  
  // Desktop screenshots (1440px wide)
  console.log('Taking desktop screenshots (1440px)...');
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  await desktopPage.goto(url, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  
  // Above the fold
  await desktopPage.screenshot({
    path: '/opt/cursor/artifacts/screenshots/desktop-1440-above-fold.png',
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('✓ Desktop above-the-fold screenshot saved');
  
  // Full page
  await desktopPage.screenshot({
    path: '/opt/cursor/artifacts/screenshots/desktop-1440-full-page.png',
    fullPage: true
  });
  console.log('✓ Desktop full-page screenshot saved');
  
  await desktopPage.close();
  
  // Mobile screenshots (390px wide)
  console.log('Taking mobile screenshots (390px)...');
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });
  
  await mobilePage.goto(url, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  
  // Above the fold
  await mobilePage.screenshot({
    path: '/opt/cursor/artifacts/screenshots/mobile-390-above-fold.png',
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log('✓ Mobile above-the-fold screenshot saved');
  
  // Full page
  await mobilePage.screenshot({
    path: '/opt/cursor/artifacts/screenshots/mobile-390-full-page.png',
    fullPage: true
  });
  console.log('✓ Mobile full-page screenshot saved');
  
  await mobilePage.close();
  await browser.close();
  
  console.log('\nAll screenshots saved to /opt/cursor/artifacts/screenshots/');
}

takeScreenshots().catch(console.error);
