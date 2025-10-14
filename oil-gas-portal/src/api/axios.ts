import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export const api = axios.create({ baseURL: '/api' });

// Mock backend for this demo
const mock = new AxiosMockAdapter(api, { delayResponse: 400 });

export type Bid = {
  id: string;
  title: string;
  companyName: string;
  description: string;
  status: 'OPEN' | 'URGENT' | 'CLOSED';
  industry: 'OFFSHORE_OPERATIONS' | 'PIPELINE' | 'DRILLING' | 'REFINING' | 'EXPLORATION';
  location: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  requirements: string[];
  applicantCount: number;
  postedDate: string;
};

const mockBids: Bid[] = [
  { id: 'bid-1', title: 'Offshore Platform Maintenance Contract', companyName: 'Shell International', description: 'Comprehensive maintenance services...', status: 'OPEN', industry: 'OFFSHORE_OPERATIONS', location: 'Gulf of Mexico', budgetMin: 5000000, budgetMax: 10000000, deadline: '2024-03-15', requirements: ['ISO 9001 Certification', 'Offshore Experience', 'Safety Training'], applicantCount: 23, postedDate: '2024-01-10' },
  { id: 'bid-2', title: 'Pipeline Installation Project', companyName: 'ExxonMobil', description: 'Installation of 50km natural gas pipeline...', status: 'URGENT', industry: 'PIPELINE', location: 'Texas, USA', budgetMin: 2000000, budgetMax: 5000000, deadline: '2024-02-28', requirements: ['Pipeline Welding Certification', 'Environmental Compliance', 'Heavy Equipment'], applicantCount: 18, postedDate: '2024-01-05' },
  // ... more would be added similarly
];

mock.onGet('/bids').reply(() => {
  return [200, mockBids];
});

mock.onPost('/apply').reply(200, { success: true });
mock.onPost('/save').reply(200, { success: true });
