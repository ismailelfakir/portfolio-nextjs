import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsSection } from '@/components/sections/projects';

// Mock the Dialog components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: any) => <div data-testid="dialog">{children}</div>,
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  DialogTrigger: ({ children, asChild, ...props }: any) => {
    if (asChild) {
      return <div {...props}>{children}</div>;
    }
    return <button {...props}>{children}</button>;
  },
}));

describe('ProjectsSection', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  it('renders the projects section with title and description', () => {
    render(<ProjectsSection />);
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByText(/A selection of my recent work/)).toBeInTheDocument();
  });

  it('renders filter tabs', () => {
    render(<ProjectsSection />);
    
    expect(screen.getByRole('tab', { name: /all projects/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /web/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /mobile/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /design/i })).toBeInTheDocument();
  });

  it('shows all projects by default', () => {
    render(<ProjectsSection />);
    
    // Check that projects from different categories are visible
    expect(screen.getByText('E-Commerce Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Health & Fitness App')).toBeInTheDocument();
    expect(screen.getByText('Financial Portfolio Tracker')).toBeInTheDocument();
    expect(screen.getByText('Travel Photography Site')).toBeInTheDocument();
  });

  describe('Project Filtering', () => {
    it('filters projects by web category', async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const webTab = screen.getByRole('tab', { name: /web/i });
      await user.click(webTab);
      
      await waitFor(() => {
        // Web projects should be visible
        expect(screen.getByText('E-Commerce Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Financial Portfolio Tracker')).toBeInTheDocument();
        
        // Mobile and design projects should not be visible
        expect(screen.queryByText('Health & Fitness App')).not.toBeInTheDocument();
        expect(screen.queryByText('Travel Photography Site')).not.toBeInTheDocument();
      });
    });

    it('filters projects by mobile category', async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const mobileTab = screen.getByRole('tab', { name: /mobile/i });
      await user.click(mobileTab);
      
      await waitFor(() => {
        // Mobile projects should be visible
        expect(screen.getByText('Health & Fitness App')).toBeInTheDocument();
        
        // Web and design projects should not be visible
        expect(screen.queryByText('E-Commerce Dashboard')).not.toBeInTheDocument();
        expect(screen.queryByText('Financial Portfolio Tracker')).not.toBeInTheDocument();
        expect(screen.queryByText('Travel Photography Site')).not.toBeInTheDocument();
      });
    });

    it('filters projects by design category', async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const designTab = screen.getByRole('tab', { name: /design/i });
      await user.click(designTab);
      
      await waitFor(() => {
        // Design projects should be visible
        expect(screen.getByText('Travel Photography Site')).toBeInTheDocument();
        
        // Web and mobile projects should not be visible
        expect(screen.queryByText('E-Commerce Dashboard')).not.toBeInTheDocument();
        expect(screen.queryByText('Health & Fitness App')).not.toBeInTheDocument();
        expect(screen.queryByText('Financial Portfolio Tracker')).not.toBeInTheDocument();
      });
    });

    it('shows all projects when "All Projects" tab is clicked', async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      // First filter by web
      const webTab = screen.getByRole('tab', { name: /web/i });
      await user.click(webTab);
      
      // Then click "All Projects"
      const allTab = screen.getByRole('tab', { name: /all projects/i });
      await user.click(allTab);
      
      await waitFor(() => {
        // All projects should be visible again
        expect(screen.getByText('E-Commerce Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Health & Fitness App')).toBeInTheDocument();
        expect(screen.getByText('Financial Portfolio Tracker')).toBeInTheDocument();
        expect(screen.getByText('Travel Photography Site')).toBeInTheDocument();
      });
    });
  });

  describe('Project Cards', () => {
    it('renders project cards with correct information', () => {
      render(<ProjectsSection />);
      
      // Check that project cards have the expected content
      expect(screen.getByText('E-Commerce Dashboard')).toBeInTheDocument();
      expect(screen.getByText(/A responsive admin dashboard/)).toBeInTheDocument();
      
      // Check for technology tags
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    });

    it('renders "View Details" buttons for each project', () => {
      render(<ProjectsSection />);
      
      const viewDetailsButtons = screen.getAllByText('View Details');
      expect(viewDetailsButtons.length).toBeGreaterThan(0);
    });

    it('renders external links for projects', () => {
      render(<ProjectsSection />);
      
      // Check for "Code" and "Live Demo" links
      const codeLinks = screen.getAllByText('Code');
      const demoLinks = screen.getAllByText('Live Demo');
      
      expect(codeLinks.length).toBeGreaterThan(0);
      expect(demoLinks.length).toBeGreaterThan(0);
    });

    it('limits displayed tags and shows overflow indicator', () => {
      render(<ProjectsSection />);
      
      // The E-Commerce Dashboard project has 4 tags, so it should show +1 indicator
      const overflowIndicators = screen.getAllByText(/^\+\d+$/);
      expect(overflowIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('Project Details Modal', () => {
    it('opens project details when "View Details" is clicked', async () => {
      const user = userEvent.setup();
      render(<ProjectsSection />);
      
      const viewDetailsButtons = screen.getAllByText('View Details');
      await user.click(viewDetailsButtons[0]);
      
      // Check that dialog is rendered (mocked)
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
  });

  describe('External Links', () => {
    it('renders GitHub links with correct attributes', () => {
      render(<ProjectsSection />);
      
      const githubLinks = screen.getAllByText('Code');
      githubLinks.forEach(link => {
        const linkElement = link.closest('a');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('renders demo links with correct attributes', () => {
      render(<ProjectsSection />);
      
      const demoLinks = screen.getAllByText('Live Demo');
      demoLinks.forEach(link => {
        const linkElement = link.closest('a');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('GitHub Link', () => {
    it('renders "View All Projects on GitHub" link', () => {
      render(<ProjectsSection />);
      
      const githubLink = screen.getByText('View All Projects on GitHub');
      expect(githubLink).toBeInTheDocument();
      
      const linkElement = githubLink.closest('a');
      expect(linkElement).toHaveAttribute('href', 'https://github.com/johndoe');
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<ProjectsSection />);
      
      const mainHeading = screen.getByRole('heading', { level: 2, name: /featured projects/i });
      expect(mainHeading).toBeInTheDocument();
    });

    it('has proper tab navigation', () => {
      render(<ProjectsSection />);
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(4);
    });

    it('has proper image alt text', () => {
      render(<ProjectsSection />);
      
      const projectImages = screen.getAllByRole('img');
      projectImages.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });
});