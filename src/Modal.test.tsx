import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
    const mockClose = vi.fn();

    beforeEach(() => {
        mockClose.mockReset();
    });

    test('renders modal with expected controls', () => {
        render(<Modal isOpen={true} title="Test Modal" onClose={mockClose}>Content</Modal>);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: "Test Modal" })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    describe('when passed onClose handler', () => {
        test('calls onClose action when pressing the ESC key', () => {
            render(<Modal isOpen={true} title="Test Modal" onClose={mockClose}>Content</Modal>);

            fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

            expect(mockClose).toHaveBeenCalledTimes(1);
        });

        test('renders dismissible button that calls onClose action when clicked', async () => {
            render(<Modal isOpen={true} title="Test Modal" onClose={mockClose}>Content</Modal>);

            const closeButton = screen.getByRole('button', { name: /close/i });
            await userEvent.click(closeButton);

            expect(mockClose).toHaveBeenCalledTimes(1);
        });

        test('calls onClose action when clicking outside of the modal', async () => {
            render(<Modal isOpen={true} title="Test Modal" onClose={mockClose}>Content</Modal>);

            const backdrop = screen.getByTestId('modal-backdrop');
            await userEvent.click(backdrop);

            expect(mockClose).toHaveBeenCalledTimes(1);
        });
    });
});
