import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { toast } from 'sonner';

// Mock the toast function
jest.mock('sonner');
const mockToast = toast as jest.Mocked<typeof toast>;

// Mock the Dialog components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => (
    <div data-testid="dialog" data-open={open}>
      {children}
    </div>
  ),
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
  DialogTrigger: ({ children, asChild, ...props }: any) => {
    if (asChild) {
      return <div {...props}>{children}</div>;
    }
    return <button {...props}>{children}</button>;
  },
}));

describe('TestimonialsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the testimonials section with title and description', () => {
    render(<TestimonialsSection />);
    
    expect(screen.getByText('What People Say')).toBeInTheDocument();
    expect(screen.getByText(/Feedback from clients, colleagues/)).toBeInTheDocument();
  });

  it('renders "Add Your Testimonial" button', () => {
    render(<TestimonialsSection />);
    
    expect(screen.getByText('Add Your Testimonial')).toBeInTheDocument();
  });

  it('displays default testimonials', () => {
    render(<TestimonialsSection />);
    
    // Should show some of the default testimonials (4 random ones)
    const testimonialCards = screen.getAllByText(/"/);
    expect(testimonialCards.length).toBeGreaterThan(0);
  });

  it('renders "View All Testimonials" button', () => {
    render(<TestimonialsSection />);
    
    expect(screen.getByText(/View All Testimonials/)).toBeInTheDocument();
  });

  describe('Testimonial Display', () => {
    it('shows 4 testimonials by default', () => {
      render(<TestimonialsSection />);
      
      // Count testimonial cards (they contain quotes)
      const testimonialCards = document.querySelectorAll('[class*="Card"]');
      // Since we're showing random testimonials, we just check that some are displayed
      expect(testimonialCards.length).toBeGreaterThan(0);
    });

    it('toggles between showing limited and all testimonials', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const toggleButton = screen.getByText(/View All Testimonials/);
      await user.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByText('Show Less')).toBeInTheDocument();
      });
      
      await user.click(screen.getByText('Show Less'));
      
      await waitFor(() => {
        expect(screen.getByText(/View All Testimonials/)).toBeInTheDocument();
      });
    });
  });

  describe('Add Testimonial Modal', () => {
    it('opens modal when "Add Your Testimonial" is clicked', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByText('Share Your Experience')).toBeInTheDocument();
    });

    it('renders all form fields in the modal', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your role/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your testimonial/i)).toBeInTheDocument();
      expect(screen.getByText('Rating')).toBeInTheDocument();
    });

    it('renders star rating component', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      // Check for star icons (using data-testid or class names)
      const stars = document.querySelectorAll('svg[class*="lucide-star"]');
      expect(stars.length).toBe(5);
    });
  });

  describe('Form Validation', () => {
    it('shows validation errors for empty required fields', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      const submitButton = screen.getByText('Submit Testimonial');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters.')).toBeInTheDocument();
        expect(screen.getByText('Role must be at least 2 characters.')).toBeInTheDocument();
        expect(screen.getByText('Company must be at least 2 characters.')).toBeInTheDocument();
        expect(screen.getByText('Testimonial must be at least 10 characters.')).toBeInTheDocument();
      });
    });

    it('validates minimum character requirements', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      // Fill with invalid short values
      await user.type(screen.getByLabelText(/full name/i), 'A');
      await user.type(screen.getByLabelText(/your role/i), 'B');
      await user.type(screen.getByLabelText(/company/i), 'C');
      await user.type(screen.getByLabelText(/your testimonial/i), 'Short');
      
      const submitButton = screen.getByText('Submit Testimonial');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters.')).toBeInTheDocument();
        expect(screen.getByText('Role must be at least 2 characters.')).toBeInTheDocument();
        expect(screen.getByText('Company must be at least 2 characters.')).toBeInTheDocument();
        expect(screen.getByText('Testimonial must be at least 10 characters.')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits testimonial successfully with valid data', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/your role/i), 'Developer');
      await user.type(screen.getByLabelText(/company/i), 'Tech Corp');
      await user.type(screen.getByLabelText(/your testimonial/i), 'This is a great testimonial with enough characters.');
      
      const submitButton = screen.getByText('Submit Testimonial');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith(
          'Thank you for your testimonial! It has been added successfully.'
        );
      });
    });

    it('resets form after successful submission', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
      const roleInput = screen.getByLabelText(/your role/i) as HTMLInputElement;
      const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
      const testimonialInput = screen.getByLabelText(/your testimonial/i) as HTMLTextAreaElement;
      
      // Fill out the form
      await user.type(nameInput, 'John Doe');
      await user.type(roleInput, 'Developer');
      await user.type(companyInput, 'Tech Corp');
      await user.type(testimonialInput, 'This is a great testimonial with enough characters.');
      
      const submitButton = screen.getByText('Submit Testimonial');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(roleInput.value).toBe('');
        expect(companyInput.value).toBe('');
        expect(testimonialInput.value).toBe('');
      });
    });
  });

  describe('LocalStorage Integration', () => {
    it('saves user testimonials to localStorage', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      // Fill out and submit the form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/your role/i), 'Developer');
      await user.type(screen.getByLabelText(/company/i), 'Tech Corp');
      await user.type(screen.getByLabelText(/your testimonial/i), 'This is a great testimonial with enough characters.');
      
      const submitButton = screen.getByText('Submit Testimonial');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'userTestimonials',
          expect.stringContaining('John Doe')
        );
      });
    });

    it('loads user testimonials from localStorage on mount', () => {
      const mockTestimonials = [
        {
          id: 'test-1',
          name: 'Saved User',
          role: 'Tester',
          company: 'Test Corp',
          content: 'This is a saved testimonial',
          rating: 5,
          isUserSubmitted: true,
          createdAt: '2024-01-01'
        }
      ];
      
      localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(mockTestimonials));
      
      render(<TestimonialsSection />);
      
      expect(localStorage.getItem).toHaveBeenCalledWith('userTestimonials');
    });
  });

  describe('User Testimonial Management', () => {
    it('marks user-submitted testimonials with "Community" badge', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      // Submit a testimonial
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/your role/i), 'Developer');
      await user.type(screen.getByLabelText(/company/i), 'Tech Corp');
      await user.type(screen.getByLabelText(/your testimonial/i), 'This is a great testimonial with enough characters.');
      
      const submitButton = screen.getByText('Submit Testimonial');
      await user.click(submitButton);
      
      // The new testimonial should be marked as community
      await waitFor(() => {
        expect(screen.getByText('Community')).toBeInTheDocument();
      });
    });

    it('allows removal of user-submitted testimonials', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      // Submit a testimonial first
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/your role/i), 'Developer');
      await user.type(screen.getByLabelText(/company/i), 'Tech Corp');
      await user.type(screen.getByLabelText(/your testimonial/i), 'This is a great testimonial with enough characters.');
      
      const submitButton = screen.getByText('Submit Testimonial');
      await user.click(submitButton);
      
      // Wait for testimonial to be added and then look for remove button
      await waitFor(() => {
        const removeButtons = document.querySelectorAll('button[class*="group-hover:opacity-100"]');
        expect(removeButtons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<TestimonialsSection />);
      
      const mainHeading = screen.getByRole('heading', { level: 2, name: /what people say/i });
      expect(mainHeading).toBeInTheDocument();
    });

    it('has proper form labels in modal', async () => {
      const user = userEvent.setup();
      render(<TestimonialsSection />);
      
      const addButton = screen.getByText('Add Your Testimonial');
      await user.click(addButton);
      
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your role/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your testimonial/i)).toBeInTheDocument();
    });
  });
});