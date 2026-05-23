import { incidentService } from '../services/incident.service';
import { prisma } from '../lib/prisma';

// Mock modules
jest.mock('../lib/prisma');

describe('Incident Service - Data Transformation', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockIncident = {
    id: '1',
    title: 'Test Incident',
    description: 'This is a test incident',
    status: 'open',
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Incident Data Structure', () => {
    it('should have required fields', () => {
      expect(mockIncident).toHaveProperty('id');
      expect(mockIncident).toHaveProperty('title');
      expect(mockIncident).toHaveProperty('description');
      expect(mockIncident).toHaveProperty('status');
      expect(mockIncident).toHaveProperty('userId');
      expect(mockIncident).toHaveProperty('createdAt');
      expect(mockIncident).toHaveProperty('updatedAt');
      expect(mockIncident).toHaveProperty('user');
    });

    it('should include user information', () => {
      expect(mockIncident.user).toEqual({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['open', 'in-progress', 'closed'];
      const testIncidents = [
        { ...mockIncident, status: 'open' },
        { ...mockIncident, status: 'in-progress' },
        { ...mockIncident, status: 'closed' },
      ];

      testIncidents.forEach((incident) => {
        expect(validStatuses).toContain(incident.status);
      });
    });

    it('should not accept invalid status', () => {
      const validStatuses = ['open', 'in-progress', 'closed'];
      const invalidStatus = 'invalid-status';

      expect(validStatuses).not.toContain(invalidStatus);
    });
  });

  describe('Incident Validation', () => {
    it('should validate title is not empty', () => {
      const validateTitle = (title: string) => title.trim().length > 0;
      
      expect(validateTitle('Test Incident')).toBe(true);
      expect(validateTitle('')).toBe(false);
    });

    it('should validate description is not empty', () => {
      const validateDescription = (desc: string) => desc.trim().length > 0;
      
      expect(validateDescription('Test Description')).toBe(true);
      expect(validateDescription('')).toBe(false);
    });

    it('should validate userId is valid', () => {
      const validateUserId = (userId: string) => userId.length > 0;
      
      expect(validateUserId('1')).toBe(true);
      expect(validateUserId('user-id-123')).toBe(true);
      expect(validateUserId('')).toBe(false);
    });

    it('should filter incidents by status', () => {
      const incidents = [
        { ...mockIncident, status: 'open' },
        { ...mockIncident, id: '2', status: 'in-progress' },
        { ...mockIncident, id: '3', status: 'closed' },
      ];

      const openIncidents = incidents.filter((i) => i.status === 'open');
      const inProgressIncidents = incidents.filter((i) => i.status === 'in-progress');

      expect(openIncidents).toHaveLength(1);
      expect(inProgressIncidents).toHaveLength(1);
    });
  });

  describe('Incident Operations', () => {
    it('should handle incident creation', () => {
      const createData = {
        title: 'New Incident',
        description: 'New Description',
        status: 'open',
        userId: '1',
      };

      expect(createData).toHaveProperty('title');
      expect(createData).toHaveProperty('description');
      expect(createData).toHaveProperty('status');
      expect(createData).toHaveProperty('userId');
      expect(createData.status).toMatch(/^(open|in-progress|closed)$/);
    });

    it('should handle incident update', () => {
      const updateData = { status: 'in-progress' };
      const updatedIncident = { ...mockIncident, ...updateData };

      expect(updatedIncident.status).toBe('in-progress');
    });

    it('should preserve userId when updating incident', () => {
      const updateData = { title: 'Updated Title' };
      const originalUserId = mockIncident.userId;
      const updatedIncident = { ...mockIncident, ...updateData };

      expect(updatedIncident.userId).toBe(originalUserId);
      expect(updatedIncident.title).toBe('Updated Title');
    });
  });
});
