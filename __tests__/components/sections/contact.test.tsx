import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '@/components/sections/contact';
import { toast } from 'sonner';

// Mock the toast function
jest.mock('sonner');
const mockToast = toast as jest.Mocked<typeof toast>;

describe('ContactSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact form with all fields', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Send a Message')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('hello@johndoe.com')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('New York City, NY')).toBeInTheDocument();
  });

  it('renders office hours', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Office Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday - Friday')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM - 5:00 PM EST')).toBeInTheDocument();
  });

  describe('Form Validation', () => {
    it('shows validation errors for empty required fields', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters.')).toBeInTheDocument();
        expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
        expect(screen.getByText('Subject must be at least 5 characters.')).toBeInTheDocument();
        expect(screen.getByText('Message must be at least 10 characters.')).toBeInTheDocument();
      });
    });

    it('shows validation error for invalid email', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
      });
    });

    it('shows validation error for short name', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters.')).toBeInTheDocument();
      });
    });

    it('shows validation error for short subject', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const subjectInput = screen.getByLabelText(/subject/i);
      await user.type(subjectInput, 'Hi');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Subject must be at least 5 characters.')).toBeInTheDocument();
      });
    });

    it('shows validation error for short message', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'Short');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Message must be at least 10 characters.')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits form successfully with valid data', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      // Check that the button shows loading state
      await waitFor(() => {
        expect(screen.getByText('Sending...')).toBeInTheDocument();
      });
      
      // Wait for the form to be submitted and success message to show
      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith(
          "Message sent successfully! I'll get back to you soon."
        );
      }, { timeout: 2000 });
    });

    it('resets form after successful submission', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const subjectInput = screen.getByLabelText(/subject/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
      
      // Fill out the form
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(subjectInput, 'Test Subject');
      await user.type(messageInput, 'This is a test message that is long enough.');
      
      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      // Wait for form to reset
      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(subjectInput.value).toBe('');
        expect(messageInput.value).toBe('');
      }, { timeout: 2000 });
    });

    it('disables submit button during submission', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough.');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      // Check that the button is disabled during submission
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<ContactSection />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('has proper heading structure', () => {
      render(<ContactSection />);
      
      const mainHeading = screen.getByRole('heading', { level: 2, name: /get in touch/i });
      const subHeadings = screen.getAllByRole('heading', { level: 3 });
      
      expect(mainHeading).toBeInTheDocument();
      expect(subHeadings.length).toBeGreaterThan(0);
    });
  });
});