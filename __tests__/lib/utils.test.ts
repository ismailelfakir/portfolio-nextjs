import { cn } from '@/lib/utils';

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class active-class');
    });

    it('should handle false conditional classes', () => {
      const isActive = false;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class');
    });

    it('should merge conflicting Tailwind classes correctly', () => {
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['text-red-500', 'bg-blue-500'], 'p-4');
      expect(result).toBe('text-red-500 bg-blue-500 p-4');
    });

    it('should handle undefined and null values', () => {
      const result = cn('text-red-500', undefined, null, 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle empty strings', () => {
      const result = cn('text-red-500', '', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle complex conditional logic', () => {
      const variant = 'primary';
      const size = 'large';
      const disabled = false;
      
      const result = cn(
        'base-button',
        variant === 'primary' && 'bg-blue-500',
        variant === 'secondary' && 'bg-gray-500',
        size === 'large' && 'px-6 py-3',
        size === 'small' && 'px-2 py-1',
        disabled && 'opacity-50 cursor-not-allowed'
      );
      
      expect(result).toBe('base-button bg-blue-500 px-6 py-3');
    });
  });
});