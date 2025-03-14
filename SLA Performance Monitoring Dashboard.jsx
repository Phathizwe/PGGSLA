function App() {
  const [activeTab, setActiveTab] = React.useState('monitor');
  const [selectedFitmentCentre, setSelectedFitmentCentre] = React.useState('all');
  const [dateRange, setDateRange] = React.useState('last30');
  const [isUploading, setIsUploading] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState('March 13, 2025 09:45 AM');
  const [showUploadSuccess, setShowUploadSuccess] = React.useState(false);

  // Sample data for the dashboard
  const fitmentCentres = [
    { id: 'all', name: 'All Centres' },
    { id: 'jnb001', name: 'Johannesburg Central' },
    { id: 'cpt002', name: 'Cape Town Waterfront' },
    { id: 'dbn003', name: 'Durban North' },
    { id: 'pta004', name: 'Pretoria East' },
    { id: 'blm005', name: 'Bloemfontein' },
    { id: 'plz006', name: 'Port Elizabeth' },
  ];

  // Sample performance data
  const performanceData = {
    'lead_generation': {
      name: 'Lead Generation (CLIMB)',
      kpis: [
        { id: 'cost_per_lead', name: 'Cost per Lead', target: '≤ $50', actual: '$42', status: 'success' },
        { id: 'lead_conversion', name: 'Lead Conversion Rate', target: '≥ 20%', actual: '22%', status: 'success' },
        { id: 'lead_insights', name: 'Insights on Lead Source', target: '≤ 7 days', actual: '5 days', status: 'success' },
        { id: 'lead_volume', name: 'Number of Leads', target: '≥ 500/month', actual: '480/month', status: 'warning' },
        { id: 'lead_time', name: 'Time to Generate Leads', target: '≤ 2 days', actual: '1.8 days', status: 'success' },
      ]
    },
    'lead_qualification': {
      name: 'Lead Qualification (QUEST)',
      kpis: [
        { id: 'qualified_rate', name: 'Qualified Lead Rate', target: '≥ 60%', actual: '58%', status: 'warning' },
        { id: 'qualify_time', name: 'Time to Qualify Leads', target: '≤ 24 hours', actual: '22 hours', status: 'success' },
        { id: 'exit_rate', name: 'Lead Drop-off Rate', target: '≤ 15%', actual: '17%', status: 'danger' },
        { id: 'sales_ready', name: 'Sales-Ready Leads', target: '≥ 100/month', actual: '95/month', status: 'warning' },
        { id: 'lead_accuracy', name: 'Lead Scoring Accuracy', target: '≥ 85%', actual: '87%', status: 'success' },
      ]
    },
    'appointment': {
      name: 'Appointment Scheduling (QUANTIFY)',
      kpis: [
        { id: 'quote_acceptance', name: 'Quote Acceptance Rate', target: '≥ 70%', actual: '72%', status: 'success' },
        { id: 'quote_time', name: 'Time to Quote', target: '≤ 4 hours', actual: '3.5 hours', status: 'success' },
        { id: 'accuracy_rate', name: 'SX-Accuracy Rate', target: '≥ 95%', actual: '96%', status: 'success' },
        { id: 'no_show', name: 'No-Show Rate', target: '≤ 10%', actual: '8%', status: 'success' },
        { id: 'schedule_time', name: 'Time to Schedule', target: '≤ 24 hours', actual: '20 hours', status: 'success' },
        { id: 'inquiry_conversion', name: 'Inquiry Conversion Rate', target: '≥ 40%', actual: '38%', status: 'warning' },
        { id: 'followup_conversion', name: 'Follow-Up Conversion Rate', target: '≥ 30%', actual: '25%', status: 'danger' },
        { id: 'nps', name: 'Net Promoter Score', target: '≥ 8', actual: '7.8', status: 'warning' },
      ]
    },
    'revenue': {
      name: 'Revenue Assurance (TRRACKING)',
      kpis: [
        { id: 'claim_time', name: 'Time to Claim Authorised', target: '≤ 48 hours', actual: '45 hours', status: 'success' },
        { id: 'resubmission', name: 'Resubmission Rate', target: '≤ 15%', actual: '12%', status: 'success' },
        { id: 'reauthorisation', name: 'Reauthorisation Rate', target: '≤ 10%', actual: '11%', status: 'danger' },
        { id: 'auth_rate', name: 'Authorisation Rate', target: '≥ 85%', actual: '87%', status: 'success' },
        { id: 'ins_nps', name: 'Insurance Customer NPS', target: '≥ 8', actual: '8.2', status: 'success' },
        { id: 'declined_rate', name: 'Declined Claims Rate', target: '≤ 5%', actual: '4.8%', status: 'success' },
        { id: 'rejected_rate', name: 'Rejected Claims Rate', target: '≤ 3%', actual: '3.5%', status: 'danger' },
        { id: 'rejected_cash', name: 'Rejected-to-Cash Conversion', target: '≥ 20%', actual: '18%', status: 'warning' },
        { id: 'glass_procurement', name: 'Glass Procurement on Risk', target: '≥ 95%', actual: '96%', status: 'success' },
      ]
    },
    'service': {
      name: 'Service Delivery (PEFORMANCE)',
      kpis: [
        { id: 'tech_utilization', name: 'Technician Utilization Rate', target: '≥ 85%', actual: '82%', status: 'warning' },
        { id: 'equipment_downtime', name: 'Equipment Downtime', target: '≤ 5%', actual: '4.2%', status: 'success' },
        { id: 'job_completion', name: 'Overall Job Completion Time', target: '≤ 4 hours', actual: '4.3 hours', status: 'danger' },
        { id: 'on_time_service', name: 'On-Time Service Rate', target: '≥ 95%', actual: '93%', status: 'warning' },
        { id: 'return_job', name: 'Return Job Rate', target: '≤ 3%', actual: '2.8%', status: 'success' },
        { id: 'service_nps', name: 'Service NPS', target: '≥ 8', actual: '8.4', status: 'success' },
        { id: 'injuries', name: 'Injury on Duty', target: '≤ 0 incidents', actual: '0 incidents', status: 'success' },
        { id: 'turnaround', name: 'Customer Turnaround Time', target: '≤ 24 hours', actual: '26 hours', status: 'danger' },
        { id: 'conversion_rates', name: 'Repair/Replace Conversion', target: '= 15%', actual: '14%', status: 'warning' },
        { id: 'efficiency', name: 'Overall Efficiency', target: '≥ 90%', actual: '88%', status: 'warning' },
      ]
    },
    'invoicing': {
      name: 'Invoicing (INVOICE)',
      kpis: [
        { id: 'invoice_compliance', name: 'Invoice Submission Compliance', target: '≥ 98%', actual: '99%', status: 'success' },
        { id: 'resubmitted_invoices', name: 'Resubmitted Invoice Rate', target: '≤ 5%', actual: '4.2%', status: 'success' },
        { id: 'verification_time', name: 'Verification Time', target: '≤ 4 hours', actual: '3.5 hours', status: 'success' },
        { id: 'invoice_approval', name: 'On-Time Invoice Approval', target: '≤ 48 hours', actual: '40 hours', status: 'success' },
        { id: 'disputed_invoices', name: 'Disputed Invoice Rate', target: '≤ 2%', actual: '2.5%', status: 'danger' },
        { id: 'time_to_invoice', name: 'Time to Invoice', target: '≤ 24 hours', actual: '22 hours', status: 'success' },
        { id: 'invoice_efficiency', name: 'Invoice Processing Efficiency', target: '≥ 95%', actual: '94%', status: 'warning' },
      ]
    },
    'payment': {
      name: 'Payment Collection (COLLECT)',
      kpis: [
        { id: 'collection_rate', name: 'Payment Collection Rate', target: '≥ 95%', actual: '93%', status: 'warning' },
        { id: 'on_time_payment', name: 'On-Time Payment Rate', target: '≥ 90%', actual: '87%', status: 'warning' },
        { id: 'late_payment', name: 'Late Payment Rate', target: '≤ 10%', actual: '13%', status: 'danger' },
        { id: 'dso', name: 'Days Sales Outstanding', target: '≤ 30 days', actual: '32 days', status: 'warning' },
        { id: 'reminder_effectiveness', name: 'Reminder Effectiveness', target: '≥ 40%', actual: '45%', status: 'success' },
        { id: 'payment_satisfaction', name: 'Customer Payment Satisfaction', target: '≥ 90%', actual: '92%', status: 'success' },
        { id: 'troublesome_payments', name: 'Troublesome Payments', target: '≤ 5%', actual: '6.2%', status: 'danger' },
      ]
    },
    'debt': {
      name: 'Debt Collection (RECOVER)',
      kpis: [
        { id: 'recovery_rate', name: 'Debt Recovery Rate', target: '≥ 80%', actual: '78%', status: 'warning' },
        { id: 'collector_efficiency', name: 'Collector Efficiency', target: '≥ 85%', actual: '86%', status: 'success' },
        { id: 'collection_period', name: 'Average Collection Period', target: '≤ 45 days', actual: '48 days', status: 'danger' },
        { id: 'aging', name: 'Aging of Accounts Receivable', target: '≤ 60 days', actual: '55 days', status: 'success' },
        { id: 'write_off', name: 'Write-Off Rate', target: '≤ 3%', actual: '2.8%', status: 'success' },
        { id: 'collection_cost', name: 'Cost of Debt Collection', target: '≤ 10%', actual: '9.5%', status: 'success' },
        { id: 'resolution_time', name: 'Dispute Resolution Time', target: '≤ 14 days', actual: '15 days', status: 'danger' },
      ]
    }
  };

  // Sample data for charts
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: {
      'lead_generation': [420, 450, 480, 510, 490, 520],
      'quote_acceptance': [68, 70, 69, 72, 71, 73],
      'no_show': [12, 10, 9, 8, 8.5, 8],
      'on_time_service': [90, 91, 92, 93, 92, 93],
      'invoice_compliance': [96, 97, 98, 98, 99, 99]
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    event.preventDefault();
    setIsUploading(true);

    // Simulate file upload process
    setTimeout(() => {
      setIsUploading(false);
      setShowUploadSuccess(true);
      setLastUpdated('March 13, 2025 10:15 AM');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowUploadSuccess(false);
      }, 3000);
    }, 2000);
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'danger': return '✗';
      default: return '•';
    }
  };

  // Settings page component (unchanged from previous)
  const SettingsPage = () => {
    const [categories, setCategories] = React.useState([
      {
        id: 1,
        name: "Lead Generation – CLIMB",
        expanded: true,
        kpis: [
          { id: "C", name: "Cost per Lead (C)", target: "50", unit: "$", direction: "below" },
          { id: "L", name: "Lead Conversion Rate (L)", target: "20", unit: "%", direction: "above" },
          { id: "I", name: "Insights on Lead Source Performance (I)", target: "7", unit: "days", direction: "below" },
          { id: "M", name: "Number of Leads Generated (M)", target: "500", unit: "leads/month", direction: "above" },
          { id: "B", name: "Time to Generate Leads (B)", target: "2", unit: "days", direction: "below" },
        ]
      },
      // Other categories remain the same as in the previous code
      // ...
    ]);

    // Settings page functions remain the same
    // ...

    return (
      <div className="p-4 max-w-6xl mx-auto bg-gray-50">
        {/* Settings page content remains the same */}
      </div>
    );
  };

  // Monitoring page component
  const MonitoringPage = () => {
    return (
      <div className="p-4 max-w-6xl mx-auto bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">SLA Performance Monitoring</h1>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <select
                value={selectedFitmentCentre}
                onChange={(e) => setSelectedFitmentCentre(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                {fitmentCentres.map(centre => (
                  <option key={centre.id} value={centre.id}>{centre.name}</option>
                ))}
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
              </select>
            </div>
          </div>

          <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="text-gray-600 mb-2 md:mb-0">
              Last updated: {lastUpdated}
            </p>

            <div className="relative">
              <form onSubmit={handleFileUpload}>
                <div className="flex items-center space-x-2">
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
                    <span>{isUploading ? 'Uploading...' : 'Upload New Data'}</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".xlsx,.xls,.csv"
                      disabled={isUploading}
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    disabled={isUploading}
                  >
                    Submit
                  </button>
                </div>
              </form>
              {showUploadSuccess && (
                <div className="absolute top-full right-0 mt-2 bg-green-100 text-green-800 px-4 py-2 rounded-md">
                  Data uploaded successfully!
                </div>
              )}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-800 font-medium mb-1">Meeting Target</div>
                <div className="text-3xl font-bold text-green-700">42</div>
                <div className="text-sm text-green-600">KPIs on track</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-yellow-800 font-medium mb-1">At Risk</div>
                <div className="text-3xl font-bold text-yellow-700">12</div>
                <div className="text-sm text-yellow-600">KPIs need attention</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800 font-medium mb-1">Below Target</div>
                <div className="text-3xl font-bold text-red-700">8</div>
                <div className="text-sm text-red-600">KPIs require immediate action</div>
              </div>
            </div>
          </div>

          {/* Key Trends */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Trends</h2>
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="h-64 flex items-center justify-center">
                {/* This would be a chart in a real implementation */}
                <div className="text-center text-gray-500">
                  <div className="mb-2">Chart: Performance Trends Over Time</div>
                  <div className="flex justify-center space-x-8">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                        <div className="text-blue-700">Lead Generation</div>
                      </div>
                      <div className="mt-2 text-sm">↑ 5% from last period</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-green-100 rounded-lg flex items-center justify-center">
                        <div className="text-green-700">Service Delivery</div>
                      </div>
                      <div className="mt-2 text-sm">↑ 3% from last period</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-red-100 rounded-lg flex items-center justify-center">
                        <div className="text-red-700">Payment Collection</div>
                      </div>
                      <div className="mt-2 text-sm">↓ 2% from last period</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed KPI Performance */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed KPI Performance</h2>
            <div className="space-y-4">
              {Object.keys(performanceData).map(category => (
                <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3">
                    <h3 className="font-medium text-gray-800">{performanceData[category].name}</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {performanceData[category].kpis.map(kpi => (
                        <div key={kpi.id} className="border border-gray-200 rounded-md p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-gray-700">{kpi.name}</div>
                            <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(kpi.status)}`}>
                              {getStatusIcon(kpi.status)} {kpi.status === 'success' ? 'On Track' : kpi.status === 'warning' ? 'At Risk' : 'Off Track'}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">Target: {kpi.target}</div>
                            <div className="text-sm font-semibold">Actual: {kpi.actual}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'monitor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('monitor')}
            >
              Performance Monitoring
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('settings')}
            >
              SLA Settings
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'monitor' ? <MonitoringPage /> : <SettingsPage />}
    </div>
  );
}