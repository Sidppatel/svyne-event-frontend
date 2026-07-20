import { create } from 'zustand';

export type VenueType = 'club' | 'theater' | 'rooftop' | 'supper club';

interface LandingState {
  venueName: string;
  venueType: VenueType;
  setVenueName: (name: string) => void;
  setVenueType: (type: VenueType) => void;
}

export const useLandingStore = create<LandingState>((set) => ({
  venueName: '',
  venueType: 'club',
  setVenueName: (venueName) => set({ venueName }),
  setVenueType: (venueType) => set({ venueType }),
}));

export function venueSlug(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 24) || 'yourvenue'
  );
}
