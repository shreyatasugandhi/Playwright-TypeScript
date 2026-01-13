import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

class MyPDFReporter implements Reporter {
  private results: { title: string; status: string; duration: number }[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.push({
      title: test.title,
      status: result.status,
      duration: result.duration
    });
  }

  async onEnd(result: FullResult) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let y = height - 50;

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 14;

    page.drawText('Playwright PDF Test Report', {
      x: 50,
      y,
      size: 20,
      font,
      color: rgb(0, 0, 0)
    });
    y -= 40;

    for (const res of this.results) {
      let color = rgb(0, 0, 0); // default black

      if (res.status === 'passed') color = rgb(0, 0.6, 0);       // green
      else if (res.status === 'failed') color = rgb(0.8, 0, 0);   // red
      else if (res.status === 'timedOut') color = rgb(1, 0.5, 0); // orange

      const line = `Test: ${res.title} | Status: ${res.status} | Duration: ${res.duration}ms`;
      page.drawText(line, { x: 50, y, size: fontSize, font, color });
      y -= 20;

      if (y < 50) {
        y = height - 50; // start new page if needed
      }
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('playwright-test-report.pdf', pdfBytes);
    console.log('PDF report generated: playwright-test-report.pdf');
  }
}

export default MyPDFReporter;
