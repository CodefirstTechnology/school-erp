import { Component } from '@angular/core';

interface AiKpi {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  glow: string;
}

interface PredictionModule {
  id: string;
  title: string;
  description: string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  metric: string;
  metricLabel: string;
  insight: string;
  action: string;
  type: 'performance' | 'attendance' | 'fee' | 'teacher' | 'admission';
}

interface InsightFeedItem {
  id: string;
  time: string;
  title: string;
  body: string;
  type: 'alert' | 'recommendation' | 'prediction' | 'report';
  priority: 'high' | 'medium' | 'low';
}

interface Recommendation {
  id: string;
  title: string;
  impact: string;
  confidence: number;
  category: string;
}

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  time?: string;
}

interface ForecastPoint {
  month: string;
  actual?: number;
  predicted: number;
}

@Component({
  selector: 'app-ai-insights',
  templateUrl: './ai-insights.component.html',
  styleUrls: ['./ai-insights.component.css']
})
export class AiInsightsComponent {
  chatInput = '';
  isThinking = false;

  kpiCards: AiKpi[] = [
    { title: 'AI Predictions', value: '1,842', subtitle: 'Active models running', icon: 'predictions', glow: 'purple' },
    { title: 'Risk Alerts', value: '23', subtitle: '7 require immediate action', icon: 'alerts', glow: 'red' },
    { title: 'Smart Recommendations', value: '156', subtitle: 'Generated this week', icon: 'recommendations', glow: 'blue' },
    { title: 'AI Generated Reports', value: '48', subtitle: 'Auto-created this month', icon: 'reports', glow: 'green' }
  ];

  predictionModules: PredictionModule[] = [
    {
      id: 'perf', title: 'Student Performance Prediction', type: 'performance',
      description: 'ML model forecasts board exam readiness and subject-wise performance trajectories for 4,850 students.',
      confidence: 91, trend: 'up', metric: '78%', metricLabel: 'Avg Readiness Score',
      insight: '15 students in Class 10-B need Mathematics intervention within 2 weeks.',
      action: 'Schedule remedial sessions'
    },
    {
      id: 'att', title: 'Attendance Prediction', type: 'attendance',
      description: 'Time-series model predicts attendance dips based on historical patterns, weather, and events.',
      confidence: 94, trend: 'down', metric: '23', metricLabel: 'At-Risk Students',
      insight: 'Class 8-B shows 18% decline probability next week — parent notifications recommended.',
      action: 'Send early alerts'
    },
    {
      id: 'fee', title: 'Fee Default Prediction', type: 'fee',
      description: 'Predictive scoring identifies families likely to miss payments based on payment history and patterns.',
      confidence: 96, trend: 'stable', metric: '₹12.3L', metricLabel: 'Predicted at Risk',
      insight: '42 accounts flagged with 85%+ default probability in next 30 days.',
      action: 'Trigger payment reminders'
    },
    {
      id: 'teacher', title: 'Teacher Performance Analysis', type: 'teacher',
      description: 'AI evaluates lesson completion, student outcomes, and feedback to surface performance insights.',
      confidence: 88, trend: 'up', metric: '89%', metricLabel: 'Dept. Avg Score',
      insight: 'English department needs 3 substitute arrangements — workload imbalance detected.',
      action: 'Review staffing plan'
    },
    {
      id: 'adm', title: 'Admission Forecasting', type: 'admission',
      description: 'Forecasts enrollment pipeline using inquiry trends, conversion rates, and seasonal patterns.',
      confidence: 87, trend: 'up', metric: '186', metricLabel: 'Projected Q3 Intake',
      insight: 'Website inquiries up 24% — capacity planning for Class 6 recommended.',
      action: 'View forecast details'
    }
  ];

  insightFeed: InsightFeedItem[] = [
    { id: '1', time: '2 min ago', title: 'Attendance Risk Detected', body: 'Class 8-B: 23 students showing declining patterns. AI confidence 92%.', type: 'alert', priority: 'high' },
    { id: '2', time: '15 min ago', title: 'Fee Collection Optimization', body: 'Sending reminders on Tuesdays increases collection by 18%. Apply to 186 pending accounts.', type: 'recommendation', priority: 'medium' },
    { id: '3', time: '32 min ago', title: 'Performance Forecast Updated', body: 'Board exam readiness model recalibrated. Class 12 average projected at 82%.', type: 'prediction', priority: 'medium' },
    { id: '4', time: '1 hr ago', title: 'Weekly AI Report Ready', body: 'Comprehensive school analytics report generated. 12 actionable insights included.', type: 'report', priority: 'low' },
    { id: '5', time: '2 hr ago', title: 'Admission Surge Predicted', body: 'Q3 intake forecast revised upward by 15% based on inquiry velocity.', type: 'prediction', priority: 'medium' },
    { id: '6', time: '3 hr ago', title: 'Teacher Workload Alert', body: 'Science dept. at 112% capacity. Redistribution recommended.', type: 'alert', priority: 'high' }
  ];

  recommendations: Recommendation[] = [
    { id: '1', title: 'Enable automated fee reminders for 42 high-risk accounts', impact: 'High', confidence: 96, category: 'Finance' },
    { id: '2', title: 'Assign counselor meetings for Class 8-B attendance cluster', impact: 'High', confidence: 92, category: 'Academic' },
    { id: '3', title: 'Increase Class 6 admission capacity by 2 sections', impact: 'Medium', confidence: 87, category: 'Admissions' },
    { id: '4', title: 'Redistribute 3 English dept. periods to balance workload', impact: 'Medium', confidence: 84, category: 'HR' },
    { id: '5', title: 'Deploy remedial Math sessions for 15 identified students', impact: 'High', confidence: 91, category: 'Academic' }
  ];

  chatMessages: ChatMessage[] = [
    {
      role: 'ai',
      content: 'Hello! I\'m SchoolMate AI — your intelligent school analytics assistant. I can help you with predictions, risk analysis, and smart recommendations across academics, attendance, finance, and admissions.',
      time: 'Just now'
    }
  ];

  forecastData: ForecastPoint[] = [
    { month: 'Jul', actual: 120, predicted: 118 },
    { month: 'Aug', actual: 135, predicted: 132 },
    { month: 'Sep', actual: 142, predicted: 140 },
    { month: 'Oct', actual: 148, predicted: 145 },
    { month: 'Nov', actual: 155, predicted: 152 },
    { month: 'Jun', predicted: 186 }
  ];

  quickPrompts = [
    'Which students are at attendance risk?',
    'Forecast next month fee collection',
    'Top teacher performance insights',
    'Generate weekly AI report'
  ];

  selectedModule: PredictionModule | null = null;

  getForecastPath(): string {
    const points = this.forecastData.filter(f => f.predicted);
    const max = Math.max(...points.map(p => p.predicted));
    return points.map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 60 - (p.predicted / max) * 50;
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  getFeedIcon(type: string): string {
    const map: Record<string, string> = {
      alert: 'alert', recommendation: 'rec', prediction: 'pred', report: 'report'
    };
    return map[type] || 'pred';
  }

  selectModule(mod: PredictionModule): void {
    this.selectedModule = this.selectedModule?.id === mod.id ? null : mod;
  }

  sendMessage(text?: string): void {
    const msg = (text || this.chatInput).trim();
    if (!msg) return;

    this.chatMessages.push({ role: 'user', content: msg, time: 'Now' });
    this.chatInput = '';
    this.isThinking = true;

    setTimeout(() => {
      this.chatMessages.push({
        role: 'ai',
        content: this.generateAiResponse(msg),
        time: 'Now'
      });
      this.isThinking = false;
    }, 1200);
  }

  useQuickPrompt(prompt: string): void {
    this.sendMessage(prompt);
  }

  private generateAiResponse(query: string): string {
    const q = query.toLowerCase();
    if (q.includes('attendance')) {
      return 'Based on current models, 23 students across 4 classes are flagged for attendance risk in the next 14 days. Class 8-B has the highest concentration (92% confidence). I recommend sending parent notifications and scheduling counselor check-ins.';
    }
    if (q.includes('fee') || q.includes('collection')) {
      return 'Fee collection forecast for July: ₹62L projected (96% confidence), up 8% from June. 42 accounts are at high default risk — automated Tuesday reminders could recover an estimated ₹8.4L.';
    }
    if (q.includes('teacher')) {
      return 'Top performers: Dr. Sunita Rao (96%), Rajesh Kumar (94%), Anita Verma (91%). English department shows workload imbalance — 3 substitute arrangements suggested. Overall faculty score: 89%.';
    }
    if (q.includes('report')) {
      return 'I\'ve prepared your weekly AI report covering: 12 actionable insights, 7 risk alerts, 5 smart recommendations, and updated forecasts for admissions, attendance, and revenue. Would you like me to export it as PDF?';
    }
    return 'I\'ve analyzed your query against 1,842 active prediction models. The data suggests focusing on Class 8-B attendance and fee collection for 42 high-risk accounts this week. Ask me about specific departments, classes, or metrics for deeper insights.';
  }
}
