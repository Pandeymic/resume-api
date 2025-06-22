const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/generate-resume', async (req, res) => {
  try {
    const data = req.body;

    const ejs = require('ejs');
    const fs = require('fs');
    const path = require('path');

    const templatePath = path.join(__dirname, '../views/resume.ejs');
    const template = fs.readFileSync(templatePath, 'utf8');

    const html = ejs.render(template, { data });

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf'
    });

    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating resume');
  }
});

module.exports = router;
