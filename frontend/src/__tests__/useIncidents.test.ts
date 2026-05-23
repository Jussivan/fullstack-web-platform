import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useIncidents } from '../hooks/useIncidents';
import * as apiService from '../services/api';

vi.mock('../services/api');

describe('useIncidents Hook', () => {
  const mockIncidents = [
    {
      id: '1',
      title: 'Test Incident 1',
      description: 'Description 1',
      status: 'open',
      userId: 'user1',
      createdAt: '2026-05-22T00:00:00Z',
      updatedAt: '2026-05-22T00:00:00Z',
      user: {
        id: 'user1',
        name: 'User 1',
        email: 'user1@example.com',
      },
    },
    {
      id: '2',
      title: 'Test Incident 2',
      description: 'Description 2',
      status: 'in-progress',
      userId: 'user2',
      createdAt: '2026-05-22T00:00:00Z',
      updatedAt: '2026-05-22T00:00:00Z',
      user: {
        id: 'user2',
        name: 'User 2',
        email: 'user2@example.com',
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load incidents on mount', async () => {
    vi.spyOn(apiService.api.incidents, 'getAll').mockResolvedValueOnce(mockIncidents);

    const { result } = renderHook(() => useIncidents());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.incidents).toEqual(mockIncidents);
    expect(result.current.error).toBeNull();
  });

  it('should handle error when loading incidents fails', async () => {
    const errorMessage = 'Failed to load incidents';
    vi.spyOn(apiService.api.incidents, 'getAll').mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useIncidents());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.incidents).toEqual([]);
  });

  it('should refetch incidents', async () => {
    const spy = vi
      .spyOn(apiService.api.incidents, 'getAll')
      .mockResolvedValueOnce(mockIncidents);

    const { result } = renderHook(() => useIncidents());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(spy).toHaveBeenCalledTimes(1);

    result.current.refetch();

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  it('should return empty array when no incidents exist', async () => {
    vi.spyOn(apiService.api.incidents, 'getAll').mockResolvedValueOnce([]);

    const { result } = renderHook(() => useIncidents());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.incidents).toEqual([]);
  });
});
