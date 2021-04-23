import { ChartConfiguration, Plugin } from 'chart.js';

export const renderWhite: Plugin = {
  id: 'renderWhite',
  beforeDraw: (chart) => {
    chart.ctx.fillStyle = '#fff';
    chart.ctx.fillRect(0, 0, chart.width, chart.height);
  },
};

export const renderMiddleTotal: Plugin = {
  id: 'renderMiddleTotal',
  beforeDraw: function (chart) {
    if (chart.config.type === 'doughnut') {
      // Get ctx from string
      const ctx = chart.ctx;
      const dataset = chart.data.datasets[0];
      if (!dataset) return;

      let text = (dataset.data as number[]).reduce(
        (acc, curr) => Number(acc) + Number(curr),
        0
      );
      if (isNaN(text)) return;

      // Get options from the center object in options
      const centerConfig = {
        text: text.toString(),
        color: '#FF6384', // Default is #000000
        fontStyle: 'Arial', // Default is Arial
        sidePadding: 20, // Default is 20 (as a percentage)
        minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
        lineHeight: 25,
        maxFontSize: 75,
      };
      const fontStyle = centerConfig.fontStyle;
      const txt = centerConfig.text;
      const color = centerConfig.color;
      const maxFontSize = centerConfig.maxFontSize;
      const sidePadding = centerConfig.sidePadding;
      const sidePaddingCalculated = (sidePadding / 100) * chart.width;
      // Start with a base font of 30px
      ctx.font = '30px ' + fontStyle;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = chart.width - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = chart.width;

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let minFontSize = centerConfig.minFontSize;
      const lineHeight = centerConfig.lineHeight || 25;
      let wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + 'px ' + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      const words = txt.split(' ');
      let line = '';
      const lines = [];

      // Break words up into multiple lines if necessary
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (let n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      //Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  },
};

export const defaultGraphConfig: ChartConfiguration = {
  type: 'doughnut',
  data: {
    datasets: [],
  },
  options: {
    layout: {
      padding: 45,
    },
    plugins: {
      title: {
        display: true,
        font: {
          size: 30,
        },
      },
    },
    maintainAspectRatio: false,
  },
};

export const colors = [
  '#bada55',
  '#7fe5f0',
  '#ff7373',
  '#ffa500',
  '#40e0d0',
  '#ff7f50',
  '#c6e2ff',
  '#7fffd4',
];
