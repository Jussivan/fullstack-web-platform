import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { IncidentList } from '../components/IncidentList';
import * as useIncidentsHook from '../hooks/useIncidents';

vi.mock('../hooks/useIncidents');

describe('IncidentList Component', () => {
  const mockIncident = {
    id: '1',
    title: 'Test Incident',
    description: 'This is a test incident',
    status: 'open',
    userId: 'user1',
    createdAt: '2026-05-22T00:00:00Z',
    updatedAt: '2026-05-22T00:00:00Z',
    user: {
      id: 'user1',
      name: 'Test User',
      email: 'test@example.com',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state', () => {
    vi.spyOn(useIncidentsHook, 'useIncidents').mockReturnValueOnce({
      incidents: [],
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<IncidentList />);

    expect(screen.getByText(/carregando incidentes/i)).toBeInTheDocument();
  });

  it('should display error message when error exists', () => {
    const errorMessage = 'Failed to load incidents';
    vi.spyOn(useIncidentsHook, 'useIncidents').mockReturnValueOnce({
      incidents: [],
      loading: false,
      error: errorMessage,
      refetch: vi.fn(),
    });

    render(<IncidentList />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should display empty state when no incidents', () => {
    vi.spyOn(useIncidentsHook, 'useIncidents').mockReturnValueOnce({
      incidents: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<IncidentList />);

    expect(screen.getByText(/nenhum incidente encontrado/i)).toBeInTheDocument();
  });

  it('should display incidents list', async () => {
    vi.spyOn(useIncidentsHook, 'useIncidents').mockReturnValueOnce({
      incidents: [mockIncident],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<IncidentList />);

    await waitFor(() => {
      expect(screen.getByText('Test Incident')).toBeInTheDocument();
      expect(screen.getByText('This is a test incident')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });

  it('should display incident status badge', async () => {
    vi.spyOn(useIncidentsHook, 'useIncidents').mockReturnValueOnce({
      incidents: [mockIncident],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<IncidentList />);

    await waitFor(() => {
      expect(screen.getByText('Aberto')).toBeInTheDocument();
    });
  });

  it('should display total incidents count', () => {
    vi.spyOn(useIncidentsHook, 'useIncidents').mockReturnValueOnce({
      incidents: [mockIncident, mockIncident],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<IncidentList />);

    expect(screen.getByText(/total: 2 incidentes/i)).toBeInTheDocument();
  });
});
