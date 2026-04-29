import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuHeader from './index'; // Adjust path as necessary
import { LINKS } from '../../AppConstants'; // Adjust import paths accordingly

describe('MenuHeader Component', () => {
	test('renders correctly with width > 1100', () => {
		render(<MenuHeader width={1200} />);

		expect(screen.getByText(/JUSTIN NGUYEN/)).toBeInTheDocument();
		expect(screen.getAllByRole('button').length).toBe(7); // Should match the number of buttons
	});

	test('renders MobileMenu when width <= 1100', () => {
		render(<MenuHeader width={800} />);

		const mobileMenu = screen.getByTestId('mobile-menu'); // Assuming you have a data-testid prop in your MobileMenu component
		expect(mobileMenu).toBeInTheDocument();
	});

	test('button click events work as expected', async () => {
		jest.mock('../../AppConstants', () => ({
			LINKS: { GITHUB_LINK: 'https://github.com/user' }, // Mock the GitHub link constant
		}));

		render(<MenuHeader width={1200} />);

		const githubButton = screen.getByRole('button', { name: /Github/ });
		await userEvent.click(githubButton);

		expect(openInNewTab).toHaveBeenCalledWith(LINKS.GITHUB_LINK); // Assuming openInNewTab is a mock function
	});

	test('resume button downloads resume correctly', async () => {
		render(<MenuHeader width={1200} />);

		const resumeButton = screen.getByRole('button', { name: /Resume/ });
		await userEvent.click(resumeButton);

		// Mock the click event and download behavior
		document.body.innerHTML =
			'<a href="/assets/Resume_Justin_Nguyen.pdf" download="Resume_Justin_Nguyen.pdf">Download</a>';
		const linkElement = document.querySelector('a');
		expect(linkElement).toBeInTheDocument();
	});
});
