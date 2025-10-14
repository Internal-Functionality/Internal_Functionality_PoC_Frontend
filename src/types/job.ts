export interface Job {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  requesterId: string;
  fixerId?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  _id: string;
  userId: string;
  date: string;
  role: 'visitor' | 'requester' | 'fixer';
  type: 'login' | 'search' | 'click' | 'review' | 'session_start' | 'session_end';
  metadata: {
    button?: string;
    searchTerm?: string;
    duration?: number;
    [key: string]: any;
  };
  timestamp: string;
}
