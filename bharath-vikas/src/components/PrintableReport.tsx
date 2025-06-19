
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Printer, Download } from 'lucide-react';
import type { TimeSeriesData } from '@/data/mockData';

interface PrintableReportProps {
  selectedCities: string[];
  selectedMetric: string;
  selectedCategory: string;
  data: TimeSeriesData[];
}

const PrintableReport: React.FC<PrintableReportProps> = ({
  selectedCities,
  selectedMetric,
  selectedCategory,
  data
}) => {
  const formatMetricName = (metric: string) => {
    return metric.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const generateReport = () => {
    const latestData = data[data.length - 1];
    const reportData = selectedCities.map(city => ({
      city,
      value: latestData[city] as number || 0
    })).sort((a, b) => b.value - a.value);

    return reportData;
  };

  const handlePrintReport = () => {
    const reportData = generateReport();
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>BharatVikas Dashboard - Complete Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #FF9933; padding-bottom: 20px; }
              .logo { color: #FF9933; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
              .section { margin: 30px 0; page-break-inside: avoid; }
              .city-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
              .city-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
              .metric-value { font-size: 24px; font-weight: bold; color: #FF9933; }
              .ranking { background: #f8f9fa; padding: 15px; border-radius: 8px; }
              @media print { 
                .no-print { display: none; }
                body { margin: 0; font-size: 12px; }
                .section { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">🇮🇳 BharatVikas Dashboard</div>
              <h1>${formatMetricName(selectedMetric)} Analysis Report</h1>
              <p><strong>Category:</strong> ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</p>
              <p><strong>Cities:</strong> ${selectedCities.join(', ')}</p>
              <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>

            <div class="section">
              <h2>Executive Summary</h2>
              <div class="ranking">
                <h3>Top Performing Cities</h3>
                <ol>
                  ${reportData.slice(0, 5).map(item => `
                    <li><strong>${item.city}</strong>: ${item.value.toFixed(2)} ${selectedMetric.includes('rate') || selectedMetric.includes('growth') || selectedMetric.includes('adoption') ? '%' : selectedMetric === 'population' ? 'M' : ''}</li>
                  `).join('')}
                </ol>
              </div>
            </div>

            <div class="section">
              <h2>City Performance Details</h2>
              <div class="city-grid">
                ${reportData.map(item => `
                  <div class="city-card">
                    <h3>${item.city}</h3>
                    <div class="metric-value">${item.value.toFixed(2)} ${selectedMetric.includes('rate') || selectedMetric.includes('growth') || selectedMetric.includes('adoption') ? '%' : selectedMetric === 'population' ? 'M' : ''}</div>
                    <p>Ranking: #${reportData.findIndex(r => r.city === item.city) + 1} out of ${reportData.length}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="section">
              <h2>Data Sources & Methodology</h2>
              <p>This report is based on data from multiple government and international sources including:</p>
              <ul>
                <li>Ministry of Statistics and Programme Implementation (MOSPI)</li>
                <li>Census of India</li>
                <li>Reserve Bank of India (RBI)</li>
                <li>World Bank Open Data</li>
                <li>UN Sustainable Development Goals India Dashboard</li>
              </ul>
              <p><em>Note: This is a demonstration dashboard with simulated data for educational purposes.</em></p>
            </div>

            <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
              <p>BharatVikas Dashboard - Decode India's Urban Growth Through Data</p>
              <p>Generated on ${new Date().toISOString()}</p>
            </footer>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadCSV = () => {
    const reportData = generateReport();
    const csvContent = [
      ['City', formatMetricName(selectedMetric), 'Ranking'],
      ...reportData.map((item, index) => [
        item.city,
        item.value.toFixed(2),
        index + 1
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bharatvikas-${selectedCategory}-${selectedMetric}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Printer className="h-5 w-5 text-orange-600" />
            <span>Reports & Export</span>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleDownloadCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
            <Button onClick={handlePrintReport} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Generate comprehensive reports with current data for {selectedCities.length} selected cities.
          Export as CSV or print a detailed analysis report.
        </p>
      </CardContent>
    </Card>
  );
};

export default PrintableReport;
