import { Job, Activity } from '@/types/job';
import { API_CONFIG } from '@/config/api';

export class JobService {
  // Obtener trabajos por status
  static async getJobsByStatus(status: 'pending' | 'completed'): Promise<Job[]> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.JOBS}?status=${status}`);
      if (!response.ok) {
        throw new Error(`Error fetching jobs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Obtener todos los trabajos
  static async getAllJobs(): Promise<Job[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      if (!response.ok) {
        throw new Error(`Error fetching jobs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Registrar actividad de click
  static async logClickActivity(
    userId: string,
    role: 'visitor' | 'requester' | 'fixer',
    jobId: string,
    button: string
  ): Promise<void> {
    try {
      const activity: Omit<Activity, '_id' | 'timestamp'> = {
        userId,
        date: new Date().toISOString(),
        role,
        type: 'click',
        metadata: {
          button,
          jobId
        }
      };

      const response = await fetch(`${API_BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        throw new Error(`Error logging activity: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error logging click activity:', error);
    }
  }

  // Verificar si ya existe una actividad de click para evitar duplicados
  static async checkExistingClick(
    userId: string,
    jobId: string,
    button: string
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/activities/check-click?userId=${userId}&jobId=${jobId}&button=${button}`
      );
      if (!response.ok) {
        return false;
      }
      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error('Error checking existing click:', error);
      return false;
    }
  }
}
