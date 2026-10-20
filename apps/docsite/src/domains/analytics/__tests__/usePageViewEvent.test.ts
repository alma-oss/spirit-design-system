/* @jest-environment jsdom */
import { sendGTMEvent } from '@next/third-parties/google';
import { renderHook } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { usePageViewEvent } from '../usePageViewEvent';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn(),
}));

describe('usePageViewEvent', () => {
  beforeEach(() => {
    jest.mocked(usePathname).mockReturnValue('/components');
    jest.mocked(sendGTMEvent).mockClear();
  });

  it('should skip the first view because Google Tag Manager already sent it', () => {
    renderHook(() => usePageViewEvent());

    expect(sendGTMEvent).not.toHaveBeenCalled();
  });

  it('should send the pathname when the route changes', () => {
    const { rerender } = renderHook(() => usePageViewEvent());

    jest.mocked(usePathname).mockReturnValue('/icons');
    rerender();

    expect(sendGTMEvent).toHaveBeenCalledTimes(1);
    expect(sendGTMEvent).toHaveBeenCalledWith({
      event: 'page_view',
      page_path: '/icons',
    });
  });

  it('should not send another view when the route stays the same', () => {
    const { rerender } = renderHook(() => usePageViewEvent());

    rerender();

    expect(sendGTMEvent).not.toHaveBeenCalled();
  });
});
