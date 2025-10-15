import { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { JobService } from '@/services/jobService';

export const useJobs = () => {
  const [pendingJobs, setPendingJobs] = useState<Job[]>([]);
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [pending, completed] = await Promise.all([
        JobService.getJobsByStatus('pending'),
        JobService.getJobsByStatus('completed')
      ]);
      
      setPendingJobs(pending);
      setCompletedJobs(completed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = async (
    jobId: string,
    userId: string,
    role: 'visitor' | 'requester' | 'fixer',
    button: string
  ) => {
    try {
      // Verificar si ya existe el click para evitar duplicados
      const exists = await JobService.checkExistingClick(userId, jobId, button);
      
      if (!exists) {
        await JobService.logClickActivity(userId, role, jobId, button);
      }
    } catch (err) {
      console.error('Error logging click activity:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    pendingJobs,
    completedJobs,
    loading,
    error,
    refetch: fetchJobs,
    handleJobClick
  };
};
