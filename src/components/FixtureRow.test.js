import { render, screen } from '@testing-library/react';
import FixtureRow from './FixtureRow';

describe('Tests the FixtureRow Component', () => {
    test('Expects the fixture to be a future fixture', () => {
        const team = {
            club1: "Chelsea",
            club1Score: null,
            club2: "Arsenal",
            club2Score: null,
            home: 1,
            matchDate: new Date('Tue May 11 2021 12:00:00 GMT+0100 (West Africa Standard Time)')
        }
      render(<FixtureRow team={team} />);
      const linkElement = screen.getByText(/Upcoming Fixture/i);
      expect(linkElement).toBeInTheDocument();
    });

    test('Expects the fixture to be a past fixture', () => {
        const team = {
            club1: "Chelsea",
            club1Score: 2,
            club2: "Manchester United",
            club2Score: 2,
            home: 1,
            matchDate: new Date('Thu Mar 04 2021 17:00:00 GMT+0100 (West Africa Standard Time)')
        }
      render(<FixtureRow team={team} />);
      const linkElement = screen.getByText(/2/i);
      expect(linkElement).toHaveLength();
    });

} )
