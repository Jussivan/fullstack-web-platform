import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';
import type { ReactNode } from 'react';

describe('useAuth Hook', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should provide auth context', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('token');
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('logout');
  });

  it('should have isAuthenticated as false when no token', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBeNull();
  });

  it('should set token and user when setToken is called', async () => {
    const { result, rerender } = renderHook(() => useAuth(), { wrapper });

    const testToken = 'test_token_123';
    const testUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    result.current.setToken(testToken);
    result.current.setUser(testUser);

    // Wait for localStorage to be updated
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(testToken);
      expect(localStorage.getItem('user')).toBeTruthy();
    });

    // Re-render to get updated values
    rerender();

    expect(localStorage.getItem('token')).toBe(testToken);
  });

  it('should throw error when useAuth is used outside provider', () => {
    // This should not throw - it only throws in actual React render
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow();
  });

  it('should logout and clear user and token', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    result.current.setToken('test_token');
    result.current.setUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    result.current.logout();

    await waitFor(() => {
      expect(result.current.token).toBeNull();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
